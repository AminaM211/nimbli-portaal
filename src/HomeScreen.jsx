import "../App.css";

function HomeScreen() {
  return (
    <div className="page">
      <div className="shell">
        <div className="left">
          <h1>Samen sterk in thuisrevalidatie.</h1>
          <p className="subtitle">
            Log in of meld je aan met een code die je van de kinesist hebt gekregen.
          </p>

          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Wachtwoord" />

            <label className="remember">
              <input type="checkbox" />
              <span>Onthoud mij.</span>
            </label>

            <button className="btn btn-primary" type="submit">
              Inloggen
            </button>

            <button className="btn btn-outline" type="button">
              Aanmelden met code
            </button>

            <a className="link" href="#">
              Wachtwoord vergeten? Klik hier
            </a>
          </form>
        </div>

        <div className="right">
          <div className="img-placeholder" aria-label="placeholder image">
            <span className="x x1" />
            <span className="x x2" />
          </div>
        </div>
      </div>

      <footer className="footer">
        <a href="#">Privacy</a>
        <a href="#">Gebruiksvoorwaarden</a>
      </footer>
    </div>
  );
}
  
  export default HomeScreen