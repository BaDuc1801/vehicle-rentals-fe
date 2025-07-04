import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4zfS70WrC32Tvf4_BDGCVE6CgS_ge7a4",
  authDomain: "rentalvehicle-b9f70.firebaseapp.com",
  projectId: "rentalvehicle-b9f70",
  storageBucket: "rentalvehicle-b9f70.firebasestorage.app",
  messagingSenderId: "81609568190",
  appId: "1:81609568190:web:fe1a955a7968135f6a53ef",
  measurementId: "G-F2ZYJE0E01"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
