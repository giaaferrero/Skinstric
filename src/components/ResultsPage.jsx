import { useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function ResultsPage({ results, onBack, onHome }) {
  const demographics = results?.data ?? {};

  const categories = useMemo(
    () => ({
      race: demographics.race ?? {},
      age: demographics.age ?? {},
      gender: demographics.gender ?? {},
    }),
    [demographics]
  );

  const [selectedCategory, setSelectedCategory] = useState("race");
  const [selectedValues, setSelectedValues] = useState(() => ({
    race: getTopResult(categories.race),
    age: getTopResult(categories.age),
    gender: getTopResult(categories.gender),
  }));

  function getTopResult(category) {
    const sorted = Object.entries(category).sort(
      ([, firstScore], [, secondScore]) => secondScore - firstScore
    );

    return sorted[0]?.[0] ?? "--";
  }

  const formatLabel = (label) => {
    if (!label || label === "--") {
      return "--";
    }

    return label
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const selectedOptions = useMemo(() => {
    return Object.entries(categories[selectedCategory])
      .sort(([, firstScore], [, secondScore]) => secondScore - firstScore)
      .map(([label, score]) => ({
        label,
        score,
      }));
  }, [categories, selectedCategory]);

  const selectedLabel = selectedValues[selectedCategory];
  const selectedScore =
    categories[selectedCategory]?.[selectedLabel] ?? 0;

  const handleOptionSelect = (label) => {
    setSelectedValues((currentValues) => ({
      ...currentValues,
      [selectedCategory]: label,
    }));
  };

  return (
    <>
      <header>
        <div className="header-left">
          <div>SKINSTRIC</div>
          <div>[ ANALYSIS ]</div>
        </div>

        <button type="button">ENTER CODE</button>
      </header>

      <main className="results-page">
        <div className="results-heading">
          <p className="results-label">A.I. ANALYSIS</p>
          <h1>DEMOGRAPHICS</h1>
          <p>PREDICTED RACE & AGE</p>
        </div>

        <div className="results-layout">
          <aside className="results-categories">
            <button
              type="button"
              className={`result-category ${
                selectedCategory === "race" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("race")}
            >
              <strong>{formatLabel(selectedValues.race)}</strong>
              <span>RACE</span>
            </button>

            <button
              type="button"
              className={`result-category ${
                selectedCategory === "age" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("age")}
            >
              <strong>{selectedValues.age}</strong>
              <span>AGE</span>
            </button>

            <button
              type="button"
              className={`result-category ${
                selectedCategory === "gender" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("gender")}
            >
              <strong>
                {formatLabel(selectedValues.gender).toUpperCase()}
              </strong>
              <span>SEX</span>
            </button>
          </aside>

          <section className="results-confidence-card">
            <h2>{formatLabel(selectedLabel)}</h2>

            <div
              className="confidence-circle"
              style={{
                "--confidence": `${selectedScore * 360}deg`,
              }}
            >
              <div className="confidence-circle-inner">
                <span>{Math.round(selectedScore * 100)}%</span>
              </div>
            </div>
          </section>

          <aside className="results-options">
            <div className="results-options-header">
              <span>
                {selectedCategory === "gender"
                  ? "SEX"
                  : selectedCategory.toUpperCase()}
              </span>
              <span>A.I. CONFIDENCE</span>
            </div>

            <div className="results-options-list">
              {selectedOptions.map(({ label, score }) => {
                const isSelected = selectedLabel === label;

                return (
                  <button
                    type="button"
                    className={`results-option ${
                      isSelected ? "active" : ""
                    }`}
                    key={label}
                    onClick={() => handleOptionSelect(label)}
                  >
                    <span className="results-option-name">
                      <span className="option-diamond">◇</span>
                      {formatLabel(label)}
                    </span>

                    <span>{Math.round(score * 100)}%</span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>

        <p className="results-help">
          If A.I. estimate is wrong, select the correct one.
        </p>

        <button
          className="form-back-button"
          onClick={onBack}
          type="button"
        >
          <div className="circle">
            <FiArrowLeft size={14} strokeWidth={1.5} />
          </div>

          <span>BACK</span>
        </button>

        <button
          className="results-home-button"
          type="button"
          onClick={onHome}
        >
          <span>HOME</span>

          <div className="circle">
            <FiArrowRight size={14} strokeWidth={1.5} />
          </div>
        </button>
      </main>
    </>
  );
}

export default ResultsPage;