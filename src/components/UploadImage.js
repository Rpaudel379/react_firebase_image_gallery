import React from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";

const UploadImage = ({ openModal, type, file, setFile }) => {
  const handleChange = (e) => {
    const selected = e.target.files[0];

    if (selected && selected.type.includes("image")) {
      setFile({ file: selected, error: "" });
      openModal();
      type();
    } else {
      setFile({ ...file, error: "please select image file" });
    }
  };

  return (
    <div>
      <div className="text-center w-full space-y-5">
        <div title="upload image">
          <label htmlFor="upload">
            <PlusCircleIcon className="w-10 mx-auto cursor-pointer hover:text-slate-400 hover:fill-slate-600" />
          </label>
          <input
            type="file"
            className="hidden"
            id="upload"
            onChange={handleChange}
          />
        </div>

        <div className="mt-10 text-red-400">
          {file.error && <p>{file.error}</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
