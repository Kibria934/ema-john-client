// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuLVxeBDr1tsp7mNbh_KAM-6mc_lktkF0",
  authDomain: "ema-john-9cb36.firebaseapp.com",
  projectId: "ema-john-9cb36",
  storageBucket: "ema-john-9cb36.appspot.com",
  messagingSenderId: "45524981791",
  appId: "1:45524981791:web:8bbbc2b38df35b8c861d2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;