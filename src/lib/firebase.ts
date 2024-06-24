// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, 
  authDomain: "blog-1bf58.firebaseapp.com",
  projectId: "blog-1bf58",
  storageBucket: "blog-1bf58.appspot.com",
  messagingSenderId: "733816416136",
  appId: "1:733816416136:web:f5fd85d40e1b7951747c3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Storage = getStorage(app);
export default Storage