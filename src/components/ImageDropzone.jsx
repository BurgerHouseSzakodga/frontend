import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import imageIcon from "/assets/image.svg";
import dropIcon from "/assets/drop.svg";

const ImageDropzone = ({ onDropImage, reset }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      onDropImage(file);
      setPreview(URL.createObjectURL(file));
    },
    [onDropImage]
  );

  useEffect(() => {
    if (reset) {
      setPreview(null);
    }
  }, [reset]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="dropzone-container">
      <div className="image-preview">
        <img src={preview ? preview : imageIcon} alt="Hibás formátum" />
      </div>
      <div {...getRootProps()} className="image-dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <img className="drop-icon" src={dropIcon} />
            <p>Húzd a képet ide ...</p>
          </>
        ) : (
          <>
            <p>
              Húzd be a feltölteni kívánt képeket, vagy kattints és válaszd ki
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageDropzone;
