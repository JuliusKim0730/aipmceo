// 인증 서비스
import { 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    signInAnonymously 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

let auth, googleProvider;

// Firebase 설정 동적 로드
async function loadFirebaseConfig() {
    try {
        const firebaseConfig = await import('./firebase-config.js');
        auth = firebaseConfig.auth;
        googleProvider = firebaseConfig.googleProvider;
        return true;
    } catch (error) {
        console.error('Firebase 설정 로드 실패:', error);
        return false;
    }
}

class AuthService {
    constructor() {
        this.currentUser = null;
        this.authStateCallbacks = [];
        this.isInitialized = false;
        this.initializeService();
    }

    // 서비스 초기화
    async initializeService() {
        try {
            const configLoaded = await loadFirebaseConfig();
            if (!configLoaded || !auth) {
                throw new Error('Firebase 설정을 로드할 수 없습니다.');
            }
            
            this.initializeAuthListener();
            this.isInitialized = true;
            console.log('AuthService 초기화 완료');
        } catch (error) {
            console.error('AuthService 초기화 실패:', error);
            this.isInitialized = false;
        }
    }

    // 인증 상태 리스너 초기화
    initializeAuthListener() {
        if (!auth) {
            console.error('Auth 객체가 없습니다.');
            return;
        }
        
        onAuthStateChanged(auth, (user) => {
            this.currentUser = user;
            console.log('인증 상태 변경:', user ? `로그인됨 (${user.email})` : '로그아웃됨');
            
            // 모든 콜백 함수 호출
            this.authStateCallbacks.forEach(callback => {
                try {
                    callback(user);
                } catch (error) {
                    console.error('인증 상태 콜백 오류:', error);
                }
            });
        });
    }

    // 인증 상태 변경 콜백 등록
    onAuthStateChange(callback) {
        this.authStateCallbacks.push(callback);
        
        // 현재 사용자 정보가 있으면 즉시 콜백 호출
        if (this.currentUser !== null) {
            callback(this.currentUser);
        }
    }

    // 구글 로그인
    async signInWithGoogle() {
        if (!this.isInitialized || !auth || !googleProvider) {
            return {
                success: false,
                error: 'Firebase 인증이 초기화되지 않았습니다.'
            };
        }
        
        try {
            console.log('구글 로그인 시도 중...');
            
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            console.log('구글 로그인 성공:', {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            });
            
            return {
                success: true,
                user: {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }
            };
        } catch (error) {
            console.error('구글 로그인 오류:', error);
            
            let errorMessage = '로그인 중 오류가 발생했습니다.';
            
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = '로그인 창이 닫혔습니다.';
                    break;
                case 'auth/popup-blocked':
                    errorMessage = '팝업이 차단되었습니다. 팝업을 허용해주세요.';
                    break;
                case 'auth/cancelled-popup-request':
                    errorMessage = '로그인이 취소되었습니다.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = '네트워크 연결을 확인해주세요.';
                    break;
                default:
                    errorMessage = error.message || '알 수 없는 오류가 발생했습니다.';
            }
            
            return {
                success: false,
                error: errorMessage
            };
        }
    }

    // 익명 로그인 (게스트 모드)
    async signInAnonymously() {
        if (!this.isInitialized || !auth) {
            return {
                success: false,
                error: 'Firebase 인증이 초기화되지 않았습니다.'
            };
        }
        
        try {
            console.log('익명 로그인 시도 중...');
            
            const result = await signInAnonymously(auth);
            const user = result.user;
            
            console.log('익명 로그인 성공:', user.uid);
            
            return {
                success: true,
                user: {
                    uid: user.uid,
                    email: null,
                    displayName: '게스트',
                    photoURL: null,
                    isAnonymous: true
                }
            };
        } catch (error) {
            console.error('익명 로그인 오류:', error);
            return {
                success: false,
                error: '게스트 로그인 중 오류가 발생했습니다.'
            };
        }
    }

    // 로그아웃
    async signOut() {
        if (!this.isInitialized || !auth) {
            return {
                success: false,
                error: 'Firebase 인증이 초기화되지 않았습니다.'
            };
        }
        
        try {
            console.log('로그아웃 시도 중...');
            
            await signOut(auth);
            
            console.log('로그아웃 성공');
            
            return {
                success: true
            };
        } catch (error) {
            console.error('로그아웃 오류:', error);
            return {
                success: false,
                error: '로그아웃 중 오류가 발생했습니다.'
            };
        }
    }

    // 현재 사용자 정보 가져오기
    getCurrentUser() {
        return this.currentUser;
    }

    // 로그인 상태 확인
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // 익명 사용자인지 확인
    isAnonymous() {
        return this.currentUser && this.currentUser.isAnonymous;
    }

    // 사용자 정보 포맷팅
    getUserInfo() {
        if (!this.currentUser) {
            return null;
        }

        return {
            uid: this.currentUser.uid,
            email: this.currentUser.email,
            displayName: this.currentUser.displayName || '사용자',
            photoURL: this.currentUser.photoURL,
            isAnonymous: this.currentUser.isAnonymous || false
        };
    }
}

// 싱글톤 인스턴스 생성
export const authService = new AuthService();
export default authService;
