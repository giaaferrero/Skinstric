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
          <p>PLEASE WAIT</p>

          <h2>
            ANALYZING
            <br />
            YOUR IMAGE
          </h2>

          <div className="loading-spinner"></div>
        </div>
      </main>
    </>
  );
}

export default LoadingPage;