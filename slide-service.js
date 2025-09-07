// 슬라이드 데이터 관리 서비스
import { db, storage } from './firebase-config.js';
import { 
    collection, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    getDocs, 
    query, 
    orderBy 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { 
    ref, 
    uploadBytes, 
    getDownloadURL, 
    deleteObject 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

class SlideService {
    constructor() {
        this.collectionName = 'ai-startup-slides';
    }

    // 슬라이드 데이터 구조 정의
    createSlideData(chapterNum, pageNum, slideData) {
        return {
            id: `slide-${chapterNum}-${pageNum}`,
            chapterNum: chapterNum,
            pageNum: pageNum,
            title: slideData.title || '',
            subtitle: slideData.subtitle || '',
            content: {
                mainText: slideData.mainText || '',
                subText: slideData.subText || '',
                bulletPoints: slideData.bulletPoints || [],
                keywords: slideData.keywords || []
            },
            images: {
                background: slideData.backgroundImage || '',
                main: slideData.mainImage || '',
                icons: slideData.icons || []
            },
            layout: slideData.layout || 'default',
            style: {
                backgroundColor: slideData.backgroundColor || '',
                textColor: slideData.textColor || '',
                accentColor: slideData.accentColor || ''
            },
            lastModified: new Date().toISOString(),
            version: 1
        };
    }

    // 모든 슬라이드 데이터 초기화
    async initializeAllSlides() {
        try {
            console.log('슬라이드 데이터 초기화 시작...');
            
            // 기본 슬라이드 데이터 정의
            const defaultSlides = this.getDefaultSlidesData();
            
            for (const slideData of defaultSlides) {
                await this.saveSlide(slideData.chapterNum, slideData.pageNum, slideData);
            }
            
            console.log('모든 슬라이드 데이터 초기화 완료');
            return true;
        } catch (error) {
            console.error('슬라이드 초기화 오류:', error);
            return false;
        }
    }

    // 기본 슬라이드 데이터 정의
    getDefaultSlidesData() {
        return [
            // Chapter 1
            {
                chapterNum: 1, pageNum: 1,
                title: "기획자가 AI로 창업할 수 있을까?",
                subtitle: "AI, 창업, 그리고 기획자의 미래. 오늘 그 이야기를 시작합니다.",
                mainText: "기획자가 AI로 창업할 수 있을까?",
                layout: "title-slide",
                backgroundColor: "linear-gradient(135deg, #243B7A 0%, #1E1E50 100%)"
            },
            {
                chapterNum: 1, pageNum: 2,
                title: "강의 구성",
                mainText: "오늘 우리가 함께 떠날 여정입니다",
                layout: "timeline-layout"
            },
            {
                chapterNum: 1, pageNum: 3,
                title: "질문 1",
                mainText: "여러분, AI 창업을 꿈꿔본 적 있으신가요?",
                layout: "question-slide",
                backgroundColor: "linear-gradient(135deg, #1E1E50 0%, #243B7A 100%)"
            },
            {
                chapterNum: 1, pageNum: 4,
                title: "질문 2",
                subtitle: "무엇을 상상하셨나요? 앱? 툴? 인플루언서?",
                layout: "three-cards"
            },
            {
                chapterNum: 1, pageNum: 5,
                title: "질문 3",
                mainText: "아직 해보지 않으셨나요?\n왜일까요?",
                layout: "question-slide"
            },
            {
                chapterNum: 1, pageNum: 6,
                title: "자본의 문제",
                mainText: "자본이 부족해서 시작조차 못하는 경우",
                layout: "reason-slide"
            },
            {
                chapterNum: 1, pageNum: 7,
                title: "기술의 문제",
                mainText: "코드를 몰라서 시도조차 두려운 경우",
                layout: "tech-slide"
            },
            {
                chapterNum: 1, pageNum: 8,
                title: "실패의 두려움",
                mainText: "실패가 두렵고, 시간 낭비가 걱정되기 때문입니다",
                layout: "fear-slide"
            },
            {
                chapterNum: 1, pageNum: 9,
                title: "결론",
                mainText: "돈이 있어도 못하는 이유 → AI 창업도 같습니다",
                layout: "conclusion-slide"
            },
            {
                chapterNum: 1, pageNum: 10,
                title: "챕터 요약",
                mainText: "문제는 '시도'가 아니라\n'지속과 수익화'",
                keywords: ["지속", "수익화"],
                layout: "summary-slide"
            }
            // 더 많은 슬라이드 데이터는 동적으로 생성
        ];
    }

    // 특정 슬라이드 저장
    async saveSlide(chapterNum, pageNum, slideData) {
        try {
            const slideId = `slide-${chapterNum}-${pageNum}`;
            const slideRef = doc(db, this.collectionName, slideId);
            
            const data = this.createSlideData(chapterNum, pageNum, slideData);
            await setDoc(slideRef, data, { merge: true });
            
            console.log(`슬라이드 ${slideId} 저장 완료`);
            return true;
        } catch (error) {
            console.error('슬라이드 저장 오류:', error);
            return false;
        }
    }

    // 특정 슬라이드 로드
    async loadSlide(chapterNum, pageNum) {
        try {
            const slideId = `slide-${chapterNum}-${pageNum}`;
            const slideRef = doc(db, this.collectionName, slideId);
            const slideSnap = await getDoc(slideRef);
            
            if (slideSnap.exists()) {
                return slideSnap.data();
            } else {
                console.log(`슬라이드 ${slideId}가 존재하지 않습니다.`);
                return null;
            }
        } catch (error) {
            console.error('슬라이드 로드 오류:', error);
            return null;
        }
    }

    // 모든 슬라이드 로드
    async loadAllSlides() {
        try {
            const slidesRef = collection(db, this.collectionName);
            const q = query(slidesRef, orderBy('chapterNum'), orderBy('pageNum'));
            const querySnapshot = await getDocs(q);
            
            const slides = [];
            querySnapshot.forEach((doc) => {
                slides.push(doc.data());
            });
            
            return slides;
        } catch (error) {
            console.error('모든 슬라이드 로드 오류:', error);
            return [];
        }
    }

    // 슬라이드 텍스트 업데이트
    async updateSlideText(chapterNum, pageNum, textType, newText) {
        try {
            const slideId = `slide-${chapterNum}-${pageNum}`;
            const slideRef = doc(db, this.collectionName, slideId);
            
            const updateData = {
                lastModified: new Date().toISOString()
            };
            
            // 텍스트 유형에 따라 업데이트할 필드 결정
            switch (textType) {
                case 'title':
                    updateData.title = newText;
                    break;
                case 'subtitle':
                    updateData.subtitle = newText;
                    break;
                case 'mainText':
                    updateData['content.mainText'] = newText;
                    break;
                case 'subText':
                    updateData['content.subText'] = newText;
                    break;
                default:
                    updateData[textType] = newText;
            }
            
            await updateDoc(slideRef, updateData);
            console.log(`슬라이드 ${slideId} 텍스트 업데이트 완료`);
            return true;
        } catch (error) {
            console.error('텍스트 업데이트 오류:', error);
            return false;
        }
    }

    // 이미지 업로드 및 URL 반환
    async uploadImage(file, chapterNum, pageNum, imageType) {
        try {
            const fileName = `slides/${chapterNum}/${pageNum}/${imageType}_${Date.now()}_${file.name}`;
            const imageRef = ref(storage, fileName);
            
            const snapshot = await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            console.log('이미지 업로드 완료:', downloadURL);
            return downloadURL;
        } catch (error) {
            console.error('이미지 업로드 오류:', error);
            return null;
        }
    }

    // 슬라이드 이미지 업데이트
    async updateSlideImage(chapterNum, pageNum, imageType, file) {
        try {
            // 이미지 업로드
            const imageUrl = await this.uploadImage(file, chapterNum, pageNum, imageType);
            if (!imageUrl) return false;
            
            // Firestore 업데이트
            const slideId = `slide-${chapterNum}-${pageNum}`;
            const slideRef = doc(db, this.collectionName, slideId);
            
            const updateData = {
                [`images.${imageType}`]: imageUrl,
                lastModified: new Date().toISOString()
            };
            
            await updateDoc(slideRef, updateData);
            console.log(`슬라이드 ${slideId} 이미지 업데이트 완료`);
            return imageUrl;
        } catch (error) {
            console.error('이미지 업데이트 오류:', error);
            return null;
        }
    }

    // 이미지 삭제
    async deleteImage(imageUrl) {
        try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
            console.log('이미지 삭제 완료');
            return true;
        } catch (error) {
            console.error('이미지 삭제 오류:', error);
            return false;
        }
    }
}

// 싱글톤 인스턴스 생성
export const slideService = new SlideService();
export default slideService;
