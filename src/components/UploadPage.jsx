import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCamera,
  FiUpload,
} from "react-icons/fi";

function UploadPage({ onBack, onAnalyze }) {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [imagePreview, setImagePreview] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [cameraMode, setCameraMode] = useState("idle");

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    if (cameraMode === "camera" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((error) => {
        console.error("Could not start video:", error);
      });
    }
  }, [cameraMode]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

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

  const handleCameraClick = async () => {
    setCameraMode("setup");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      setCameraMode("camera");
    } catch (error) {
      console.error("Camera permission error:", error);

      setCameraMode("idle");

      alert(
        "Camera access was not allowed. You can still upload an image from your gallery."
      );
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;

    if (!video || !video.videoWidth || !video.videoHeight) {
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const capturedImage = canvas.toDataURL("image/jpeg", 0.9);

    stopCamera();

    setCameraMode("idle");
    setImagePreview(capturedImage);
    setImageBase64(capturedImage);
  };

  const handleCancelCamera = () => {
    stopCamera();
    setCameraMode("idle");
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

        {cameraMode === "setup" && (
          <div className="camera-setup">
            <div className="camera-setup-diamonds">
              <div className="camera-setup-diamond diamond-one"></div>
              <div className="camera-setup-diamond diamond-two"></div>
              <div className="camera-setup-diamond diamond-three"></div>

              <div className="camera-setup-icon">
                <FiCamera size={34} strokeWidth={1.2} />
              </div>
            </div>

            <p>SETTING UP CAMERA...</p>

            <div className="camera-tips">
              <span>TO GET BETTER RESULTS MAKE SURE TO HAVE</span>

              <div>
                ◇ NEUTRAL EXPRESSION &nbsp;&nbsp; ◇ FRONTAL POSE
                &nbsp;&nbsp; ◇ ADEQUATE LIGHTING
              </div>
            </div>
          </div>
        )}

        {cameraMode === "camera" && (
          <div className="camera-view">
            <video
              ref={videoRef}
              className="camera-video"
              autoPlay
              playsInline
              muted
            />

            <div className="camera-actions">
              <button type="button" onClick={handleCancelCamera}>
                CANCEL
              </button>

              <button type="button" onClick={handleCapture}>
                CAPTURE
              </button>
            </div>
          </div>
        )}

        {cameraMode === "idle" && !imagePreview && (
          <div className="upload-options">
            <button
              type="button"
              className="upload-option"
              onClick={handleCameraClick}
            >
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
        )}

        {cameraMode === "idle" && imagePreview && (
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

        {cameraMode === "idle" && (
          <button
            className="form-back-button"
            type="button"
            onClick={onBack}
          >
            <div className="circle">
              <FiArrowLeft size={14} strokeWidth={1.5} />
            </div>

            <span>BACK</span>
          </button>
        )}

        {cameraMode === "idle" && imagePreview && (
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