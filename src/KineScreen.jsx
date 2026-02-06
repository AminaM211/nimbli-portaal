import { useEffect, useState } from "react"
import { supabase } from "./supabase"
import "./assets/css/KineScreen.css"

export default function KineScreen() {
  const kinesiName = "Anne"

  // demo stats (mag later dynamisch)
  const stats = [
    { value: "35", label: "Patiënten" },
    { value: "25%", label: "Gemiddelde therapietrouw" },
    { value: "87%", label: "Compliance rate" }
  ]

  // 🔹 state
  const [patients, setPatients] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  // 🔹 patiënten ophalen bij laden
  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "child")
      .order("name")

    if (error) {
      console.error("Fout bij ophalen patiënten:", error)
    } else {
      setPatients(data)
    }
  }

  // 🔹 patiënt toevoegen
  const addPatient = async () => {
    if (!name || !age) return

    const { error } = await supabase.from("users").insert([
      {
        name: name,
        age: Number(age),
        role: "child"
      }
    ])

    if (error) {
      console.error("Fout bij toevoegen patiënt:", error)
      alert("Patiënt kon niet toegevoegd worden")
    } else {
      setName("")
      setAge("")
      setShowForm(false)
      fetchPatients() // 🔁 lijst updaten
    }
  }

  return (
    <div className="kine">
      {/* SIDEBAR */}
      <aside className="kineSidebar">
        <div className="brand">
          <img className="brandLogo" src="/images/kinedash.svg" alt="Nimbli" />
        </div>

        <nav className="sideNav">
          <button className="sideLink active">
            <span className="icon">
              <img src="/images/dashboard.svg" alt="" />
            </span>
            Dashboard
          </button>

          <button className="sideLink">
            <span className="icon">
              <img src="/images/oef-icon.svg" alt="" />
            </span>
            Oefeningen
          </button>

          <button className="sideLink">
            <span className="icon">
              <img src="/images/settings.svg" alt="" />
            </span>
            Instellingen
          </button>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="kineMain">
        <h1 className="hello">Goeiedag {kinesiName}!</h1>

        {/* STATS */}
        <section className="stats">
          {stats.map((s) => (
            <div className="statCard" key={s.label}>
              <div className="statValue">{s.value}</div>
              <div className="statLabel">{s.label}</div>
            </div>
          ))}
        </section>

        {/* PATIËNTEN */}
        <section className="patients">
          <div className="patientsHeader">
            <h2>Mijn Patiënten</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Patiënt toevoegen
            </button>
          </div>

          <div className="searchRow">
            <div className="searchBox">
              <span className="searchIcon">
                <img src="/images/search-icon.svg" alt="" />
              </span>
              <input
                placeholder="Zoek patiënt..."
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>


          {/* FORMULIER */}
          {showForm && (
            <div className="addPatientForm">
              <input
                placeholder="Naam kind"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="number"
                placeholder="Leeftijd"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <div className="formActions">
                <button className="btn btn-primary" onClick={addPatient}>
                  Opslaan
                </button>
                <button
                  className="btn"
                  onClick={() => setShowForm(false)}
                >
                  Annuleren
                </button>
              </div>
            </div>
          )}

{patients.length === 0 && !showForm ? (
  <div className="emptyState">
    <img
      className="monkey"
      src="/images/EmptyState-geenpatienten.png"
      alt="Geen patiënten"
    />
    <p>Je hebt nog geen patiënten</p>
  </div>
) : (
  <div className="patientsGrid">
    {patients.map((p) => (
      <div key={p.id} className="patientCard">
        <div className="pcTop">
          <div className="avatar">
            {p.name?.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase()}
          </div>

          <div className="pcInfo">
            <div className="pcName">{p.name}</div>
            <div className="pcAge">{p.age} jaar</div>
          </div>

          <div className="trend">↗ +23%</div>
        </div>

        <div className="pcProgram">knie revalidatie</div>

        <div className="pcLast">
          <span className="dot" />
          Laatste sessie: Vandaag
        </div>

        <div className="pcProgress">
          <div className="bar">
            <div className="fill" style={{ width: "60%" }} />
          </div>
          <div className="pct">60%</div>
        </div>
      </div>
    ))}
  </div>
)}
        </section>
      </main>
    </div>
  )
}