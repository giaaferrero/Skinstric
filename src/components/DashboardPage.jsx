import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import QuestionDiamond from "../assets/Group 39959.svg";

function DashboardPage({ onBack, onDemographics }) {
  return (
    <>
      <header>
        <div className="header-left">
          <div>SKINSTRIC</div>
          <div>[ ANALYSIS ]</div>
        </div>

        <button type="button">ENTER CODE</button>
      </header>

      <main className="dashboard-page">
        <div className="dashboard-left">
          <p className="dashboard-title">A.I. ANALYSIS</p>

          <p>
            A.I. HAS ESTIMATED THE FOLLOWING.
            <br />
            FIX ESTIMATED INFORMATION IF NEEDED.
          </p>
        </div>

        <div
          className="dashboard-center"
          style={{
            position: "relative",
          }}
        >
          <img
            src={QuestionDiamond}
            alt="A.I. analysis options"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />

          <button
            type="button"
            aria-label="Demographics"
            onClick={onDemographics}
            style={{
              position: "absolute",
              top: "17%",
              left: "35%",
              width: "30%",
              height: "30%",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          />
        </div>

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

        <button
          className="dashboard-next"
          type="button"
        >
          <span>GET SUMMARY</span>

          <div className="circle">
            <FiArrowRight size={14} strokeWidth={1.5} />
          </div>
        </button>
      </main>
    </>
  );
}

export default DashboardPage;