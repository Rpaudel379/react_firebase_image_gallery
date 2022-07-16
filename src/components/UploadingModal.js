import React from "react";

const UploadingModal = ({ uploading, progress }) => {
  return (
    <div className="space-y-5 p-5 sm:p-20">
      {uploading && (
        <>
          <div className="flex space-x-8 items-center">
            <p className="text-3xl font-medium">uploading</p>
            <div className="h-10 w-10 rounded-full border-4 border-slate-400 animate-ping"></div>
          </div>
          <p className="text-3xl">{Math.round(progress)}%</p>
        </>
      )}
    </div>
  );
};

export default UploadingModal;
