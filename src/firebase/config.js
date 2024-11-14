// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWsGYDRl3kI_BX8d-rP6RrAcDHG5PdPeY",
  authDomain: "gallery-4ae4d.firebaseapp.com",
  projectId: "gallery-4ae4d",
  storageBucket: "gallery-4ae4d.appspot.com",
  messagingSenderId: "989647123922",
  appId: "1:989647123922:web:ac06c701761d47527a840b",
  measurementId: "G-JCMYY8SVK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

// Export services and functions
export { projectStorage, projectFirestore };


