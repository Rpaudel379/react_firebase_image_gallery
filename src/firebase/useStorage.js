import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";

import { storage, db } from "./firebase";

const useStorage = (file) => {
  const [success, setSuccess] = useState();

  useEffect(() => {
    const storageRef = ref(
      storage,
      `images/${new Date().getTime()}_${file.filename}`
    );

    const collectionRef = collection(db, "images");

    const uploadImage = uploadBytesResumable(storageRef, file.file);

    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error, "fb error");
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then(async (downloadUrl) => {
          await addDoc(collectionRef, { url: downloadUrl });
          console.log(downloadUrl);
          setSuccess(true);
        });
      }
    );
  }, [file]);

  return { success };
};

export default useStorage;
