import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDprNsEx-jElrjD3IfZ5satdzPkEzHUYOc",
  authDomain: "al-meme-41597.firebaseapp.com",
  projectId: "al-meme-41597",
  storageBucket: "al-meme-41597.appspot.com",
  messagingSenderId: "889862705453",
  appId: "1:889862705453:web:7ab6d162b59e093fed43a4",
  measurementId: "G-3TKV6HX762"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app };