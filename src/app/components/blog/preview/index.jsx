"use client";

import React, { useRef } from "react";
import style from "./preview.module.scss";
import Image from "next/image";

export default function PreviewImage({ onImageSelect, imagePreview, uploadingImage, previewImage, handleImageSelect }) {

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onImageSelect) {
      onImageSelect(file);
    }
  };

  return (
    <div className={style.container}>
      {/* Hidden file input */}
      <input
        className={style.file}
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
       type="button"
        className={style.browseButton}
        onClick={handleButtonClick}
        disabled={uploadingImage}>
        {uploadingImage ? "Processing..." : "Upload"}
      </button>
      {(imagePreview || previewImage) && (
        <div className={style.previewContainer}>
          <Image
            src={imagePreview || previewImage}
            width={1000}
            height={100}
            alt="Featured Image"
            className={style.preview}
          />
        </div>
      )}
    </div>
  );
}

// // Ref:
// // https://stackoverflow.com/questions/1084925/input-type-file-show-only-button
// // https://www.youtube.com/watch?v=bTll3osO074
// // Used AI to combine both