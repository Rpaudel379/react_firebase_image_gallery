import React, { useEffect, useState } from "react";

// firebase
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Images = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "images"), (snapshot) => {
      let imgs = [];
      snapshot.forEach((doc) => {
        imgs.push({ ...doc.data(), id: doc.id });
      });
      setLoading(false);
      setImages(imgs);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-5xl uppercase my-16">Image Gallary</h1>

      {loading ? (
        <div className="mx-auto h-10 w-10 rounded-full border-4 border-slate-400 animate-ping"></div>
      ) : (
        <>
          {!images.length ? (
            <div className="text-center">No Images</div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto">
              {images.map((image) => (
                <div key={image.id} className="h-[80%] md:h-[400px]">
                  <img
                    src={image.url}
                    alt={image.id}
                    className="w-full h-[500px] md:h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Images;
