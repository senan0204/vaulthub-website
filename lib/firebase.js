import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { 
  apiKey: "AIzaSyAr7IO6ejRo65VksaRT2acXLpfoPnFw3VY", 
  authDomain: "vaulthub-631a3.firebaseapp.com", 
  projectId: "vaulthub-631a3", 
  storageBucket: "vaulthub-631a3.firebasestorage.app", 
  messagingSenderId: "416009270034", 
  appId: "1:416009270034:web:d2092466f0b22a3935f9cb" 
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
