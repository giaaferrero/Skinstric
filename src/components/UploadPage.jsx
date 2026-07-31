import { useRef, useState } from "react";
import {
  FiArrowLeft,
  FiCamera,
  FiUpload,
  FiArrowRight,
} from "react-icons/fi";

function UploadPage({ onBack, onAnalyze }) {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        return;
      }

      setImagePreview(result);
      setImageBase64(result);
    };

    reader.onerror = () => {
      alert("We could not read that image. Please try another one.");
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleAnalyzeClick = () => {
    if (!imageBase64) {
      return;
    }

    onAnalyze(imageBase64);
  };

  return (
    <>
      <header>
        <div className="header-left">
          <div>SKINSTRIC</div>
          <div>[ INTRO ]</div>
        </div>

        <button type="button">ENTER CODE</button>
      </header>

      <main className="upload-page">
        <div className="upload-heading">
          <p>TO START ANALYSIS</p>
          <h2>ADD AN IMAGE OF YOURSELF</h2>
        </div>

        {!imagePreview ? (
          <div className="upload-options">
            <button type="button" className="upload-option">
              <div className="upload-icon">
                <FiCamera size={32} strokeWidth={1.3} />
              </div>

              <span>
                ALLOW A.I.
                <br />
                TO SCAN YOUR FACE
              </span>
            </button>

            <button
              type="button"
              className="upload-option"
              onClick={handleGalleryClick}
            >
              <div className="upload-icon">
                <FiUpload size={32} strokeWidth={1.3} />
              </div>

              <span>
                ALLOW A.I.
                <br />
                ACCESS GALLERY
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </div>
        ) : (
          <div className="image-preview-section">
            <img
              className="image-preview"
              src={imagePreview}
              alt="Selected preview"
            />

            <button
              type="button"
              className="choose-another-button"
              onClick={handleGalleryClick}
            >
              CHOOSE ANOTHER IMAGE
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </div>
        )}

        <button className="form-back-button" type="button" onClick={onBack}>
          <div className="circle">
            <FiArrowLeft size={14} strokeWidth={1.5} />
          </div>

          <span>BACK</span>
        </button>

        {imagePreview && (
          <button
            className="single-question-next"
            type="button"
            onClick={handleAnalyzeClick}
          >
            <span>ANALYZE</span>

            <div className="circle">
              <FiArrowRight size={14} strokeWidth={1.5} />
            </div>
          </button>
        )}
      </main>
    </>
  );
}

export default UploadPage;