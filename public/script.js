// Firebase 모듈 연동 (동적 로드)
let slideService = null;
let authService = null;

// Firebase 모듈 로드 (동적 import)
async function loadFirebaseModule() {
    try {
        const module = await import('./auth-service.js');
        authService = module.authService || module.default || null;
        if (!authService) {
            console.error('auth-service 모듈 로드 실패: authService가 없습니다.');
            return false;
        }
        console.log('Firebase 모듈 로드 완료');
        return true;
    } catch (error) {
        console.error('Firebase 모듈 로드 중 오류:', error);
        return false;
    }
}

// 전역 변수
let currentPage = 1;
const totalPages = 80;
const pagesPerChapter = 10;
let slides = [];
let isAnimating = false;
let isEditMode = false;
let currentEditElement = null;
let slideData = new Map(); // 슬라이드 데이터 캐시

// DOM 요소들
const landingContainer = document.getElementById('landingContainer');
const presentationContainer = document.getElementById('presentationContainer');
const slideContainer = document.getElementById('slideContainer');
const currentPageSpan = document.querySelector('.current-page');
const totalPagesSpan = document.querySelector('.total-pages');
const chapterInfo = document.querySelector('.chapter-info');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const keyboardHelp = document.getElementById('keyboardHelp');

// 편집 관련 DOM 요소들
const editModeToggle = document.getElementById('editModeToggle');
const saveStatus = document.getElementById('saveStatus');
const textEditModal = document.getElementById('textEditModal');
const textEditTextarea = document.getElementById('textEditTextarea');
const textEditTitle = document.getElementById('textEditTitle');
const textEditSave = document.getElementById('textEditSave');
const textEditCancel = document.getElementById('textEditCancel');
const imageUploadModal = document.getElementById('imageUploadModal');
const imageUploadArea = document.getElementById('imageUploadArea');
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imageUploadSave = document.getElementById('imageUploadSave');
const imageUploadCancel = document.getElementById('imageUploadCancel');

// 인증 관련 DOM 요소들
const authContainer = document.getElementById('authContainer');
const authLogin = document.getElementById('authLogin');
const authProfile = document.getElementById('authProfile');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const guestLoginBtn = document.getElementById('guestLoginBtn');
const landingGoogleLoginBtn = document.getElementById('landingGoogleLoginBtn');
const landingGuestLoginBtn = document.getElementById('landingGuestLoginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');

// 초기화
document.addEventListener('DOMContentLoaded', async function() {
    try {
        console.log('🎯 기획자의 AI 창업 프레젠테이션 초기화 중...');
        
        // 초기에 랜딩 표시
        showLanding();
        
        // 인증 초기화 (성공 시 역할에 따른 프레젠테이션 진입)
        try {
            await initializeAuth();
        } catch (error) {
            console.warn('인증 초기화 실패, 로컬 모드로 전환:', error);
            enableLocalMode();
        }
        
        // 로컬 데이터 로드
        loadSavedData();
        
        // 페이지 로드 애니메이션
        setTimeout(() => {
            const activeSlide = document.querySelector('.slide.active');
            if (activeSlide) {
                activeSlide.classList.add('fade-in');
            }
        }, 100);
        
        // 저장된 데이터 복원
        loadSavedData();
        
        console.log('✅ 프레젠테이션이 준비되었습니다!');
        console.log('📝 편집 모드로 내용을 수정할 수 있습니다.');
    } catch (error) {
        console.error('초기화 오류:', error);
    }
});

// 슬라이드 초기화 및 동적 생성
function initializeSlides() {
    console.log('initializeSlides 시작');
    
    // 기존 슬라이드 수집
    slides = Array.from(document.querySelectorAll('.slide'));
    console.log('기존 슬라이드 개수:', slides.length);
    
    // 나머지 페이지들을 동적으로 생성
    generateRemainingSlides();
    
    // 슬라이드 배열 업데이트
    slides = Array.from(document.querySelectorAll('.slide'));
    console.log('전체 슬라이드 개수:', slides.length);
    
    // 첫 번째 슬라이드를 active로 설정
    if (slides.length > 0) {
        slides[0].classList.add('active');
        console.log('첫 번째 슬라이드 활성화 완료');
    }
}

// 나머지 슬라이드 동적 생성
function generateRemainingSlides() {
    const chapters = [
        {
            title: "유튜브 붐과 AI 창업의 닮은 점",
            pages: [
                "공통점: 시작은 쉽다", "공통점: 성과는 불확실", "사례: 초기 유튜브", "사례: 인스타 인플루언서",
                "AI 창업의 함정", "비교", "결론", "스토리",
                "챕터 요약"
            ],
            contexts: [
                "스마트폰만 있으면 시작 가능. AI도 마찬가지.",
                "시작은 쉬우나, 성공은 소수의 몫",
                "누구나 했지만, 살아남은 채널은 극소수",
                "빠른 성장 후 소멸된 계정들",
                "AI 창업도 이와 같은 패턴을 반복할 수 있습니다",
                "유튜브=시도 용이 / 성과 불확실 → AI 창업도 동일",
                "시도는 쉽지만, 문제는 수익화다",
                "저 역시 시도했지만, 유지하지 못했습니다",
                "핵심: 시작은 쉽다. 유지와 수익화가 문제다"
            ]
        },
        {
            title: "기획자가 AI로 창업할 수 있는 유형 1",
            pages: [
                "유형 1: 기획 자동화", "예시", "유형 2: SaaS 개발", "설명",
                "유형 3: 직접 개발 창업", "예시", "사례", "장단점",
                "요약"
            ],
            contexts: [
                "AI로 업무를 자동화 → 더 많은 프로젝트 수주",
                "기획 문서 작성, 리서치, 아이디어 정리 자동화",
                "내가 만든 AI 툴 → SaaS 구독 모델",
                "월 구독, B2B 서비스 가능",
                "노코드/바이브코딩으로 MVP 제작",
                "Figma 플러그인, 노션 AI, 개인툴 SaaS",
                "Notion AI, Jasper 성장 사례",
                "빠른 진입 BUT 빠른 복제 위험",
                "기획+AI=창업 포트폴리오"
            ]
        },
        {
            title: "유형 2 (커머스, 인플루언스, 교육)",
            pages: [
                "유형 4: 가상 인플루언서", "사례", "유형 5: 커머스", "설명",
                "유형 6: 교육/부트캠프", "사례", "사례", "장단점",
                "요약"
            ],
            contexts: [
                "AI 캐릭터 → 팬덤 창출 가능",
                "Lil Miquela, 국내 버추얼 유튜버",
                "AI 콘텐츠 → 해외 판매 쇼핑몰",
                "팬덤 기반 판매 확장 가능",
                "AI 기획 교육, 스터디, 커뮤니티",
                "Prompt School, Upstage 부트캠프",
                "Artisan AI – 반복 업무 대체",
                "교육=신뢰 중요 / 커머스=물류 위험",
                "창업은 무궁무진하다"
            ]
        },
        {
            title: "누구나 할 수 있다, 누구나 따라할 수 있다",
            pages: [
                "카페 비유", "김치찌개 비유", "순대타운", "교훈",
                "골목식당 구조", "사례", "사례", "사례",
                "요약"
            ],
            contexts: [
                "집에서도 가능한데 왜 스타벅스?",
                "집에서 해먹을 수 있는데, 왜 줄을 서나?",
                "유명점포 → 유사점포 → 골목 생성",
                "결국 차별화가 핵심",
                "AI 창업도 동일",
                "ChatGPT 앱 클론",
                "Midjourney 프롬프트 클론",
                "Perplexity AI 차별화 성공",
                "차별화 없는 창업 = 곧 사라짐"
            ]
        },
        {
            title: "현실적 장벽",
            pages: [
                "빠른 복제", "자본 압박", "보안/법적", "고객 유입 비용",
                "사라지는 트렌드", "사례", "사례", "사례",
                "요약"
            ],
            contexts: [
                "하루 만에 똑같은 서비스 등장",
                "광고, 서버, 운영비 → 개인이 버티기 힘듦",
                "데이터 저작권, 프라이버시 문제",
                "CAC = 치킨게임",
                "짧게 반짝, 곧 소멸",
                "MyTender 영국 대학생 창업",
                "Airial – AI 여행 일정",
                "Felt – 지형 지도 AI",
                "문제는 기술이 아니라 비즈니스"
            ]
        },
        {
            title: "우리가 팔아야 하는 것",
            pages: [
                "기술이 아님", "상상력", "시도", "세계관",
                "팬덤", "우리가 모아야 할 것", "멈추지 않아야 할 것", "메시지",
                "요약"
            ],
            contexts: [
                "기술은 금방 복제된다",
                "아이디어와 스토리텔링",
                "멈추지 않는 실행력",
                "내 브랜드만의 스토리",
                "작은 교회, 작은 밴드 → 충성팬",
                "같은 꿈을 꾸는 팬층",
                "시도, 변화, 노력",
                "영원불멸한 비즈니스는 없다",
                "계속 움직이고 나아가야 한다"
            ]
        },
        {
            title: "가이드 & 희망",
            pages: [
                "메시지", "실패도 자산", "저렴한 시도", "사이클",
                "체크리스트", "실패 = 포트폴리오", "AI = 동반자", "엔딩 메시지",
                "끝"
            ],
            contexts: [
                "시도해도 된다",
                "실패=포트폴리오",
                "월 20달러로 가능한 창업 실험",
                "작게 시작 → 빠른 피드백 → 개선 → 확장",
                "오늘 시작할 5가지: 아이디어, 프로토타입, SNS, 팬, 반복",
                "실패는 자산으로 남는다",
                "AI는 기획자의 강력한 파트너",
                "여러분의 시도가 세상을 바꿀 수 있습니다",
                "감사합니다"
            ]
        }
    ];
    
    let pageNumber = 12; // 이미 생성된 페이지 다음부터
    
    for (let chapterIndex = 1; chapterIndex < chapters.length + 1; chapterIndex++) {
        const chapter = chapters[chapterIndex - 1];
        const startPage = chapterIndex === 1 ? 11 : (chapterIndex - 1) * 10 + 1;
        
        for (let pageIndex = chapterIndex === 1 ? 1 : 0; pageIndex < chapter.pages.length; pageIndex++) {
            if (pageNumber > totalPages) break;
            
            const isFirstPageOfChapter = pageIndex === 0 && chapterIndex > 1;
            const context = chapter.contexts ? chapter.contexts[pageIndex] : "";
            const slide = createSlide(chapterIndex + 1, pageNumber, chapter.title, chapter.pages[pageIndex], isFirstPageOfChapter, context);
            slideContainer.appendChild(slide);
            pageNumber++;
        }
    }
}

// 슬라이드 생성 함수
function createSlide(chapterNum, pageNum, chapterTitle, pageTitle, isFirstPage, context = "") {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.setAttribute('data-chapter', chapterNum);
    slide.setAttribute('data-page', pageNum);
    
    const content = isFirstPage ? 
        createChapterIntroContent(chapterNum, chapterTitle) :
        createRegularContent(chapterNum, chapterTitle, pageTitle, pageNum, context);
    
    slide.innerHTML = `
        <div class="slide-content">
            ${content}
        </div>
    `;
    
    return slide;
}

// 챕터 인트로 컨텐츠 생성
function createChapterIntroContent(chapterNum, chapterTitle) {
    const introTexts = {
        3: {
            subtitle: "AI 창업 유형 – Part 1",
            description: "기획자가 AI로 창업할 수 있는 다양한 방법들을 살펴보겠습니다.",
            points: [
                "기획 자동화로 더 많은 프로젝트 수주",
                "SaaS 개발과 월 구독 모델",
                "직접 개발 창업의 가능성",
                "성공 사례와 장단점 분석"
            ]
        },
        4: {
            subtitle: "AI 창업 유형 – Part 2",
            description: "커머스, 가상 인플루언서, 교육 분야의 AI 창업 기회를 탐색합니다.",
            points: [
                "가상 인플루언서와 팬덤 창출",
                "AI 콘텐츠와 커머스의 결합",
                "교육 부트캠프 사업 모델",
                "실제 성공 사례 분석"
            ]
        },
        5: {
            subtitle: "경쟁의 현실",
            description: "AI 창업의 진입 장벽이 낮다는 것의 양면성을 이해합니다.",
            points: [
                "카페, 김치찌개, 순대타운의 교훈",
                "차별화의 중요성",
                "AI 창업 = 골목식당 구조",
                "성공하는 차별화 전략"
            ]
        },
        6: {
            subtitle: "현실적 장벽들",
            description: "AI 창업에서 마주하게 될 실제 어려움들을 살펴봅니다.",
            points: [
                "빠른 복제와 자본 압박",
                "보안·법적 이슈",
                "고객 유입 비용과 트렌드 변화",
                "실제 스타트업 사례들"
            ]
        },
        7: {
            subtitle: "진짜 경쟁력",
            description: "기술이 아닌 우리만의 가치를 만드는 방법을 배웁니다.",
            points: [
                "상상력, 시도, 세계관의 중요성",
                "팬덤 구축 전략",
                "지속적인 변화와 노력",
                "영원불멸한 비즈니스는 없다"
            ]
        },
        8: {
            subtitle: "실행 가이드와 희망",
            description: "실제로 시작할 수 있는 구체적인 방법과 마음가짐을 제시합니다.",
            points: [
                "저렴한 시도 방법 (월 20달러)",
                "작게 시작하는 사이클",
                "체크리스트 5가지",
                "기획자와 AI의 강력한 조합"
            ]
        }
    };
    
    const intro = introTexts[chapterNum] || {
        subtitle: "새로운 챕터",
        description: "AI 창업의 여정을 계속 이어가겠습니다.",
        points: ["핵심 개념", "실무 적용", "사례 연구", "실행 방법"]
    };
    
    return `
        <h1>Chapter ${chapterNum}: ${chapterTitle}</h1>
        <h2>${intro.subtitle}</h2>
        <div class="content">
            <p>${intro.description}</p>
            <div class="chapter-intro">
                <h3>이번 챕터에서 다룰 내용</h3>
                <ul>
                    ${intro.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// 일반 페이지 컨텐츠 생성
function createRegularContent(chapterNum, chapterTitle, pageTitle, pageNum, context) {
    const pageIndex = (pageNum - 1) % 10;
    const chapterIndex = chapterNum - 2; // Chapter 2부터 시작
    
    // 각 챕터별 특별한 레이아웃 정의
    const specialLayouts = {
        2: { // 유튜브 붐과 AI 창업
            0: `<div class="comparison-cards">
                    <div class="comparison-card youtube">
                        <h3>📺 유튜브/카메라</h3>
                        <p>스마트폰만 있으면 시작</p>
                    </div>
                    <div class="comparison-card ai">
                        <h3>🤖 AI 앱</h3>
                        <p>AI도 마찬가지로 쉬운 시작</p>
                    </div>
                </div>`,
            1: `<div class="stats-layout">
                    <div class="stat-item">
                        <div class="stat-number">90%</div>
                        <p>실패율</p>
                    </div>
                    <div class="stat-vs">VS</div>
                    <div class="stat-item">
                        <div class="stat-number">10%</div>
                        <p>성공률</p>
                    </div>
                </div>`,
            2: `<div class="thumbnails-grid">
                    <div class="thumbnail">📹</div>
                    <div class="thumbnail">🎬</div>
                    <div class="thumbnail">📺</div>
                    <div class="thumbnail">🎥</div>
                </div>`,
            3: `<div class="follower-chart">
                    <div class="chart-line"></div>
                    <p>팔로워 급상승 → 급하락</p>
                </div>`
        },
        3: { // 기획자가 AI로 창업할 수 있는 유형 1
            0: `<div class="process-diagram">
                    <div class="process-step">📝 기획</div>
                    <div class="process-arrow">→</div>
                    <div class="process-step">🤖 AI 자동화</div>
                    <div class="process-arrow">→</div>
                    <div class="process-step">💼 더 많은 프로젝트</div>
                </div>`,
            1: `<div class="three-cards">
                    <div class="card-item">
                        <div class="card-icon">📄</div>
                        <h4>기획 문서 작성</h4>
                    </div>
                    <div class="card-item">
                        <div class="card-icon">🔍</div>
                        <h4>리서치</h4>
                    </div>
                    <div class="card-item">
                        <div class="card-icon">💡</div>
                        <h4>아이디어 정리</h4>
                    </div>
                </div>`,
            2: `<div class="saas-layout">
                    <div class="saas-icon">🔧</div>
                    <div class="saas-arrow">→</div>
                    <div class="saas-model">💳 SaaS 구독</div>
                </div>`
        }
    };
    
    // 특별한 레이아웃이 있으면 사용, 없으면 기본 템플릿
    if (specialLayouts[chapterNum] && specialLayouts[chapterNum][pageIndex]) {
        return `<h2>${pageTitle}</h2>
                <div class="content">
                    <p>${context}</p>
                    ${specialLayouts[chapterNum][pageIndex]}
                </div>`;
    }
    
    // 기본 템플릿들
    const templates = [
        `<div class="emphasis-text">
             <h2>${pageTitle}</h2>
             <p>${context}</p>
         </div>`,
        
        `<h2>${pageTitle}</h2>
         <div class="content">
             <p>${context}</p>
             <div class="highlight-box">
                 <h3>핵심 포인트</h3>
                 <p>${pageTitle}의 중요성</p>
             </div>
         </div>`,
        
        `<div class="reason-card">
             <div class="reason-icon">⚡</div>
             <h2>${pageTitle}</h2>
             <p>${context}</p>
         </div>`,
        
        `<h2>${pageTitle}</h2>
         <div class="content">
             <p>${context}</p>
             <div class="case-study">
                 <h3>📊 사례 분석</h3>
                 <p>실제 적용 사례를 살펴보겠습니다</p>
             </div>
         </div>`,
        
        `<div class="summary-slide">
             <div class="summary-content">
                 <h2>${pageTitle}</h2>
                 <h1>${context}</h1>
             </div>
         </div>`
    ];
    
    const templateIndex = pageIndex % templates.length;
    return templates[templateIndex];
}

// 이벤트 리스너 설정
function setupEventListeners() {
    console.log('setupEventListeners 호출됨 - DOM 요소 확인:', {
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        slideContainer: !!slideContainer
    });
    
    // 네비게이션 버튼
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToPrevPage());
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToNextPage());
    }
    
    // 키보드 이벤트
    document.addEventListener('keydown', handleKeyPress);
    
    // 마우스 휠 이벤트
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    // 터치 이벤트 (모바일 지원)
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // 수평 스와이프가 수직 스와이프보다 클 때만 처리
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                goToPrevPage();
            } else {
                goToNextPage();
            }
        }
    });
}

// 랜딩/프레젠테이션 표시
function showLanding() {
    if (landingContainer) landingContainer.style.display = 'flex';
    if (presentationContainer) presentationContainer.style.display = 'none';
    
    // 헤더 숨기기
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) mainHeader.style.display = 'none';
}

function showPresentation() {
    if (landingContainer) landingContainer.style.display = 'none';
    if (presentationContainer) presentationContainer.style.display = 'block';
    
    // 헤더 표시
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) mainHeader.style.display = 'block';
    
    // 슬라이드가 아직 초기화되지 않았다면 초기화
    if (slides.length === 0) {
        initializeSlides();
        updateUI();
        setupEventListeners();
        setupEditingFeatures();
    }
}

// 키보드 이벤트 처리
function handleKeyPress(e) {
    if (isAnimating) return;
    
    // 편집 모드에서 텍스트 입력 중이거나 모달이 열려있을 때는 네비게이션 키 무시
    const isEditingText = e.target.tagName === 'INPUT' || 
                         e.target.tagName === 'TEXTAREA' || 
                         e.target.contentEditable === 'true';
    const isModalOpen = textEditModal?.classList.contains('show') ||
                       imageUploadModal?.classList.contains('show');
    const isEditModeActive = isEditMode;
    
    if (isEditingText || isModalOpen || (isEditModeActive && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key))) {
        // Escape 키와 편집 모드 토글(E)만 허용
        if (e.key === 'Escape') {
            if (textEditModal && textEditModal.classList.contains('show')) {
                closeTextEditModal();
            }
            if (imageUploadModal && imageUploadModal.classList.contains('show')) {
                closeImageUploadModal();
            }
            if (keyboardHelp && keyboardHelp.classList.contains('show')) {
                hideKeyboardHelp();
            }
        } else if (e.key === 'e' || e.key === 'E') {
            if (!isEditingText && !isModalOpen) {
                toggleEditMode();
            }
        }
        
        // 편집 모드에서 방향키는 완전히 차단
        if (isEditModeActive && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
        }
        return;
    }
    
    switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            goToPrevPage();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
            e.preventDefault();
            goToNextPage();
            break;
        case 'Home':
            e.preventDefault();
            goToPage(1);
            break;
        case 'End':
            e.preventDefault();
            goToPage(totalPages);
            break;
        case 'h':
        case 'H':
            toggleKeyboardHelp();
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
        case 'e':
        case 'E':
            toggleEditMode();
            break;
        case 'Escape':
            if (keyboardHelp && keyboardHelp.classList.contains('show')) {
                hideKeyboardHelp();
            }
            break;
    }
}

// 마우스 휠 이벤트 처리
function handleWheel(e) {
    if (isAnimating) return;
    
    e.preventDefault();
    
    if (e.deltaY > 0) {
        goToNextPage();
    } else {
        goToPrevPage();
    }
}

// 이전 페이지로 이동
function goToPrevPage() {
    if (currentPage > 1 && !isAnimating) {
        goToPage(currentPage - 1, 'prev');
    }
}

// 다음 페이지로 이동
function goToNextPage() {
    console.log('goToNextPage 호출됨 - currentPage:', currentPage, 'totalPages:', totalPages, 'isAnimating:', isAnimating);
    if (currentPage < totalPages && !isAnimating) {
        goToPage(currentPage + 1, 'next');
    } else {
        console.log('페이지 이동이 차단됨 - 조건 확인:', {
            canGoNext: currentPage < totalPages,
            notAnimating: !isAnimating,
            currentPage,
            totalPages,
            slidesLength: slides.length
        });
    }
}

// 특정 페이지로 이동
function goToPage(pageNumber, direction = 'next') {
    console.log('goToPage 호출됨 - pageNumber:', pageNumber, 'direction:', direction, 'slides.length:', slides.length);
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage || isAnimating) {
        console.log('goToPage 차단됨 - 조건 확인:', {
            tooLow: pageNumber < 1,
            tooHigh: pageNumber > totalPages,
            sameePage: pageNumber === currentPage,
            animating: isAnimating,
            slidesLength: slides.length
        });
        return;
    }
    
    isAnimating = true;
    
    const currentSlide = slides[currentPage - 1];
    const targetSlide = slides[pageNumber - 1];
    
    if (!currentSlide || !targetSlide) {
        console.error('슬라이드를 찾을 수 없음:', {
            currentSlide: !!currentSlide,
            targetSlide: !!targetSlide,
            currentPage,
            pageNumber,
            slidesLength: slides.length
        });
        isAnimating = false;
        return;
    }
    
    // 현재 슬라이드 숨기기
    currentSlide.classList.remove('active');
    currentSlide.classList.add(direction === 'next' ? 'prev' : 'next');
    
    // 새 슬라이드 표시
    targetSlide.classList.remove('prev', 'next');
    
    // 애니메이션 클래스 추가
    if (direction === 'next') {
        targetSlide.classList.add('slide-in-right');
    } else {
        targetSlide.classList.add('slide-in-left');
    }
    
    setTimeout(() => {
        targetSlide.classList.add('active');
        targetSlide.classList.remove('slide-in-right', 'slide-in-left');
        
        currentPage = pageNumber;
        updateUI();
        
        // 편집 버튼 업데이트
        updateEditButtonsOnPageChange();
        
        setTimeout(() => {
            isAnimating = false;
        }, 100);
    }, 50);
}

// UI 업데이트
function updateUI() {
    // 페이지 번호 업데이트
    currentPageSpan.textContent = currentPage;
    totalPagesSpan.textContent = totalPages;
    
    // 챕터 정보 업데이트
    const currentChapter = Math.ceil(currentPage / pagesPerChapter);
    chapterInfo.textContent = `Chapter ${currentChapter}`;
    
    // 프로그레스 바 업데이트
    const progress = (currentPage / totalPages) * 100;
    progressFill.style.width = `${progress}%`;
    
    // 네비게이션 버튼 상태 업데이트
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // 네비게이션 버튼 스타일 업데이트
    if (currentPage === 1) {
        prevBtn.style.opacity = '0.5';
    } else {
        prevBtn.style.opacity = '1';
    }
    
    if (currentPage === totalPages) {
        nextBtn.style.opacity = '0.5';
    } else {
        nextBtn.style.opacity = '1';
    }
}

// 키보드 도움말 토글
function toggleKeyboardHelp() {
    keyboardHelp.classList.toggle('show');
}

// 키보드 도움말 숨기기
function hideKeyboardHelp() {
    keyboardHelp.classList.remove('show');
}

// 전체화면 토글
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('전체화면 모드 진입 실패:', err);
        });
    } else {
        document.exitFullscreen().catch(err => {
            console.log('전체화면 모드 종료 실패:', err);
        });
    }
}

// 페이지 리사이즈 처리
window.addEventListener('resize', () => {
    // 리사이즈 시 레이아웃 재조정
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        updateUI();
    }, 250);
});

// 브라우저 히스토리 관리
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        goToPage(e.state.page);
    }
});

// 초기 히스토리 상태 설정
history.replaceState({ page: currentPage }, '', `#page-${currentPage}`);

// 페이지 변경 시 히스토리 업데이트
function updateHistory() {
    history.pushState({ page: currentPage }, '', `#page-${currentPage}`);
}

// URL 해시 기반 초기 페이지 설정
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash.startsWith('#page-')) {
        const pageNum = parseInt(hash.replace('#page-', ''));
        if (pageNum >= 1 && pageNum <= totalPages) {
            goToPage(pageNum);
        }
    }
});

// 성능 최적화: 가시성이 있는 슬라이드만 렌더링
const observerOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0.1
};

const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 슬라이드가 보이는 영역에 들어올 때 최적화 작업
            entry.target.style.willChange = 'transform, opacity';
        } else {
            // 슬라이드가 보이지 않는 영역으로 나갈 때 최적화 해제
            entry.target.style.willChange = 'auto';
        }
    });
}, observerOptions);

// 모든 슬라이드에 observer 적용
slides.forEach(slide => {
    slideObserver.observe(slide);
});

// 에러 처리 및 로깅
window.addEventListener('error', (e) => {
    console.error('프레젠테이션 에러:', e.error);
});

// 개발자 도구: 콘솔에서 페이지 점프 함수 제공
window.jumpToPage = goToPage;
window.jumpToChapter = (chapterNum) => {
    const page = (chapterNum - 1) * pagesPerChapter + 1;
    goToPage(page);
};

console.log('🚀 기획자의 AI 창업 프레젠테이션이 준비되었습니다!');
console.log('📝 사용 가능한 명령어:');
console.log('   - jumpToPage(페이지번호): 특정 페이지로 이동');
console.log('   - jumpToChapter(챕터번호): 특정 챕터로 이동');
console.log('⌨️  키보드 단축키: ←/→ 이동, Space 다음페이지, H 도움말, F 전체화면, E 편집모드');

// ========== 편집 기능 ==========

// 편집 기능 초기화
function setupEditingFeatures() {
    // 편집 모드 토글 버튼
    if (editModeToggle) {
        editModeToggle.addEventListener('click', toggleEditMode);
    }
    
    // 텍스트 편집 모달 이벤트
    if (textEditSave) {
        textEditSave.addEventListener('click', saveTextEdit);
    }
    if (textEditCancel) {
        textEditCancel.addEventListener('click', closeTextEditModal);
    }
    
    // 텍스트 에어리어에서 키보드 이벤트 전파 방지
    if (textEditTextarea) {
        textEditTextarea.addEventListener('keydown', (e) => {
            e.stopPropagation();
        });
        textEditTextarea.addEventListener('keyup', (e) => {
            e.stopPropagation();
        });
        textEditTextarea.addEventListener('keypress', (e) => {
            e.stopPropagation();
        });
    }
    
    // 이미지 업로드 모달 이벤트
    if (imageUploadArea) {
        imageUploadArea.addEventListener('click', () => fileInput.click());
        imageUploadArea.addEventListener('dragover', handleDragOver);
        imageUploadArea.addEventListener('drop', handleDrop);
    }
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    if (imageUploadSave) {
        imageUploadSave.addEventListener('click', saveImageUpload);
    }
    if (imageUploadCancel) {
        imageUploadCancel.addEventListener('click', closeImageUploadModal);
    }
    
    // 모달 배경 클릭 시 닫기
    if (textEditModal) {
        textEditModal.addEventListener('click', (e) => {
            if (e.target === textEditModal) {
                closeTextEditModal();
            }
        });
    }
    if (imageUploadModal) {
        imageUploadModal.addEventListener('click', (e) => {
            if (e.target === imageUploadModal) {
                closeImageUploadModal();
            }
        });
    }
}

// 편집 모드 토글
function toggleEditMode() {
    isEditMode = !isEditMode;
    
    if (isEditMode) {
        enableEditMode();
    } else {
        disableEditMode();
    }
}

// 편집 모드 활성화
function enableEditMode() {
    editModeToggle.textContent = '🔒 편집 완료';
    editModeToggle.classList.add('active');
    document.body.classList.add('edit-mode');
    
    // 현재 슬라이드의 편집 가능한 요소들에 편집 버튼 추가
    addEditButtonsToCurrentSlide();
    
    showSaveStatus('편집 모드 활성화', 'saved');
}

// 편집 모드 비활성화
function disableEditMode() {
    editModeToggle.textContent = '📝 편집 모드';
    editModeToggle.classList.remove('active');
    document.body.classList.remove('edit-mode');
    
    // 모든 편집 버튼 제거
    removeAllEditButtons();
    
    showSaveStatus('편집 모드 비활성화', 'saved');
}

// 현재 슬라이드에 편집 버튼 추가
function addEditButtonsToCurrentSlide() {
    const currentSlide = slides[currentPage - 1];
    if (!currentSlide) return;
    
    // 통일된 구조의 편집 가능한 영역들에 편집 버튼 추가
    const editableFields = currentSlide.querySelectorAll('[data-field]');
    editableFields.forEach(element => {
        if (!element.querySelector('.edit-button')) {
            const fieldType = element.getAttribute('data-field');
            if (fieldType === 'image') {
                addEditButton(element, 'image');
            } else {
                addEditButton(element, 'text');
            }
        }
    });
    
    // 기존 구조의 요소들도 지원 (하위 호환성)
    const legacyTextElements = currentSlide.querySelectorAll('h1, h2, h3, p, .subtitle, .main-title');
    legacyTextElements.forEach(element => {
        if (!element.closest('[data-field]') && !element.querySelector('.edit-button')) {
            addEditButton(element, 'text');
        }
    });
    
    const legacyImageElements = currentSlide.querySelectorAll('.ai-business-bg, .youtube-ai-bg, .card-icon, .reason-icon-large, .upload-icon');
    legacyImageElements.forEach(element => {
        if (!element.closest('[data-field]') && !element.querySelector('.edit-button')) {
            addEditButton(element, 'image');
        }
    });
}

// 편집 버튼 추가
function addEditButton(element, type) {
    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = type === 'text' ? '✏️' : '📷';
    editButton.title = type === 'text' ? '텍스트 편집' : '이미지 편집';
    
    element.classList.add('editable', `${type}-editable`);
    element.style.position = 'relative';
    element.appendChild(editButton);
    
    editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (type === 'text') {
            openTextEditModal(element);
        } else {
            openImageUploadModal(element);
        }
    });
}

// 모든 편집 버튼 제거
function removeAllEditButtons() {
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => button.remove());
    
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.classList.remove('editable', 'text-editable', 'image-editable');
    });
}

// 텍스트 편집 모달 열기
function openTextEditModal(element) {
    currentEditElement = element;
    
    // 통일된 구조에서 실제 텍스트 내용 가져오기
    let currentText = '';
    const contentSpan = element.querySelector('.content');
    if (contentSpan) {
        currentText = contentSpan.textContent.trim();
    } else {
        currentText = element.textContent.trim();
    }
    
    // 필드 타입에 따른 제목 설정
    const fieldType = element.getAttribute('data-field');
    let modalTitle = '텍스트 편집';
    switch (fieldType) {
        case 'title':
            modalTitle = '제목 편집';
            break;
        case 'subtitle':
            modalTitle = '부제목 편집';
            break;
        case 'context':
            modalTitle = '내용 편집';
            break;
        default:
            modalTitle = '텍스트 편집';
    }
    
    textEditTextarea.value = currentText;
    textEditTitle.textContent = `${modalTitle} - 페이지 ${currentPage}`;
    textEditModal.classList.add('show');
    
    // 포커스를 주고 키보드 이벤트 전파 방지
    setTimeout(() => {
        textEditTextarea.focus();
        textEditTextarea.select();
    }, 100);
}

// 텍스트 편집 모달 닫기
function closeTextEditModal() {
    textEditModal.classList.remove('show');
    currentEditElement = null;
    textEditTextarea.value = '';
}

// 텍스트 편집 저장
async function saveTextEdit() {
    if (!currentEditElement) return;
    
    const newText = textEditTextarea.value.trim();
    if (!newText) return;
    
    // UI 업데이트
    showSaveStatus('저장 중...', 'saving');
    const saveTextElement = textEditSave.querySelector('.save-text');
    const loadingSpinner = textEditSave.querySelector('.loading-spinner');
    
    if (saveTextElement) saveTextElement.style.display = 'none';
    if (loadingSpinner) loadingSpinner.style.display = 'inline-block';
    
    try {
        // 현재 페이지의 챕터와 페이지 번호 계산
        const chapterNum = Math.ceil(currentPage / 10);
        const pageNum = currentPage;
        
        // 텍스트 유형 결정
        let textType = 'mainText';
        if (currentEditElement.tagName === 'H1') textType = 'title';
        else if (currentEditElement.classList.contains('subtitle')) textType = 'subtitle';
        
        // 통일된 구조에서 텍스트 업데이트
        const contentSpan = currentEditElement.querySelector('.content');
        const emptySpan = currentEditElement.querySelector('.empty-content');
        
        if (contentSpan && emptySpan) {
            // 새로운 통일된 구조
            if (newText.trim()) {
                contentSpan.textContent = newText;
                contentSpan.style.display = 'block';
                emptySpan.style.display = 'none';
            } else {
                contentSpan.style.display = 'none';
                emptySpan.style.display = 'block';
            }
        } else {
            // 기존 구조 (하위 호환성)
            currentEditElement.textContent = newText;
        }
        
        // Firebase 또는 로컬 저장
        const fieldType = currentEditElement.getAttribute('data-field') || textType;
        
        // 항상 로컬에 저장 (Firebase는 추가 백업)
        saveToLocalStorage(chapterNum, pageNum, fieldType, newText);
        showSaveStatus('저장 완료', 'saved');
        
        // Firebase 비활성화 - 로컬 저장만 사용
        console.log('로컬 저장 완료 (Firebase 비활성화됨)');
        
        closeTextEditModal();
    } catch (error) {
        console.error('텍스트 저장 오류:', error);
        showSaveStatus('저장 실패', 'error');
    } finally {
        const saveTextElement = textEditSave.querySelector('.save-text');
        const loadingSpinner = textEditSave.querySelector('.loading-spinner');
        
        if (saveTextElement) saveTextElement.style.display = 'inline';
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    }
}

// 이미지 업로드 모달 열기
function openImageUploadModal(element) {
    currentEditElement = element;
    imageUploadModal.classList.add('show');
    resetImageUploadModal();
}

// 이미지 업로드 모달 닫기
function closeImageUploadModal() {
    imageUploadModal.classList.remove('show');
    currentEditElement = null;
    resetImageUploadModal();
}

// 이미지 업로드 모달 리셋
function resetImageUploadModal() {
    imagePreviewContainer.style.display = 'none';
    imageUploadSave.disabled = true;
    fileInput.value = '';
}

// 드래그 오버 처리
function handleDragOver(e) {
    e.preventDefault();
    imageUploadArea.classList.add('dragover');
}

// 드롭 처리
function handleDrop(e) {
    e.preventDefault();
    imageUploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

// 파일 선택 처리
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

// 파일 처리
function handleFile(file) {
    // 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB 제한
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
    }
    
    // 미리보기 표시
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreviewContainer.style.display = 'block';
        imageUploadSave.disabled = false;
    };
    reader.readAsDataURL(file);
}

// 이미지 업로드 저장
async function saveImageUpload() {
    if (!currentEditElement || !fileInput.files[0]) return;
    
    const file = fileInput.files[0];
    
    // UI 업데이트
    showSaveStatus('업로드 중...', 'saving');
    const saveTextElement = imageUploadSave.querySelector('.save-text');
    const loadingSpinner = imageUploadSave.querySelector('.loading-spinner');
    
    if (saveTextElement) saveTextElement.style.display = 'none';
    if (loadingSpinner) loadingSpinner.style.display = 'inline-block';
    
    try {
        // 현재 페이지의 챕터와 페이지 번호 계산
        const chapterNum = Math.ceil(currentPage / 10);
        const pageNum = currentPage;
        
        // 이미지 유형 결정
        let imageType = 'main';
        if (currentEditElement.classList.contains('ai-business-bg')) imageType = 'background';
        else if (currentEditElement.classList.contains('card-icon')) imageType = 'icon';
        
        // 로컬에서 이미지 처리
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            
            // 통일된 구조에서 이미지 업데이트
            const fieldType = currentEditElement.getAttribute('data-field');
            
            if (fieldType === 'image') {
                // 새로운 통일된 구조의 이미지 영역
                const emptySpan = currentEditElement.querySelector('.empty-content');
                
                // 기존 이미지 제거
                const existingImg = currentEditElement.querySelector('img');
                if (existingImg) {
                    existingImg.remove();
                }
                
                // 새 이미지 추가
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.objectFit = 'contain';
                
                currentEditElement.appendChild(img);
                currentEditElement.classList.remove('empty');
                
                if (emptySpan) {
                    emptySpan.style.display = 'none';
                }
            } else {
                // 기존 구조 (하위 호환성)
                if (imageType === 'background') {
                    currentEditElement.style.backgroundImage = `url(${imageUrl})`;
                    currentEditElement.style.backgroundSize = 'cover';
                    currentEditElement.style.backgroundPosition = 'center';
                } else {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    currentEditElement.innerHTML = '';
                    currentEditElement.appendChild(img);
                }
            }
            
            // Firebase 또는 로컬 저장
            const saveKey = fieldType === 'image' ? 'image' : `image_${imageType}`;
            
            // 항상 로컬에 저장 (Firebase는 추가 백업)
            saveToLocalStorage(chapterNum, pageNum, saveKey, imageUrl);
            showSaveStatus('이미지 저장 완료', 'saved');
            
            // Firebase 비활성화 - 로컬 저장만 사용
            console.log('로컬 이미지 저장 완료 (Firebase 비활성화됨)');
            
            closeImageUploadModal();
        };
        reader.readAsDataURL(file);
    } catch (error) {
        console.error('이미지 업로드 오류:', error);
        showSaveStatus('업로드 실패', 'error');
    } finally {
        const saveTextElement = imageUploadSave.querySelector('.save-text');
        const loadingSpinner = imageUploadSave.querySelector('.loading-spinner');
        
        if (saveTextElement) saveTextElement.style.display = 'inline';
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    }
}

// 저장 상태 표시
function showSaveStatus(message, type) {
    if (!saveStatus) return;
    
    saveStatus.textContent = message;
    saveStatus.className = `save-status show ${type}`;
    
    setTimeout(() => {
        saveStatus.classList.remove('show');
    }, 3000);
}

// 페이지 변경 시 편집 버튼 업데이트
function updateEditButtonsOnPageChange() {
    if (isEditMode) {
        removeAllEditButtons();
        setTimeout(() => {
            addEditButtonsToCurrentSlide();
        }, 300); // 슬라이드 애니메이션 후 실행
    }
}

// 인증 초기화
async function initializeAuth() {
    try {
        console.log('🔐 인증 시스템 초기화 중...');
        
        // 환경 체크 - 로컬 개발환경에서는 바로 로컬 모드로 전환
        if (location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            console.log('🏠 로컬 개발환경 감지 - 로컬 모드로 전환');
            enableLocalMode();
            return;
        }
        
        // Firebase 모듈 로드 시도
        const firebaseLoaded = await loadFirebaseModule();
        
        if (!firebaseLoaded || !authService) {
            console.warn('Firebase 모듈 로드 실패 - 로컬 모드로 전환');
            enableLocalMode();
            return;
        }
        
        // 인증 이벤트 리스너 설정
        setupAuthEventListeners();
        
        // 인증 상태 변경 리스너 등록
        authService.onAuthStateChange((user) => {
            updateAuthUI(user);
            updateEditModeAccess(user);
        });
        
        console.log('✅ 인증 시스템 초기화 완료');
        
        // 인증 UI 표시
        if (authContainer) {
            authContainer.style.display = 'block';
        }

    } catch (error) {
        console.warn('❌ 인증 시스템 초기화 실패 - 로컬 모드로 전환:', error);
        enableLocalMode();
    }
}

// 로컬 모드 활성화
function enableLocalMode() {
    console.log('📝 로컬 모드로 실행합니다.');
    
    // Firebase 모드 플래그 해제
    window.isFirebaseMode = false;
    
    // 로컬 모드에서는 편집 모드 활성화
    if (editModeToggle) {
        editModeToggle.style.display = 'block';
        editModeToggle.disabled = false;
    }
    
    // 인증 UI는 랜딩에서 처리
    if (authContainer) {
        authContainer.style.display = 'none';
    }

    // 슬라이드 초기화
    initializeSlides();
    updateUI();
    setupEventListeners();
    
    // 편집 기능 활성화
    setupEditingFeatures();
    
    // 프레젠테이션 보여주기
    showPresentation();
    
    // 로컬 모드 환영 메시지
    setTimeout(() => {
        showSaveStatus('✨ 로컬 편집 모드 활성화됨', 'saved');
    }, 1000);
}

// 인증 이벤트 리스너 설정
function setupAuthEventListeners() {
    // 구글 로그인 버튼
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', handleGoogleLogin);
    }
    if (landingGoogleLoginBtn) {
        landingGoogleLoginBtn.addEventListener('click', handleGoogleLogin);
    }
    
    // 게스트 로그인 버튼
    if (guestLoginBtn) {
        guestLoginBtn.addEventListener('click', handleGuestLogin);
    }
    if (landingGuestLoginBtn) {
        landingGuestLoginBtn.addEventListener('click', handleGuestLogin);
    }
    
    // 로그아웃 버튼
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// 구글 로그인 처리
async function handleGoogleLogin() {
    if (!authService) return;
    
    // 로딩 상태 표시
    setButtonLoading(googleLoginBtn, true);
    
    try {
        const result = await authService.signInWithGoogle();
        
        if (result.success) {
            console.log('구글 로그인 성공:', result.user);
            showSaveStatus('로그인 성공!', 'saved');
        } else {
            console.error('구글 로그인 실패:', result.error);
            showSaveStatus(result.error, 'error');
        }
    } catch (error) {
        console.error('구글 로그인 오류:', error);
        showSaveStatus('로그인 중 오류가 발생했습니다.', 'error');
    } finally {
        setButtonLoading(googleLoginBtn, false);
    }
}

// 게스트 로그인 처리
async function handleGuestLogin() {
    if (!authService) return;
    
    // 로딩 상태 표시
    setButtonLoading(guestLoginBtn, true);
    
    try {
        const result = await authService.signInAnonymously();
        
        if (result.success) {
            console.log('게스트 로그인 성공:', result.user);
            showSaveStatus('게스트로 로그인했습니다.', 'saved');
        } else {
            console.error('게스트 로그인 실패:', result.error);
            showSaveStatus(result.error, 'error');
        }
    } catch (error) {
        console.error('게스트 로그인 오류:', error);
        showSaveStatus('게스트 로그인 중 오류가 발생했습니다.', 'error');
    } finally {
        setButtonLoading(guestLoginBtn, false);
    }
}

// 로그아웃 처리
async function handleLogout() {
    if (!authService) return;
    
    // 로딩 상태 표시
    setButtonLoading(logoutBtn, true);
    
    try {
        const result = await authService.signOut();
        
        if (result.success) {
            console.log('로그아웃 성공');
            showSaveStatus('로그아웃되었습니다.', 'saved');
            
            // 편집 모드 비활성화
            if (isEditMode) {
                disableEditMode();
            }
        } else {
            console.error('로그아웃 실패:', result.error);
            showSaveStatus(result.error, 'error');
        }
    } catch (error) {
        console.error('로그아웃 오류:', error);
        showSaveStatus('로그아웃 중 오류가 발생했습니다.', 'error');
    } finally {
        setButtonLoading(logoutBtn, false);
    }
}

// 버튼 로딩 상태 설정
function setButtonLoading(button, isLoading) {
    if (!button) return;
    
    if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
        
        // 로딩 스피너 추가
        if (!button.querySelector('.loading-spinner')) {
            const spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            button.appendChild(spinner);
        }
        
        // 버튼 텍스트 숨김
        const textElements = button.querySelectorAll(':not(.loading-spinner)');
        textElements.forEach(el => {
            if (el.nodeType === Node.TEXT_NODE || el.tagName !== 'DIV') {
                el.style.display = 'none';
            }
        });
    } else {
        button.disabled = false;
        button.classList.remove('loading');
        
        // 로딩 스피너 제거
        const spinner = button.querySelector('.loading-spinner');
        if (spinner) {
            spinner.remove();
        }
        
        // 버튼 텍스트 표시
        const textElements = button.querySelectorAll(':not(.loading-spinner)');
        textElements.forEach(el => {
            el.style.display = '';
        });
    }
}

// 인증 UI 업데이트
function updateAuthUI(user) {
    if (!authLogin || !authProfile) return;
    
    if (user) {
        // 로그인 상태
        showPresentation();
        authLogin.style.display = 'none';
        authProfile.style.display = 'block';
        
        // 사용자 정보 표시
        if (userName) {
            const userRole = getUserRole(user);
            const roleEmoji = userRole === 'instructor' ? '👨‍🏫' : '👨‍🎓';
            const roleName = userRole === 'instructor' ? '강사' : '학생';
            userName.textContent = `${roleEmoji} ${user.displayName || roleName}`;
        }
        
        if (userEmail) {
            userEmail.textContent = user.email || (user.isAnonymous ? '게스트 사용자' : '이메일 없음');
        }
        
        if (userAvatar) {
            if (user.photoURL && !user.isAnonymous) {
                userAvatar.src = user.photoURL;
                userAvatar.style.display = 'block';
            } else {
                // 기본 아바타 또는 게스트 아이콘
                userAvatar.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2Yzc1N2QiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTRDOC42ODYyOSAxNCA2IDE2LjY4NjMgNiAyMFYyMkgxOFYyMEMxOCAxNi42ODYzIDE1LjMxMzcgMTQgMTIgMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';
                userAvatar.style.display = 'block';
            }
        }
        
        window.isFirebaseMode = true;
    } else {
        showLanding();
        // 로그아웃 상태
        authLogin.style.display = 'block';
        authProfile.style.display = 'none';
        
        window.isFirebaseMode = false;
    }
}

// 사용자 권한 체크
function getUserRole(user) {
    if (!user) return 'guest';
    
    // 강사 계정 목록
    const instructorEmails = [
        'meangyun0729@gmail.com'
    ];
    
    if (instructorEmails.includes(user.email)) {
        return 'instructor';
    }
    
    return 'student'; // 일반 회원
}

// 편집 모드 접근 권한 업데이트
function updateEditModeAccess(user) {
    if (!editModeToggle) return;
    
    const userRole = getUserRole(user);
    
    if (userRole === 'instructor') {
        // 강사는 편집 가능
        editModeToggle.style.display = 'block';
        editModeToggle.disabled = false;
        console.log('👨‍🏫 강사 권한: 편집 모드 활성화');
    } else if (userRole === 'student') {
        // 일반 회원은 편집 불가능
        editModeToggle.style.display = 'none';
        editModeToggle.disabled = true;
        console.log('👨‍🎓 학생 권한: 편집 모드 비활성화');
    } else {
        // 게스트는 편집 불가능
        editModeToggle.style.display = 'none';
        editModeToggle.disabled = true;
        console.log('👤 게스트: 편집 모드 비활성화');
    }
    
    if (!user) {
        // 로그아웃된 사용자는 편집 모드 사용 불가
        editModeToggle.style.display = 'none';
        
        // 편집 모드가 활성화되어 있다면 비활성화
        if (isEditMode) {
            disableEditMode();
        }
        return;
    }

    // 역할 기반 제어
    try {
        const role = authService?.getCurrentRole ? authService.getCurrentRole() : 'member';
        if (role === 'instructor') {
            editModeToggle.style.display = 'block';
        } else {
            editModeToggle.style.display = 'none';
            if (isEditMode) disableEditMode();
        }
    } catch (e) {
        // 안전 기본값: 비표시
        editModeToggle.style.display = 'none';
        if (isEditMode) disableEditMode();
    }
}

// 슬라이드 데이터로 업데이트
function updateSlideWithData(slide, slideData) {
    Object.keys(slideData).forEach(fieldKey => {
        if (fieldKey === 'lastModified') return;
        
        const fieldElement = slide.querySelector(`[data-field="${fieldKey}"]`);
        if (fieldElement) {
            const value = slideData[fieldKey];
            
            if (fieldKey === 'image') {
                // 이미지 복원
                if (value) {
                    const emptySpan = fieldElement.querySelector('.empty-content');
                    const existingImg = fieldElement.querySelector('img');
                    
                    if (existingImg) {
                        existingImg.remove();
                    }
                    
                    const img = document.createElement('img');
                    img.src = value;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100%';
                    img.style.objectFit = 'contain';
                    
                    fieldElement.appendChild(img);
                    fieldElement.classList.remove('empty');
                    
                    if (emptySpan) {
                        emptySpan.style.display = 'none';
                    }
                }
            } else {
                // 텍스트 복원
                const contentSpan = fieldElement.querySelector('.content');
                const emptySpan = fieldElement.querySelector('.empty-content');
                
                if (contentSpan && emptySpan) {
                    if (value && value.trim()) {
                        contentSpan.textContent = value;
                        contentSpan.style.display = 'block';
                        emptySpan.style.display = 'none';
                    } else {
                        contentSpan.style.display = 'none';
                        emptySpan.style.display = 'block';
                    }
                }
            }
        }
    });
}

// 로컬 스토리지에 저장하는 헬퍼 함수
function saveToLocalStorage(chapterNum, pageNum, fieldType, value) {
    const slideKey = `slide-${chapterNum}-${pageNum}`;
    const slideData = JSON.parse(localStorage.getItem('slideData') || '{}');
    
    slideData[slideKey] = {
        ...slideData[slideKey],
        [fieldType]: value,
        lastModified: new Date().toISOString()
    };
    localStorage.setItem('slideData', JSON.stringify(slideData));
}

// 저장된 데이터 로드 (로컬 스토리지)
function loadSavedData() {
    try {
        const savedData = JSON.parse(localStorage.getItem('slideData') || '{}');
        
        Object.keys(savedData).forEach(slideKey => {
            const slideData = savedData[slideKey];
            const [, chapterNum, pageNum] = slideKey.split('-');
            const slideIndex = parseInt(pageNum) - 1;
            
            if (slides[slideIndex]) {
                const slide = slides[slideIndex];
                
                // 각 필드 데이터 복원
                Object.keys(slideData).forEach(fieldKey => {
                    if (fieldKey === 'lastModified') return;
                    
                    const fieldElement = slide.querySelector(`[data-field="${fieldKey}"]`);
                    if (fieldElement) {
                        const value = slideData[fieldKey];
                        
                        if (fieldKey === 'image') {
                            // 이미지 복원
                            if (value) {
                                const emptySpan = fieldElement.querySelector('.empty-content');
                                const existingImg = fieldElement.querySelector('img');
                                
                                if (existingImg) {
                                    existingImg.remove();
                                }
                                
                                const img = document.createElement('img');
                                img.src = value;
                                img.style.maxWidth = '100%';
                                img.style.maxHeight = '100%';
                                img.style.objectFit = 'contain';
                                
                                fieldElement.appendChild(img);
                                fieldElement.classList.remove('empty');
                                
                                if (emptySpan) {
                                    emptySpan.style.display = 'none';
                                }
                            }
                        } else {
                            // 텍스트 복원
                            const contentSpan = fieldElement.querySelector('.content');
                            const emptySpan = fieldElement.querySelector('.empty-content');
                            
                            if (contentSpan && emptySpan) {
                                if (value && value.trim()) {
                                    contentSpan.textContent = value;
                                    contentSpan.style.display = 'block';
                                    emptySpan.style.display = 'none';
                                } else {
                                    contentSpan.style.display = 'none';
                                    emptySpan.style.display = 'block';
                                }
                            }
                        }
                    }
                });
            }
        });
        
        console.log('💾 저장된 데이터를 복원했습니다.');
    } catch (error) {
        console.error('데이터 로드 오류:', error);
    }
}
