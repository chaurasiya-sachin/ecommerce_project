// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5SRZNiS5239GscMCFZiYQjoH8RJsq6ss",
  authDomain: "myecommerce-b5b7a.firebaseapp.com",
  projectId: "myecommerce-b5b7a",
  storageBucket: "myecommerce-b5b7a.firebasestorage.app",
  messagingSenderId: "901947774945",
  appId: "1:901947774945:web:7f93f8eb3c1ebcf4cbe4a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);
const auth = getAuth(app)
export {fireDb,auth } ;
