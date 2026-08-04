import { useState } from "react";
import "./App.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import NamePage from "./components/NamePage";
import LocationPage from "./components/LocationPage";
import UploadPage from "./components/UploadPage";
import LoadingPage from "./components/LoadingPage";
import DashboardPage from "./components/DashboardPage";
import ResultsPage from "./components/ResultsPage";

function App() {
  const [currentPage, setCurrentPage] = useState("intro");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [phaseOneResponse, setPhaseOneResponse] = useState(null);
  const [demographicResults, setDemographicResults] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            location,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("The Phase 1 request was not successful.");
      }

      const data = await response.json();

      setPhaseOneResponse(data);
      console.log("Phase 1 response:", data);

      setCurrentPage("upload");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async (imageBase64) => {
    setIsLoading(true);
    setCurrentPage("loading");

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: imageBase64,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("The Phase 2 request was not successful.");
      }

      const data = await response.json();

      setDemographicResults(data);
      console.log("Phase 2 response:", data);

      setCurrentPage("dashboard");
    } catch (error) {
      console.error(error);
      alert("The image could not be analyzed. Please try again.");
      setCurrentPage("upload");
    } finally {
      setIsLoading(false);
    }
  };

  if (currentPage === "name") {
    return (
      <NamePage
        name={name}
        setName={setName}
        onBack={() => setCurrentPage("intro")}
        onNext={() => setCurrentPage("location")}
      />
    );
  }

  if (currentPage === "location") {
    return (
      <LocationPage
        location={location}
        setLocation={setLocation}
        onBack={() => setCurrentPage("name")}
        onNext={handleContinue}
        isLoading={isLoading}
      />
    );
  }

  if (currentPage === "upload") {
    return (
      <UploadPage
        phaseOneResponse={phaseOneResponse}
        onBack={() => setCurrentPage("location")}
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
      />
    );
  }

  if (currentPage === "loading") {
    return <LoadingPage />;
  }

  if (currentPage === "dashboard") {
    return (
      <DashboardPage
        onBack={() => setCurrentPage("upload")}
        onDemographics={() => setCurrentPage("results")}
      />
    );
  }

  if (currentPage === "results") {
    return (
      <ResultsPage
        results={demographicResults}
        onBack={() => setCurrentPage("dashboard")}
        onHome={() => setCurrentPage("intro")}
      />
    );
  }

  return (
    <>
      <header>
        <div className="header-left">
          <div>SKINSTRIC</div>
          <div>[ INTRO ]</div>
        </div>

        <button type="button">ENTER CODE</button>
      </header>

      <main>
        <div className="hero">
          <div className="arrow-left">
            <div className="line-left-top"></div>
            <div className="line-left-bottom"></div>

            <div className="circle">
              <FiArrowLeft size={14} strokeWidth={1.5} />
            </div>

            <p>
              DISCOVER
              <br />
              A.I.
            </p>
          </div>

          <h1>
            Sophisticated
            <br />
            skincare
          </h1>

          <button
            className="arrow-right"
            type="button"
            onClick={() => setCurrentPage("name")}
          >
            <div className="line-right-top"></div>
            <div className="line-right-bottom"></div>

            <p>
              TAKE
              <br />
              TEST
            </p>

            <div className="circle">
              <FiArrowRight size={14} strokeWidth={1.5} />
            </div>
          </button>
        </div>
      </main>

      <footer>
        <p>
          SKINSTRIC DEVELOPED AN A.I.
          <br />
          THAT CREATES
          <br />
          A HIGHLY-PERSONALISED
          <br />
          ROUTINE TAILORED TO
          <br />
          WHAT YOUR SKIN NEEDS.
        </p>
      </footer>
    </>
  );
}

export default App;