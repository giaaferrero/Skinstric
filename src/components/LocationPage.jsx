import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function LocationPage({ location, setLocation, onBack, onNext }) {
  const locationIsValid = location.trim().length >= 2;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (locationIsValid) {
      onNext();
    }
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

      <main className="single-question-page">
        <div className="single-question-label">WHERE ARE YOU FROM?</div>

        <form className="single-question-form" onSubmit={handleSubmit}>
          <div className="question-diamond question-diamond-one"></div>
          <div className="question-diamond question-diamond-two"></div>
          <div className="question-diamond question-diamond-three"></div>

          <div className="question-content">
            <label htmlFor="location">CLICK TO TYPE</label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Thornton, CO"
              autoFocus
            />

            {location !== "" && !locationIsValid && (
              <p className="single-question-error">
                Please enter your location.
              </p>
            )}
          </div>
        </form>

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
          className="single-question-next"
          type="button"
          onClick={onNext}
          disabled={!locationIsValid}
        >
          <span>NEXT</span>

          <div className="circle">
            <FiArrowRight size={14} strokeWidth={1.5} />
          </div>
        </button>
      </main>
    </>
  );
}

export default LocationPage;