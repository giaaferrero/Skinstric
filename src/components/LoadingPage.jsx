import { FiCamera } from "react-icons/fi";

function LoadingPage() {
  return (
    <>
      <header>
        <div className="header-left">
          <div>SKINSTRIC</div>
          <div>[ ANALYZING ]</div>
        </div>

        <button type="button">ENTER CODE</button>
      </header>

      <main className="loading-page">
        <div className="loading-wrapper">
          <div className="loading-diamonds">
            <div className="diamond diamond-1"></div>
            <div className="diamond diamond-2"></div>
            <div className="diamond diamond-3"></div>
            <div className="diamond diamond-4"></div>

            <div className="camera-circle">
              <FiCamera size={30} strokeWidth={1.4} />
            </div>
          </div>

          <p className="loading-status">
            SETTING UP CAMERA...
          </p>

          <p className="loading-help">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
            <br />
            ◇ NEUTRAL EXPRESSION
            &nbsp;&nbsp;&nbsp;
            ◇ FRONTAL POSE
            &nbsp;&nbsp;&nbsp;
            ◇ ADEQUATE LIGHTING
          </p>
        </div>
      </main>
    </>
  );
}

export default LoadingPage;