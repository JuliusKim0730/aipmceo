# 🎯 기획자의 AI 창업 - 왜 안하시나요?

Firebase 연동 편집 가능한 인터랙티브 프레젠테이션

## ✨ 주요 기능

### 🎨 프레젠테이션 기능
- **80페이지 풀 슬라이드**: 8개 챕터로 구성된 완전한 프레젠테이션
- **인터랙티브 네비게이션**: 키보드, 마우스, 터치 제스처 지원
- **부드러운 애니메이션**: 3D 회전, 페이드 효과, 슬라이드 전환
- **반응형 디자인**: 데스크톱, 태블릿, 모바일 최적화
- **진행률 표시**: 현재 페이지, 챕터 정보, 프로그레스 바

### 📝 편집 기능 (NEW!)
- **실시간 텍스트 편집**: 모든 텍스트 요소 클릭으로 편집 가능
- **이미지 업로드**: 드래그 앤 드롭으로 이미지 교체
- **Firebase 자동 저장**: 모든 변경사항 실시간 클라우드 저장
- **편집 모드 토글**: 보기 모드와 편집 모드 간편 전환
- **저장 상태 표시**: 저장 진행 상황 실시간 피드백

### 🔥 Firebase 연동
- **Firestore**: 슬라이드 데이터 구조화 저장
- **Storage**: 이미지 파일 클라우드 저장
- **실시간 동기화**: 여러 사용자 간 실시간 협업 가능
- **버전 관리**: 수정 이력 자동 추적

## 🎨 디자인 시스템

### 컬러 스킴
- **메인 컬러**: 네오 블루 (#243B7A) + 딥 퍼플 (#1E1E50)
- **포인트 컬러**: 네온 민트 (#1ABC9C), 딥 레드 (#C0392B)
- **그라데이션**: 다양한 컬러 조합으로 시각적 임팩트 극대화

### 레이아웃 특징
- **한 페이지 = 한 메시지**: 간결하고 명확한 메시지 전달
- **대형 아이콘과 이모지**: 직관적인 시각적 요소
- **다양한 레이아웃**: 질문형, 카드형, 비교형, 강조형 등

## 📚 강의 구성

### Chapter 1: Intro - 기획자의 창업, 왜 안하시나요? (페이지 1-10)
- 타이틀 슬라이드: "기획자가 AI로 창업할 수 있을까?"
- 강의 소개: 문제 → 기회 → 유형 → 현실 → 가이드 로드맵
- 창업에 대한 3가지 질문
- 창업을 망설이는 3가지 이유 (자본 부족, 기술 장벽, 실패의 두려움)
- 핵심 메시지: 문제는 '시도'가 아니라 '지속과 수익화'

### Chapter 2: 유튜브 붐과 AI 창업의 닮은 점 (페이지 11-20)
- 유튜브/인스타 인플루언서 창업과의 비교
- 공통점: 시작은 쉽지만 성과는 보장되지 않음
- 실제 성공/실패 사례 분석
- 핵심: 시작은 쉽지만, 문제는 유지와 수익

### Chapter 3: 기획자가 AI로 창업할 수 있는 유형 1 (페이지 21-30)
- 유형 1: 기획 자동화 (더 많은 프로젝트 수주)
- 유형 2: SaaS 개발 (월 구독 모델)
- 유형 3: 직접 개발 창업 (기획+개발 역량 결합)
- 실제 사례: Notion AI, Jasper 성장 스토리

### Chapter 4: 유형 2 - 커머스, 인플루언스, 교육 (페이지 31-40)
- 유형 4: 가상 인플루언서 (AI 캐릭터 → 팬덤 창출)
- 유형 5: 커머스/쇼핑몰 (AI 콘텐츠 + 판매 결합)
- 유형 6: 교육·부트캠프 (기획자 AI 부트캠프)
- 사례: Upstage, Artisan AI 등

### Chapter 5: 누구나 할 수 있다, 누구나 따라할 수 있다 (페이지 41-50)
- 카페, 김치찌개, 순대타운 비유를 통한 경쟁 구조 설명
- 핵심 교훈: 결국 차별화가 생존의 열쇠
- AI 창업도 동일한 골목식당 구조
- 성공 사례와 실패 사례 비교 분석

### Chapter 6: 현실적 장벽 (페이지 51-60)
- 5가지 주요 장벽: 빠른 복제, 자본 압박, 보안/법적 이슈, 고객 유입 비용, 사라지는 트렌드
- 실제 스타트업 사례: MyTender, Airial, Felt
- 핵심 메시지: 문제는 기술이 아니라 비즈니스

### Chapter 7: 우리가 팔아야 하는 것 (페이지 61-70)
- 기술이 아닌 것들: 상상력, 시도, 세계관, 팬덤
- 작은 교회, 작은 밴드의 충성팬 전략
- 지속적인 움직임과 변화의 중요성

### Chapter 8: 가이드 & 희망 (페이지 71-80)
- 실행 가능한 가이드: 월 20달러 창업 실험
- 실패도 포트폴리오가 되는 마인드셋
- 5가지 체크리스트: 아이디어, 프로토타입, SNS, 팬, 반복
- 희망적 메시지: AI는 기획자의 강력한 파트너

## 🚀 사용 방법

### 설치 및 설정

1. **의존성 설치**:
   ```bash
   cd ai_pm_ceo
   npm install
   ```

2. **Firebase 설정**:
   - `firebase-config.js` 파일에서 Firebase 프로젝트 정보 확인
   - Firestore 및 Storage 규칙 설정 필요

### 로컬 서버 실행

1. **개발 서버 실행**:
   ```bash
   npm run dev
   ```

2. **또는 직접 실행**:
   ```bash
   npx http-server -p 8000
   ```

3. 브라우저에서 `http://localhost:8000` 접속

### 편집 모드 사용법

1. **편집 모드 활성화**: 
   - 우측 상단 "📝 편집 모드" 버튼 클릭
   - 또는 키보드 `E` 키 누르기

2. **텍스트 편집**:
   - 편집하고 싶은 텍스트에 마우스 오버
   - 나타나는 ✏️ 버튼 클릭
   - 모달에서 텍스트 수정 후 저장

3. **이미지 편집**:
   - 편집하고 싶은 이미지 영역에 마우스 오버
   - 나타나는 📷 버튼 클릭
   - 이미지 드래그 앤 드롭 또는 클릭하여 업로드

## ⌨️ 키보드 단축키

- **←/→**: 이전/다음 페이지
- **Space**: 다음 페이지
- **Home/End**: 첫/마지막 페이지
- **H**: 도움말 토글
- **F**: 전체화면 토글
- **E**: 편집 모드 토글
- **Escape**: 모달 닫기

## 🛠 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션, 반응형 디자인
- **JavaScript (ES6+)**: 모듈 시스템, async/await
- **Firebase SDK**: Firestore, Storage, Analytics

### Backend (Firebase)
- **Firestore**: NoSQL 데이터베이스
- **Storage**: 파일 저장소
- **Hosting**: 정적 웹 호스팅
- **Analytics**: 사용자 분석

### 개발 도구
- **http-server**: 로컬 개발 서버
- **ES Modules**: 모던 JavaScript 모듈
- **Firebase CLI**: 배포 및 관리

## 📊 데이터 구조

### Firestore 컬렉션: `ai-startup-slides`

```javascript
{
  id: "slide-1-1",
  chapterNum: 1,
  pageNum: 1,
  title: "기획자가 AI로 창업할 수 있을까?",
  subtitle: "AI, 창업, 그리고 기획자의 미래...",
  content: {
    mainText: "메인 텍스트",
    subText: "서브 텍스트",
    bulletPoints: ["포인트1", "포인트2"],
    keywords: ["키워드1", "키워드2"]
  },
  images: {
    background: "https://storage.url/bg.jpg",
    main: "https://storage.url/main.jpg",
    icons: ["icon1.jpg", "icon2.jpg"]
  },
  layout: "title-slide",
  style: {
    backgroundColor: "#243B7A",
    textColor: "#FFFFFF",
    accentColor: "#1ABC9C"
  },
  lastModified: "2024-01-01T00:00:00.000Z",
  version: 1
}
```

### Storage 구조
```
slides/
├── 1/
│   ├── 1/
│   │   ├── background_timestamp_image.jpg
│   │   └── icon_timestamp_image.png
│   └── 2/
└── 2/
```

## 🔧 커스터마이징

### 새로운 레이아웃 추가

1. **CSS 스타일 정의**:
   ```css
   .my-custom-layout {
     /* 스타일 정의 */
   }
   ```

2. **JavaScript에서 레이아웃 등록**:
   ```javascript
   const specialLayouts = {
     chapterNum: {
       pageIndex: `<div class="my-custom-layout">...</div>`
     }
   };
   ```

### 새로운 편집 요소 추가

1. **HTML 요소에 클래스 추가**:
   ```html
   <div class="my-editable-element">내용</div>
   ```

2. **JavaScript에서 편집 대상으로 등록**:
   ```javascript
   const editableElements = currentSlide.querySelectorAll('.my-editable-element');
   ```

## 🚀 배포

### Firebase Hosting 배포

1. **Firebase CLI 설치**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Firebase 로그인**:
   ```bash
   firebase login
   ```

3. **프로젝트 초기화**:
   ```bash
   firebase init hosting
   ```

4. **배포**:
   ```bash
   firebase deploy
   ```

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

---

**🎯 기획자의 AI 창업, 이제 시작해보세요!** 

이 프레젠테이션이 여러분의 AI 창업 여정에 도움이 되기를 바랍니다. 편집 기능을 활용해 여러분만의 스토리로 커스터마이징하고, 실제 발표에서 활용해보세요!