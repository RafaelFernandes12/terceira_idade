import { db, storage } from "@/config/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

interface studentImageProps {
    id: string;
    name: string;
    img: any;
}

export async function editStudentImage({ id, name, img }: studentImageProps) {
  const valRef = doc(db, "students", id);

  const imgSnapshot = await uploadBytes(ref(storage, `${img === "generic" ? `studentImgs/${uniqid()}.generic` : `studentImgs/${uniqid()}`}`), img);
  const imgDownloadUrl = await getDownloadURL(imgSnapshot.ref);

  try {
    const updateData: any = {};
    updateData[name] = imgDownloadUrl;
    
    await updateDoc(valRef, updateData);
  } catch (e) {
    console.log(e);
  }
}
