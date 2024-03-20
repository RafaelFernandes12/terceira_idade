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

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();