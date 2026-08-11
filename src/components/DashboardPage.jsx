import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

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

        <div className="dashboard-center">
          <button
            className="dashboard-tile dashboard-demographics active"
            type="button"
            onClick={onDemographics}
          >
            <span>DEMOGRAPHICS</span>
          </button>

          <button
            className="dashboard-tile dashboard-skin"
            type="button"
          >
            <span>
              SKIN TYPE
              <br />
              DETAILS
            </span>
          </button>

          <button
            className="dashboard-tile dashboard-cosmetic"
            type="button"
          >
            <span>
              COSMETIC
              <br />
              CONCERNS
            </span>
          </button>

          <button
            className="dashboard-tile dashboard-weather"
            type="button"
          >
            <span>WEATHER</span>
          </button>
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

        <button className="dashboard-next" type="button">
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