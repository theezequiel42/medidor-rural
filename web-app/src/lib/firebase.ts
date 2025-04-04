// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsxrIvhQ99zdmcEFgXfgsAWgbm6KpqQpY",
  authDomain: "medidor-rural.firebaseapp.com",
  projectId: "medidor-rural",
  storageBucket: "medidor-rural.firebasestorage.app",
  messagingSenderId: "491548138717",
  appId: "1:491548138717:web:472a42765c9bd5e90c4f34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)