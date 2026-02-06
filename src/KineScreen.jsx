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
          <img className="brandLogo" src="/images/kinedash.svg" alt="Nimbli" />
        </div>

        <nav className="sideNav">
          <button className="sideLink active">
            <span className="icon"><img src="/images/dashboard.svg" alt="Nimbli" />
          </span>
            Dashboard
          </button>

          <button className="sideLink ">
          <span className="icon"><img src="/images/oef-icon.svg" alt="Nimbli" /></span>
          Oefeningen
          </button>

          <button className="sideLink ">
          <span className="icon"><img src="/images/settings.svg" alt="Nimbli" /></span>          Instellingen
          </button>

          <button className="sideLink logout" title="Uitloggen">
          <span className="icon"><img src="/images/logout.svg" alt="Nimbli" /></span>          </button>
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
            <button className="btn btn-primary">Patiënt toevoegen</button>
          </div>

          <div className="searchRow">
            <div className="searchBox">
              <span className="searchIcon"><img src="/images/search-icon.svg" alt="" /></span>
              <input placeholder="Zoek patiënt..." />
            </div>
          </div>

          {!hasPatients && (
            <div className="emptyState">
              <img
                className="monkey"
                src="/images/EmptyState-geenpatienten.png"
                alt="Geen patiënten"
              />
              <p>Je hebt nog geen patiënten</p>
              <button className="btn btn-primary">Patiënt toevoegen</button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
