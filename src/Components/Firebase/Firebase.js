import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoU_WVAeCoDR476CfpvsJFld6lxCz07nQ",
    authDomain: "gkd-mobile-auth.firebaseapp.com",
    projectId: "gkd-mobile-auth",
    storageBucket: "gkd-mobile-auth.appspot.com",
    messagingSenderId: "1019931962401",
    appId: "1:1019931962401:web:da5aabd85c596b02b50760"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export default app;