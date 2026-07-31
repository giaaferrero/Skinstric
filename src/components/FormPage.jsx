import { FiArrowLeft } from "react-icons/fi";

function FormPage({
  name,
  location,
  setName,
  setLocation,
  onBack,
  onContinue,
}) {
  const lettersOnlyPattern = /^[a-zA-ZÀ-ÿ\s,.'-]+$/;

  const nameIsValid =
    name.trim().length >= 2 && lettersOnlyPattern.test(name.trim());

  const locationIsValid =
    location.trim().length >= 2 && lettersOnlyPattern.test(location.trim());

  const formIsValid = nameIsValid && locationIsValid;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formIsValid) {
      onContinue();
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

      <main className="form-page">
        <div className="form-content">
          <p>TO START ANALYSIS</p>

          <h2>TELL US ABOUT YOURSELF</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">YOUR NAME</label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Introduce Yourself"
            />

            {name !== "" && !nameIsValid && (
              <p className="form-error">
                Please enter a valid name without numbers.
              </p>
            )}

            <label htmlFor="location">YOUR LOCATION</label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Where are you from?"
            />

            {location !== "" && !locationIsValid && (
              <p className="form-error">
                Please enter a valid location without numbers.
              </p>
            )}

            <button
              type="submit"
              className="continue-button"
              disabled={!formIsValid}
            >
              CONTINUE →
            </button>
          </form>
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
      </main>
    </>
  );
}

export default FormPage;