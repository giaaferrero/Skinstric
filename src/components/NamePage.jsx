import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function NamePage({ name, setName, onBack, onNext }) {
  const lettersOnlyPattern = /^[a-zA-ZÀ-ÿ\s,.'-]+$/;

  const nameIsValid =
    name.trim().length >= 2 && lettersOnlyPattern.test(name.trim());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (nameIsValid) {
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
        <div className="single-question-label">TO START ANALYSIS</div>

        <form className="single-question-form" onSubmit={handleSubmit}>
          <div className="question-diamond question-diamond-one"></div>
          <div className="question-diamond question-diamond-two"></div>
          <div className="question-diamond question-diamond-three"></div>

          <div className="question-content">
            <label htmlFor="name">CLICK TO TYPE</label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Introduce Yourself"
              autoFocus
            />

            {name !== "" && !nameIsValid && (
              <p className="single-question-error">
                Please enter a valid name without numbers.
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
          disabled={!nameIsValid}
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

export default NamePage;