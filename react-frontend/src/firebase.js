// Firebase configuration for React frontend
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpqNvMPWW-KFqw6b_DhQVAoQqvvxsTew0",
  authDomain: "strapi-9ab33.firebaseapp.com",
  projectId: "strapi-9ab33",
  storageBucket: "strapi-9ab33.firebasestorage.app",
  messagingSenderId: "742787678824",
  appId: "1:742787678824:web:608cf1b0ff68f6aaaaf1dd",
  measurementId: "G-3Y65BQ344V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
