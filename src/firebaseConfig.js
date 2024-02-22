import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAE2kurUKErLdflM-atAT8Z0PV84te3-sA",
  authDomain: "myfaves-80977.firebaseapp.com",
  projectId: "myfaves-80977",
  storageBucket: "myfaves-80977.appspot.com",
  messagingSenderId: "133706390603",
  appId: "1:133706390603:web:9b4b66ecb5a1f20423c1ce",
  measurementId: "G-L9L8WF5V8F",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
