import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmRV1UtOodq3h2wU6qYCKgdmugspO-VkU",
  authDomain: "terceiraidade-fb754.firebaseapp.com",
  projectId: "terceiraidade-fb754",
  storageBucket: "terceiraidade-fb754.appspot.com",
  messagingSenderId: "738511571131",
  appId: "1:738511571131:web:ad82744dca8b668a39019e",
  measurementId: "G-SWY37YLC75"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDeNJHmuyljk0oHcghLF1ilzMRvqa30X4Y",
//   authDomain: "teste-87048.firebaseapp.com",
//   projectId: "teste-87048",
//   storageBucket: "teste-87048.appspot.com",
//   messagingSenderId: "928766414770",
//   appId: "1:928766414770:web:f42c553bd8a662b8fc5eab",
//   measurementId: "G-ENZ0KGWQEV"
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();