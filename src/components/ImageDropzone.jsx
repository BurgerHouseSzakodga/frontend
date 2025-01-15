import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageDropzone = ({ onDropImage }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      onDropImage(file);
      setPreview(URL.createObjectURL(file));
    },
    [onDropImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div {...getRootProps()} className="image-dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Húzd a képeket ide ...</p>
      ) : preview ? (
        <div className="image-preview">
          <img src={preview} alt="Hibás formátum" />
        </div>
      ) : (
        <p>
          Húzd be a feltölteni kívánt képeket, vagy kattints és válaszd ki őket
        </p>
      )}
    </div>
  );
};

export default ImageDropzone;
