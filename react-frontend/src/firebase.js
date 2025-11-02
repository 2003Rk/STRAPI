// Firebase configuration for React frontend
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeR-vpBHlAnMBhsX2Aod4xej-z-GWj9kk",
  authDomain: "myhome-27a27.firebaseapp.com",
  projectId: "myhome-27a27",
  storageBucket: "myhome-27a27.firebasestorage.app",
  messagingSenderId: "236440153010",
  appId: "1:236440153010:web:8ccf42648e3428ff81d2ab",
  measurementId: "G-ZDVXP2VZDF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
