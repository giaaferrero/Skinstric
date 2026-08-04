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
        <div className="loading-content">
          <div className="question-diamond question-diamond-one"></div>
          <div className="question-diamond question-diamond-two"></div>
          <div className="question-diamond question-diamond-three"></div>

          <div className="loading-text">
            <p>PLEASE WAIT</p>

            <h2>
              PREPARING
              <br />
              YOUR ANALYSIS...
            </h2>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoadingPage;