import { useState } from "react";
import Images from "./components/Images";
import UploadImage from "./components/UploadImage";
import Modal from "./Modal";

/* firebase */
import { storage, db } from "./firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

function App() {
  const [openModal, setOpenModal] = useState(false);

  const [modalType, setModalType] = useState();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState();

  const [file, setFile] = useState({
    file: null,
    error: "",
  });

  const uploadImage = () => {
    setUploading(true);
    setModalType("uploading");
    setOpenModal(true);

    const storageRef = ref(
      storage,
      `images/${new Date().getTime()}_${file.file.name}`
    );

    const collectionRef = collection(db, "images/");
    const uploadImage = uploadBytesResumable(storageRef, file.file);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error, "firebase error");
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then(async (downloadUrl) => {
          await addDoc(collectionRef, { url: downloadUrl });
          setUploading(false);
        });
      }
    );
  };

  return (
    <div className="container mx-auto lg:px-10 my-10 ">
      <Modal
        open={openModal}
        close={() => setOpenModal(false)}
        type={modalType}
        filename={file.file && file.file.name}
        uploadImage={() => uploadImage()}
        uploading={uploading}
        progress={progress}
      />

      <UploadImage
        openModal={() => setOpenModal(true)}
        type={() => setModalType("upload")}
        file={file}
        setFile={setFile}
      />

      <Images />
    </div>
  );
}

export default App;
