// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTmVEGX6A0Kb2IxIm4DFrDvyE1MP4n4Rw",
  authDomain: "ecommerce-dragon-fish.firebaseapp.com",
  projectId: "ecommerce-dragon-fish",
  storageBucket: "ecommerce-dragon-fish.appspot.com",
  messagingSenderId: "705987834758",
  appId: "1:705987834758:web:f4ebda0c639070c850f207",
  measurementId: "G-YZFWV2PMSK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const getImageDownloadURL = (imgRef) =>
  getDownloadURL(ref(storage, imgRef)).then((url) => url);

export const imageRef = (path) => ref(storage, path);
