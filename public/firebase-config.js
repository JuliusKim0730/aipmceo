// Firebase 설정
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

// Firebase 구성 정보 (사용자가 제공한 정보 기반)
const firebaseConfig = {
    apiKey: "AIzaSyDq8td1B5DbXph-dARqt8T01LhUz0tH18g",
    authDomain: "aipm-db23c.firebaseapp.com",
    projectId: "aipm-db23c",
    storageBucket: "aipm-db23c.firebasestorage.app",
    messagingSenderId: "930340461582",
    appId: "1:930340461582:web:b2490bcadcba8f3b43b05f",
    measurementId: "G-MN8R4XVQF5"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 초기화
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
