// Header 컴포넌트 - 로그인 정보, 편집모드, 네비게이션 통합
class Header {
    constructor() {
        this.isEditMode = false;
        this.currentUser = null;
        this.authService = null;
        this.initializeHeader();
    }

    // Header 초기화
    initializeHeader() {
        this.createHeaderHTML();
        
        // DOM 요소가 생성된 후 이벤트 바인딩 - 더 긴 지연시간
        setTimeout(() => {
            this.bindEvents();
            this.debugDOMElements();
            this.forceDropdownBinding(); // 강제 바인딩 추가
        }, 200);
        
        console.log('✅ Header 컴포넌트 초기화 완료');
    }

    // Header HTML 생성
    createHeaderHTML() {
        const headerContainer = document.getElementById('headerContainer');
        if (!headerContainer) {
            console.error('headerContainer를 찾을 수 없습니다.');
            return;
        }

        headerContainer.innerHTML = `
            <header class="modern-header">
                <div class="header-content">
                    <!-- 로고 및 제목 -->
                    <div class="header-left">
                        <div class="logo-section">
                            <h1 class="header-title">
                                <span class="title-icon">🤖</span>
                                기획자의 AI 창업
                            </h1>
                            <span class="header-subtitle">프레젠테이션</span>
                        </div>
                    </div>

                    <!-- 중앙 컨트롤들 -->
                    <div class="header-center">
                        <!-- 썸네일 미리보기 -->
                        <div class="slide-thumbnail" id="slideThumbnail" title="현재 슬라이드 미리보기">
                            <div class="thumbnail-content" id="thumbnailContent">
                                <div class="thumbnail-placeholder">📄</div>
                            </div>
                        </div>
                        
                        <!-- 페이지 정보 -->
                        <div class="page-info" title="클릭하여 페이지 이동">
                            <button class="page-nav-btn" id="prevPageBtn" title="이전 페이지">‹</button>
                            <span class="current-page" id="currentPageDisplay">1</span>
                            <span class="page-separator">/</span>
                            <span class="total-pages" id="totalPagesDisplay">80</span>
                            <button class="page-nav-btn" id="nextPageBtn" title="다음 페이지">›</button>
                            <div class="chapter-info" id="chapterInfoDisplay">Chapter 1</div>
                        </div>
                        
                        <!-- 페이지 입력 -->
                        <div class="page-input-container" id="pageInputContainer" style="display: none;">
                            <input type="number" id="pageInput" min="1" max="80" placeholder="페이지 번호">
                            <button id="goToPageBtn">이동</button>
                            <button id="cancelPageBtn">취소</button>
                        </div>
                    </div>

                    <!-- 우측 컨트롤들 -->
                    <div class="header-right">

                        <!-- 사용자 정보 / 로그인 -->
                        <div class="auth-section" id="authSection">
                            <!-- 로그인 전 -->
                            <div class="auth-login" id="authLogin">
                                <button class="auth-btn google-login" id="googleLoginBtn" title="Google 계정으로 로그인">
                                    <svg class="google-icon" viewBox="0 0 24 24" width="12" height="12">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span class="auth-text">Google</span>
                                </button>
                                <button class="auth-btn guest-login" id="guestLoginBtn" title="게스트로 입장">
                                    <span class="guest-icon">👤</span>
                                    <span class="auth-text">게스트</span>
                                </button>
                            </div>

                            <!-- 로그인 후 -->
                            <div class="auth-profile" id="authProfile" style="display: none;">
                                <div class="user-dropdown">
                                    <button class="user-dropdown-trigger" id="userDropdownTrigger">
                                        <img class="user-avatar" id="userAvatar" src="" alt="프로필">
                                        <span class="user-name-display" id="userName">사용자</span>
                                        <span class="dropdown-arrow">▼</span>
                                    </button>
                                    <div class="user-dropdown-menu" id="userDropdownMenu" style="display: none;">
                                        <div class="dropdown-header">
                                            <img class="dropdown-avatar" id="dropdownAvatar" src="" alt="프로필">
                                            <div class="dropdown-user-info">
                                                <span class="dropdown-user-name" id="dropdownUserName">사용자</span>
                                                <span class="dropdown-user-email" id="dropdownUserEmail">user@example.com</span>
                                            </div>
                                        </div>
                                        <div class="dropdown-divider"></div>
                                        <div class="dropdown-items">
                                            <button class="dropdown-item" id="editModeToggle">
                                                <span class="dropdown-icon">📝</span>
                                                <span class="dropdown-text">편집 모드</span>
                                                <span class="dropdown-status" id="editModeStatus">OFF</span>
                                            </button>
                                            <button class="dropdown-item" id="fullscreenToggle">
                                                <span class="dropdown-icon">⛶</span>
                                                <span class="dropdown-text">전체화면</span>
                                            </button>
                                            <button class="dropdown-item" id="helpToggle">
                                                <span class="dropdown-icon">❓</span>
                                                <span class="dropdown-text">도움말</span>
                                            </button>
                                        </div>
                                        <div class="dropdown-divider"></div>
                                        <button class="dropdown-item logout-item" id="logoutBtn">
                                            <span class="dropdown-icon">🚪</span>
                                            <span class="dropdown-text">로그아웃</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 프로그레스 바 -->
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill" style="width: 1.25%;"></div>
                    </div>
                </div>
            </header>
        `;
    }

    // 이벤트 바인딩
    bindEvents() {
        // 편집 모드 버튼
        const editModeBtn = document.getElementById('editModeBtn');
        if (editModeBtn) {
            editModeBtn.addEventListener('click', () => this.toggleEditMode());
        }

        // 페이지 네비게이션 버튼들
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');
        
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => {
                if (typeof goToPrevPage === 'function') {
                    goToPrevPage();
                }
            });
        }
        
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => {
                if (typeof goToNextPage === 'function') {
                    goToNextPage();
                }
            });
        }

        // 페이지 정보 클릭으로 페이지 입력 모드
        const pageInfo = document.querySelector('.page-info');
        if (pageInfo) {
            pageInfo.addEventListener('click', (e) => {
                if (!e.target.classList.contains('page-nav-btn')) {
                    this.showPageInput();
                }
            });
        }

        // 페이지 입력 기능
        const goToPageBtn = document.getElementById('goToPageBtn');
        const cancelPageBtn = document.getElementById('cancelPageBtn');
        const pageInput = document.getElementById('pageInput');

        if (goToPageBtn) {
            goToPageBtn.addEventListener('click', () => {
                this.goToInputPage();
            });
        }

        if (cancelPageBtn) {
            cancelPageBtn.addEventListener('click', () => {
                this.hidePageInput();
            });
        }

        if (pageInput) {
            pageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.goToInputPage();
                } else if (e.key === 'Escape') {
                    this.hidePageInput();
                }
            });
        }

        // 인증 버튼들
        const googleLoginBtn = document.getElementById('googleLoginBtn');
        const guestLoginBtn = document.getElementById('guestLoginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => this.handleGoogleLogin());
        }
        
        if (guestLoginBtn) {
            guestLoginBtn.addEventListener('click', () => this.handleGuestLogin());
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // 사용자 드롭다운 이벤트 - 강화된 바인딩
        const userDropdownTrigger = document.getElementById('userDropdownTrigger');
        console.log('🎯 드롭다운 트리거 요소:', userDropdownTrigger);
        
        if (userDropdownTrigger) {
            console.log('✅ 드롭다운 트리거 발견 - 이벤트 바인딩');
            
            // 클릭 이벤트
            userDropdownTrigger.addEventListener('click', (e) => {
                console.log('🖱️ 드롭다운 트리거 클릭됨!');
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown();
            });
            
            // 터치 이벤트 (모바일 지원)
            userDropdownTrigger.addEventListener('touchend', (e) => {
                console.log('👆 드롭다운 트리거 터치됨!');
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown();
            });
            
            // 포커스 이벤트 (키보드 접근성)
            userDropdownTrigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    console.log('⌨️ 드롭다운 트리거 키보드 활성화!');
                    e.preventDefault();
                    this.toggleDropdown();
                }
            });
        } else {
            console.error('❌ 드롭다운 트리거 요소를 찾을 수 없음');
        }

        // 드롭다운 메뉴 항목들
        const editModeToggle = document.getElementById('editModeToggle');
        const fullscreenToggle = document.getElementById('fullscreenToggle');
        const helpToggle = document.getElementById('helpToggle');

        if (editModeToggle) {
            editModeToggle.addEventListener('click', () => {
                this.toggleEditMode();
                this.closeDropdown();
            });
        }

        if (fullscreenToggle) {
            fullscreenToggle.addEventListener('click', () => {
                this.toggleFullscreen();
                this.closeDropdown();
            });
        }

        if (helpToggle) {
            helpToggle.addEventListener('click', () => {
                this.toggleHelp();
                this.closeDropdown();
            });
        }

        // 드롭다운 외부 클릭 시 닫기
        document.addEventListener('click', (e) => {
            const dropdownMenu = document.getElementById('userDropdownMenu');
            const userDropdown = document.querySelector('.user-dropdown');
            
            if (dropdownMenu && userDropdown && !userDropdown.contains(e.target)) {
                this.closeDropdown();
            }
        });
        
        // 추가적인 이벤트 위임 방식 (백업)
        document.addEventListener('click', (e) => {
            if (e.target.closest('#userDropdownTrigger')) {
                console.log('🎯 이벤트 위임으로 드롭다운 트리거 감지!');
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown();
            }
        });
        
        // 헤더 전체에서 사용자 드롭다운 관련 클릭 감지
        const headerElement = document.querySelector('.modern-header');
        if (headerElement) {
            headerElement.addEventListener('click', (e) => {
                console.log('🏠 헤더 클릭 감지:', e.target);
                
                // 드롭다운 트리거나 그 하위 요소 클릭 시
                if (e.target.closest('.user-dropdown-trigger')) {
                    console.log('🎯 헤더에서 드롭다운 트리거 감지!');
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleDropdown();
                }
            });
        }
    }

    // DOM 요소 디버깅
    debugDOMElements() {
        console.log('🔍 DOM 요소 디버깅 시작');
        
        const elements = {
            userDropdownTrigger: document.getElementById('userDropdownTrigger'),
            userDropdownMenu: document.getElementById('userDropdownMenu'),
            userName: document.getElementById('userName'),
            userAvatar: document.getElementById('userAvatar'),
            authProfile: document.getElementById('authProfile')
        };
        
        Object.entries(elements).forEach(([name, element]) => {
            if (element) {
                console.log(`✅ ${name}:`, element);
                console.log(`   - 클래스:`, element.className);
                console.log(`   - 스타일:`, element.style.display);
                console.log(`   - 이벤트:`, element.onclick ? '있음' : '없음');
            } else {
                console.error(`❌ ${name}: 요소를 찾을 수 없음`);
            }
        });
        
        console.log('🔍 DOM 요소 디버깅 완료');
    }

    // 강제 드롭다운 바인딩
    forceDropdownBinding() {
        console.log('🔧 강제 드롭다운 바인딩 시도');
        
        // 전체 문서에서 드롭다운 요소 검색
        const allDropdownTriggers = document.querySelectorAll('[id*="userDropdown"], [class*="user-dropdown"], [class*="dropdown-trigger"]');
        console.log('📍 발견된 드롭다운 관련 요소들:', allDropdownTriggers);
        
        allDropdownTriggers.forEach((element, index) => {
            console.log(`🎯 요소 ${index}:`, element.id, element.className);
            
            // 기존 이벤트 리스너 제거 후 새로 추가
            element.removeEventListener('click', this.handleDropdownClick);
            element.addEventListener('click', this.handleDropdownClick.bind(this));
            
            // 인라인 onclick 속성도 추가
            element.setAttribute('onclick', 'window.headerInstance?.toggleDropdown()');
        });
        
        // MutationObserver로 동적 요소 감지
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const addedNodes = Array.from(mutation.addedNodes);
                    addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.id === 'userDropdownTrigger') {
                            console.log('🔄 드롭다운 트리거 동적 추가 감지');
                            this.bindDropdownEvents(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // 드롭다운 클릭 핸들러
    handleDropdownClick(e) {
        console.log('🎯 강제 바인딩 드롭다운 클릭 감지!');
        e.preventDefault();
        e.stopPropagation();
        if (window.headerInstance) {
            window.headerInstance.toggleDropdown();
        }
    }

    // 개별 드롭다운 요소 바인딩
    bindDropdownEvents(element) {
        if (!element) return;
        
        console.log('🔗 개별 드롭다운 바인딩:', element);
        
        element.addEventListener('click', (e) => {
            console.log('🖱️ 개별 바인딩 클릭!');
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown();
        });
        
        element.style.cursor = 'pointer';
        element.style.userSelect = 'none';
    }

    // 드롭다운 토글
    toggleDropdown() {
        const dropdownMenu = document.getElementById('userDropdownMenu');
        const dropdownArrow = document.querySelector('.dropdown-arrow');
        
        if (dropdownMenu) {
            const isVisible = dropdownMenu.style.display !== 'none' && dropdownMenu.style.display !== '';
            
            if (isVisible) {
                dropdownMenu.style.display = 'none';
                if (dropdownArrow) dropdownArrow.textContent = '▼';
                console.log('🔽 드롭다운 닫힘');
            } else {
                dropdownMenu.style.display = 'block';
                if (dropdownArrow) dropdownArrow.textContent = '▲';
                console.log('🔼 드롭다운 열림');
            }
        } else {
            console.error('❌ 드롭다운 메뉴를 찾을 수 없음');
        }
    }

    // 드롭다운 닫기
    closeDropdown() {
        const dropdownMenu = document.getElementById('userDropdownMenu');
        const dropdownArrow = document.querySelector('.dropdown-arrow');
        
        if (dropdownMenu) {
            dropdownMenu.style.display = 'none';
        }
        
        if (dropdownArrow) {
            dropdownArrow.textContent = '▼';
        }
    }

    // 편집 모드 토글
    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        const editModeStatus = document.getElementById('editModeStatus');

        if (this.isEditMode) {
            document.body.classList.add('edit-mode');
            if (editModeStatus) editModeStatus.textContent = 'ON';
            
            // 전역 편집 모드 함수 호출 (기존 script.js의 함수)
            if (window.enableEditMode) {
                window.enableEditMode();
            }
        } else {
            document.body.classList.remove('edit-mode');
            if (editModeStatus) editModeStatus.textContent = 'OFF';
            
            // 전역 편집 모드 함수 호출 (기존 script.js의 함수)
            if (window.disableEditMode) {
                window.disableEditMode();
            }
        }

        console.log('편집 모드:', this.isEditMode ? '활성화' : '비활성화');
    }

    // 구글 로그인
    async handleGoogleLogin() {
        const googleLoginBtn = document.getElementById('googleLoginBtn');
        this.setButtonLoading(googleLoginBtn, true);

        // 명시적 로그인 플래그 설정
        window.isExplicitLogin = true;

        try {
            // Firebase가 사용 불가능한 경우 즉시 로컬 모드로 전환
            if (!window.authService || !window.authService.isInitialized) {
                console.log('🔄 Header: Firebase 사용 불가 - 로컬 모드로 즉시 전환');
                this.showStatus('Firebase 연결 불가 - 로컬 모드로 전환됩니다', 'warning');
                
                setTimeout(() => {
                    if (window.enableLocalMode) {
                        window.enableLocalMode();
                        this.showStatus('로컬 모드가 활성화되었습니다', 'success');
                    }
                }, 1000);
                return;
            }
            
            // 전역 인증 서비스 사용
            if (window.authService && window.authService.signInWithGoogle) {
                const result = await window.authService.signInWithGoogle();
                if (result.success) {
                    this.updateAuthUI(result.user);
                    this.showStatus('로그인 성공!', 'success');
                } else {
                    // Firebase 오류 시 로컬 모드로 자동 전환
                    console.log('🔄 Header: 구글 로그인 실패로 인한 로컬 모드 자동 전환');
                    this.showStatus('구글 로그인 실패 - 로컬 모드로 전환됩니다', 'warning');
                    
                    setTimeout(() => {
                        if (window.enableLocalMode) {
                            window.enableLocalMode();
                            this.showStatus('로컬 모드가 활성화되었습니다', 'success');
                        }
                    }, 1000);
                }
            } else {
                // 로컬 모드로 즉시 전환
                console.log('🔄 Header: 인증 서비스 없음 - 로컬 모드로 전환');
                this.showStatus('로컬 모드로 전환됩니다', 'warning');
                
                setTimeout(() => {
                    if (window.enableLocalMode) {
                        window.enableLocalMode();
                        this.showStatus('로컬 모드가 활성화되었습니다', 'success');
                    }
                }, 1000);
            }
        } catch (error) {
            console.error('구글 로그인 오류:', error);
            this.showStatus('로그인 중 오류가 발생했습니다.', 'error');
        } finally {
            this.setButtonLoading(googleLoginBtn, false);
        }
    }

    // 게스트 로그인
    async handleGuestLogin() {
        const guestLoginBtn = document.getElementById('guestLoginBtn');
        this.setButtonLoading(guestLoginBtn, true);

        // 명시적 로그인 플래그 설정
        window.isExplicitLogin = true;

        try {
            // Firebase가 사용 불가능한 경우 즉시 로컬 모드로 전환
            if (!window.authService || !window.authService.isInitialized) {
                console.log('🔄 Header: Firebase 사용 불가 - 로컬 게스트 모드로 즉시 전환');
                this.showStatus('Firebase 연결 불가 - 로컬 모드로 전환됩니다', 'warning');
                
                setTimeout(() => {
                    if (window.enableLocalMode) {
                        window.enableLocalMode();
                        this.showStatus('로컬 게스트 모드가 활성화되었습니다', 'success');
                    }
                }, 1000);
                return;
            }
            
            if (window.authService && window.authService.signInAnonymously) {
                const result = await window.authService.signInAnonymously();
                if (result.success) {
                    this.updateAuthUI(result.user);
                    this.showStatus('게스트로 로그인했습니다.', 'success');
                } else {
                    // Firebase 오류 시 로컬 모드로 자동 전환
                    console.log('🔄 Header: 게스트 로그인 실패로 인한 로컬 모드 자동 전환');
                    this.showStatus('게스트 로그인 실패 - 로컬 모드로 전환됩니다', 'warning');
                    
                    setTimeout(() => {
                        if (window.enableLocalMode) {
                            window.enableLocalMode();
                            this.showStatus('로컬 게스트 모드가 활성화되었습니다', 'success');
                        }
                    }, 1000);
                }
            } else {
                // 로컬 게스트 모드
                const guestUser = {
                    displayName: '게스트 사용자',
                    email: null,
                    photoURL: null,
                    isAnonymous: true
                };
                this.updateAuthUI(guestUser);
                this.showStatus('게스트 모드로 접속했습니다.', 'success');
            }
        } catch (error) {
            console.error('게스트 로그인 오류:', error);
            this.showStatus('게스트 로그인 중 오류가 발생했습니다.', 'error');
        } finally {
            this.setButtonLoading(guestLoginBtn, false);
        }
    }

    // 로그아웃
    async handleLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        this.setButtonLoading(logoutBtn, true);

        try {
            if (window.authService && window.authService.signOut) {
                const result = await window.authService.signOut();
                if (result.success) {
                    await this.performLogout();
                } else {
                    this.showStatus('로그아웃 실패: ' + result.error, 'error');
                }
            } else {
                // 로컬 로그아웃
                await this.performLogout();
            }
        } catch (error) {
            console.error('로그아웃 오류:', error);
            this.showStatus('로그아웃 중 오류가 발생했습니다.', 'error');
        } finally {
            this.setButtonLoading(logoutBtn, false);
        }
    }

    // 로그아웃 수행
    async performLogout() {
        console.log('🚪 로그아웃 수행 시작');
        
        try {
            // 편집 모드 비활성화
            if (this.isEditMode) {
                console.log('📝 편집 모드 비활성화');
                this.toggleEditMode();
            }
            
            // 드롭다운 닫기
            console.log('🔽 드롭다운 메뉴 닫기');
            this.closeDropdown();
            
            // 명시적 로그인 플래그 초기화
            window.isExplicitLogin = false;
            console.log('🔄 명시적 로그인 플래그 초기화');
            
            // 사용자 정보 초기화
            console.log('👤 사용자 정보 초기화');
            this.updateAuthUI(null);
            
            // 페이지 상태 강제 초기화
            setTimeout(() => {
                // 메인 화면(랜딩 페이지)으로 이동
                if (typeof showLanding === 'function') {
                    console.log('🏠 showLanding() 함수 호출');
                    showLanding();
                } else if (window.showLanding) {
                    console.log('🏠 window.showLanding() 호출');
                    window.showLanding();
                } else {
                    console.warn('showLanding 함수를 찾을 수 없음 - 페이지 새로고침으로 강제 초기화');
                    window.location.reload();
                }
            }, 100);
            
            this.showStatus('로그아웃되었습니다.', 'success');
            console.log('✅ 로그아웃 완료');
            
        } catch (error) {
            console.error('로그아웃 수행 중 오류:', error);
            // 오류가 발생해도 강제로 페이지를 초기화
            console.log('⚠️ 오류 발생으로 인한 강제 페이지 새로고침');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    // 전체화면 토글
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('전체화면 모드 진입 실패:', err);
                this.showStatus('전체화면 모드를 지원하지 않습니다.', 'error');
            });
        } else {
            document.exitFullscreen().catch(err => {
                console.log('전체화면 모드 종료 실패:', err);
            });
        }
    }

    // 도움말 토글
    toggleHelp() {
        const keyboardHelp = document.getElementById('keyboardHelp');
        if (keyboardHelp) {
            keyboardHelp.classList.toggle('show');
        } else if (window.toggleKeyboardHelp) {
            window.toggleKeyboardHelp();
        }
    }

    // 인증 UI 업데이트
    updateAuthUI(user) {
        const authLogin = document.getElementById('authLogin');
        const authProfile = document.getElementById('authProfile');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const dropdownAvatar = document.getElementById('dropdownAvatar');
        const dropdownUserName = document.getElementById('dropdownUserName');
        const dropdownUserEmail = document.getElementById('dropdownUserEmail');

        if (user) {
            console.log('Header: 로그인 상태 - UI 업데이트만 수행');
            
            // 자동 프레젠테이션 이동 제거 - 명시적 로그인만 허용
            
            if (authLogin) {
                authLogin.style.display = 'none';
                console.log('Header: authLogin 숨김');
            }
            if (authProfile) {
                authProfile.style.display = 'flex';
                console.log('Header: authProfile 표시');
            }

            // 사용자 역할 확인
            const role = this.getUserRole(user);
            const roleEmoji = role === 'instructor' ? '👨‍🏫' : role === 'student' ? '👨‍🎓' : '👤';
            const roleName = role === 'instructor' ? '강사' : role === 'student' ? '학생' : '게스트';
            const displayName = user.displayName || roleName;

            // 트리거 버튼 사용자 정보 (간단히 표시)
            if (userName) {
                userName.textContent = displayName;
            }

            // 아바타 설정
            const avatarSrc = (user.photoURL && !user.isAnonymous) ? user.photoURL : this.getDefaultAvatar();
            if (userAvatar) {
                userAvatar.src = avatarSrc;
            }

            // 드롭다운 내부 사용자 정보 (상세히 표시)
            if (dropdownAvatar) {
                dropdownAvatar.src = avatarSrc;
            }
            if (dropdownUserName) {
                dropdownUserName.textContent = `${roleEmoji} ${displayName}`;
            }
            if (dropdownUserEmail) {
                dropdownUserEmail.textContent = user.email || (user.isAnonymous ? '게스트 사용자' : '이메일 없음');
            }

            // 편집 모드 권한 업데이트
            this.updateEditModeAccess(user);
            
            this.currentUser = user;
        } else {
            // 로그아웃 상태
            if (authLogin) authLogin.style.display = 'flex';
            if (authProfile) authProfile.style.display = 'none';
            
            // 드롭다운 닫기
            this.closeDropdown();
            
            this.currentUser = null;
        }
    }

    // 편집 모드 접근 권한 업데이트
    updateEditModeAccess(user) {
        const editModeToggle = document.getElementById('editModeToggle');
        if (!editModeToggle) return;

        const userRole = this.getUserRole(user);

        if (userRole === 'instructor') {
            // 강사는 편집 가능
            editModeToggle.style.display = 'flex';
            editModeToggle.disabled = false;
        } else {
            // 학생과 게스트는 편집 불가능  
            editModeToggle.style.display = 'none';
            editModeToggle.disabled = true;
            
            // 편집 모드가 활성화되어 있다면 비활성화
            if (this.isEditMode) {
                this.toggleEditMode();
            }
        }
    }

    // 사용자 권한 확인
    getUserRole(user) {
        if (!user) return 'guest';

        // 강사 계정 목록
        const instructorEmails = [
            'meangyun0729@gmail.com'
        ];

        if (instructorEmails.includes(user.email)) {
            return 'instructor';
        }

        return user.isAnonymous ? 'guest' : 'student';
    }

    // 페이지 정보 업데이트
    updatePageInfo(currentPage, totalPages, chapterInfo) {
        const currentPageEl = document.querySelector('.header-center .current-page');
        const totalPagesEl = document.querySelector('.header-center .total-pages');
        const chapterInfoEl = document.querySelector('.header-center .chapter-info');
        const progressFill = document.getElementById('progressFill');

        if (currentPageEl) currentPageEl.textContent = currentPage;
        if (totalPagesEl) totalPagesEl.textContent = totalPages;
        if (chapterInfoEl) chapterInfoEl.textContent = chapterInfo;
        
        if (progressFill) {
            const progress = (currentPage / totalPages) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        // 썸네일 업데이트
        this.updateThumbnail(currentPage);
        
        // 페이지 네비게이션 버튼 상태 업데이트
        this.updatePageNavButtons(currentPage, totalPages);
    }
    
    // 썸네일 업데이트
    updateThumbnail(currentPage) {
        const thumbnailContent = document.getElementById('thumbnailContent');
        if (!thumbnailContent) return;
        
        // 현재 슬라이드의 내용을 가져와서 썸네일 생성
        const currentSlide = document.querySelector('.slide.active');
        if (currentSlide) {
            // 슬라이드의 제목이나 주요 내용을 추출
            const slideTitle = currentSlide.querySelector('h1, h2, h3, .slide-title')?.textContent || `슬라이드 ${currentPage}`;
            const slideContent = currentSlide.querySelector('p, .content, .slide-content')?.textContent || '';
            
            thumbnailContent.innerHTML = `
                <div class="thumbnail-title">${slideTitle.substring(0, 20)}${slideTitle.length > 20 ? '...' : ''}</div>
                <div class="thumbnail-text">${slideContent.substring(0, 40)}${slideContent.length > 40 ? '...' : ''}</div>
            `;
        } else {
            thumbnailContent.innerHTML = `
                <div class="thumbnail-placeholder">📄</div>
                <div class="thumbnail-title">슬라이드 ${currentPage}</div>
            `;
        }
    }
    
    // 페이지 네비게이션 버튼 상태 업데이트
    updatePageNavButtons(currentPage, totalPages) {
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (prevBtn) {
            prevBtn.disabled = currentPage <= 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage >= totalPages;
        }
    }

    // 버튼 로딩 상태 설정
    setButtonLoading(button, isLoading) {
        if (!button) return;

        if (isLoading) {
            button.disabled = true;
            button.classList.add('loading');
        } else {
            button.disabled = false;
            button.classList.remove('loading');
        }
    }

    // 상태 메시지 표시
    showStatus(message, type = 'info') {
        // 전역 상태 표시 함수 사용
        if (window.showSaveStatus) {
            window.showSaveStatus(message, type === 'success' ? 'saved' : 'error');
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    // 페이지 입력 표시
    showPageInput() {
        const pageInfo = document.querySelector('.page-info');
        const pageInputContainer = document.getElementById('pageInputContainer');
        const pageInput = document.getElementById('pageInput');
        
        if (pageInfo && pageInputContainer && pageInput) {
            pageInfo.style.display = 'none';
            pageInputContainer.style.display = 'flex';
            
            // 현재 페이지를 기본값으로 설정
            if (window.currentPage) {
                pageInput.value = window.currentPage;
            }
            
            // 포커스 및 선택
            setTimeout(() => {
                pageInput.focus();
                pageInput.select();
            }, 100);
        }
    }
    
    // 페이지 입력 숨기기
    hidePageInput() {
        const pageInfo = document.querySelector('.page-info');
        const pageInputContainer = document.getElementById('pageInputContainer');
        
        if (pageInfo && pageInputContainer) {
            pageInfo.style.display = 'flex';
            pageInputContainer.style.display = 'none';
        }
    }
    
    // 입력된 페이지로 이동
    goToInputPage() {
        const pageInput = document.getElementById('pageInput');
        if (!pageInput) return;
        
        const pageNumber = parseInt(pageInput.value);
        const totalPages = window.totalPages || 80;
        
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            if (typeof goToPage === 'function') {
                goToPage(pageNumber);
            }
            this.hidePageInput();
        } else {
            this.showStatus(`페이지 번호는 1부터 ${totalPages} 사이여야 합니다.`, 'error');
            pageInput.focus();
            pageInput.select();
        }
    }

    // 기본 아바타 반환
    getDefaultAvatar() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2Yzc1N2QiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTRDOC42ODYyOSAxNCA2IDE2LjY4NjMgNiAyMFYyMkgxOFYyMEMxOCAxNi42ODYzIDE1LjMxMzcgMTQgMTIgMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';
    }
}

// Header 인스턴스를 전역으로 노출
window.Header = Header;
window.headerInstance = null;

// DOM 로드 후 Header 초기화
document.addEventListener('DOMContentLoaded', () => {
    // Header 컨테이너가 있을 때만 초기화
    const headerContainer = document.getElementById('headerContainer');
    if (headerContainer && !window.headerInstance) {
        window.headerInstance = new Header();
    }
});
