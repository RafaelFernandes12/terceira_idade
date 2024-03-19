import { addDoc, collection } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/config/firestore";
import uniqid from "uniqid";

export async function createCourse(name: string, img: any){

  const imgs = ref(storage,`Imgs/${uniqid()}`);
  const valRef = collection(db,"courses");
  
  // Uploading the image to storage
  const uploadTaskSnapshot = await uploadBytes(imgs, img);

  // Getting download URL of the uploaded image
  const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

  // Adding document to Firestore with the download URL
  await addDoc(valRef, { name: name, imgUrl: downloadURL });
}
