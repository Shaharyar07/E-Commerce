// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuS2wx1Wh-Z9SPp6VzhJZ6W4zin91LyrI",
  authDomain: "shop-4e88e.firebaseapp.com",
  projectId: "shop-4e88e",
  storageBucket: "shop-4e88e.appspot.com",
  messagingSenderId: "529353241993",
  appId: "1:529353241993:web:d1309cf6b9be53f2ab1d58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };