import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC52MLbphe9Iq5b7B7eP33W4KWhz3qEDqY",
  authDomain: "reel-maker-7ed1f.firebaseapp.com",
  databaseURL: "https://reel-maker-7ed1f.firebaseio.com/",
  projectId: "reel-maker-7ed1f",
  storageBucket: "reel-maker-7ed1f.appspot.com",
  messagingSenderId: "368974428901",
  appId: "1:368974428901:web:e6243a4e10b85c4907320c",
};
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
