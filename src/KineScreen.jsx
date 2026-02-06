import "./assets/css/KineScreen.css"

export default function KineScreen() {
  const kinesiName = "Anne"

  // demo stats
  const stats = [
    { value: "35", label: "Patiënten" },
    { value: "25%", label: "Gemiddelde therapietrouw" },
    { value: "87%", label: "Compliance rate" }
  ]

  const hasPatients = false

  return (
    <div className="kine">
      {/* SIDEBAR */}
      <aside className="kineSidebar">
        <div className="brand">
          <img className="brandLogo" src="../public/images/" alt="Nimbli" />
          <div className="brandSub">kinesistendashboard</div>
        </div>

        <nav className="sideNav">
          <button className="sideLink active">
            <span className="icon">▦</span>
            Dashboard
          </button>

          <button className="sideLink disabled">
            <span className="icon">🏃</span>
            Oefeningen
          </button>

          <button className="sideLink disabled">
            <span className="icon">⚙</span>
            Instellingen
          </button>

          <button className="sideLink logout" title="Uitloggen">
            <span className="icon">↩</span>
          </button>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="kineMain">
        <h1 className="hello">Goeiedag {kinesiName}!</h1>

        <section className="stats">
          {stats.map((s) => (
            <div className="statCard" key={s.label}>
              <div className="statValue">{s.value}</div>
              <div className="statLabel">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="patients">
          <div className="patientsHeader">
            <h2>Mijn Patiënten</h2>
            <button className="btnPrimary">Patiënt toevoegen</button>
          </div>

          <div className="searchRow">
            <div className="searchBox">
              <span className="searchIcon">🔎</span>
              <input placeholder="Zoek patiënt..." />
            </div>
          </div>

          {!hasPatients && (
            <div className="emptyState">
              <img
                className="monkey"
                src="/images/monkey.png"
                alt="Geen patiënten"
              />
              <p>Je hebt nog geen patiënten</p>
              <button className="btnPrimary">Patiënt toevoegen</button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
