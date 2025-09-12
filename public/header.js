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
        this.bindEvents();
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
                        <!-- 페이지 정보 -->
                        <div class="page-info">
                            <span class="current-page">1</span>
                            <span class="page-separator">/</span>
                            <span class="total-pages">80</span>
                            <div class="chapter-info">Chapter 1</div>
                        </div>
                    </div>

                    <!-- 우측 컨트롤들 -->
                    <div class="header-right">
                        <!-- 편집 모드 토글 -->
                        <button class="edit-mode-btn" id="editModeBtn" title="편집 모드 토글">
                            <span class="edit-icon">📝</span>
                            <span class="edit-text">편집 모드</span>
                        </button>

                        <!-- 사용자 정보 / 로그인 -->
                        <div class="auth-section" id="authSection">
                            <!-- 로그인 전 -->
                            <div class="auth-login" id="authLogin">
                                <button class="auth-btn google-login" id="googleLoginBtn">
                                    <svg class="google-icon" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Google 로그인
                                </button>
                                <button class="auth-btn guest-login" id="guestLoginBtn">
                                    <span class="guest-icon">👤</span>
                                    게스트 모드
                                </button>
                            </div>

                            <!-- 로그인 후 -->
                            <div class="auth-profile" id="authProfile" style="display: none;">
                                <div class="user-info">
                                    <img class="user-avatar" id="userAvatar" src="" alt="프로필">
                                    <div class="user-details">
                                        <span class="user-name" id="userName">사용자</span>
                                        <span class="user-email" id="userEmail">user@example.com</span>
                                    </div>
                                </div>
                                <div class="user-actions">
                                    <button class="action-btn logout-btn" id="logoutBtn" title="로그아웃">
                                        <span class="logout-icon">🚪</span>
                                        로그아웃
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- 추가 컨트롤들 -->
                        <div class="header-controls">
                            <button class="control-btn fullscreen-btn" id="fullscreenBtn" title="전체화면 (F)">
                                <span class="fullscreen-icon">⛶</span>
                            </button>
                            <button class="control-btn help-btn" id="helpBtn" title="키보드 단축키 (H)">
                                <span class="help-icon">❓</span>
                            </button>
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

        // 컨트롤 버튼들
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const helpBtn = document.getElementById('helpBtn');

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
        
        if (helpBtn) {
            helpBtn.addEventListener('click', () => this.toggleHelp());
        }
    }

    // 편집 모드 토글
    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        const editModeBtn = document.getElementById('editModeBtn');
        const editIcon = editModeBtn?.querySelector('.edit-icon');
        const editText = editModeBtn?.querySelector('.edit-text');

        if (this.isEditMode) {
            editModeBtn?.classList.add('active');
            if (editIcon) editIcon.textContent = '🔒';
            if (editText) editText.textContent = '편집 완료';
            document.body.classList.add('edit-mode');
            
            // 전역 편집 모드 함수 호출 (기존 script.js의 함수)
            if (window.enableEditMode) {
                window.enableEditMode();
            }
        } else {
            editModeBtn?.classList.remove('active');
            if (editIcon) editIcon.textContent = '📝';
            if (editText) editText.textContent = '편집 모드';
            document.body.classList.remove('edit-mode');
            
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

        try {
            // 전역 인증 서비스 사용
            if (window.authService && window.authService.signInWithGoogle) {
                const result = await window.authService.signInWithGoogle();
                if (result.success) {
                    this.updateAuthUI(result.user);
                    this.showStatus('로그인 성공!', 'success');
                } else {
                    this.showStatus('로그인 실패: ' + result.error, 'error');
                }
            } else {
                this.showStatus('인증 서비스가 사용할 수 없습니다.', 'error');
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

        try {
            if (window.authService && window.authService.signInAnonymously) {
                const result = await window.authService.signInAnonymously();
                if (result.success) {
                    this.updateAuthUI(result.user);
                    this.showStatus('게스트로 로그인했습니다.', 'success');
                } else {
                    this.showStatus('게스트 로그인 실패: ' + result.error, 'error');
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
                    this.updateAuthUI(null);
                    this.showStatus('로그아웃되었습니다.', 'success');
                    
                    // 편집 모드 비활성화
                    if (this.isEditMode) {
                        this.toggleEditMode();
                    }
                } else {
                    this.showStatus('로그아웃 실패: ' + result.error, 'error');
                }
            } else {
                // 로컬 로그아웃
                this.updateAuthUI(null);
                this.showStatus('로그아웃되었습니다.', 'success');
                
                if (this.isEditMode) {
                    this.toggleEditMode();
                }
            }
        } catch (error) {
            console.error('로그아웃 오류:', error);
            this.showStatus('로그아웃 중 오류가 발생했습니다.', 'error');
        } finally {
            this.setButtonLoading(logoutBtn, false);
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
        const userEmail = document.getElementById('userEmail');

        if (user) {
            // 로그인 상태
            if (authLogin) authLogin.style.display = 'none';
            if (authProfile) authProfile.style.display = 'flex';

            // 사용자 정보 표시
            if (userName) {
                const role = this.getUserRole(user);
                const roleEmoji = role === 'instructor' ? '👨‍🏫' : role === 'student' ? '👨‍🎓' : '👤';
                const roleName = role === 'instructor' ? '강사' : role === 'student' ? '학생' : '게스트';
                userName.textContent = `${roleEmoji} ${user.displayName || roleName}`;
            }

            if (userEmail) {
                userEmail.textContent = user.email || (user.isAnonymous ? '게스트 사용자' : '이메일 없음');
            }

            if (userAvatar) {
                if (user.photoURL && !user.isAnonymous) {
                    userAvatar.src = user.photoURL;
                } else {
                    userAvatar.src = this.getDefaultAvatar();
                }
            }

            // 편집 모드 권한 업데이트
            this.updateEditModeAccess(user);
            
            this.currentUser = user;
        } else {
            // 로그아웃 상태
            if (authLogin) authLogin.style.display = 'flex';
            if (authProfile) authProfile.style.display = 'none';
            
            this.currentUser = null;
            
            // 편집 모드 비활성화
            const editModeBtn = document.getElementById('editModeBtn');
            if (editModeBtn) {
                editModeBtn.style.display = 'none';
            }
        }
    }

    // 편집 모드 접근 권한 업데이트
    updateEditModeAccess(user) {
        const editModeBtn = document.getElementById('editModeBtn');
        if (!editModeBtn) return;

        const userRole = this.getUserRole(user);

        if (userRole === 'instructor') {
            // 강사는 편집 가능
            editModeBtn.style.display = 'flex';
            editModeBtn.disabled = false;
        } else {
            // 학생과 게스트는 편집 불가능  
            editModeBtn.style.display = 'none';
            editModeBtn.disabled = true;
            
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
