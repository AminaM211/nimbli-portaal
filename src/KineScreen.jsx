import { useEffect, useState } from "react"
import { supabase } from "./supabase"
import "./assets/css/KineScreen.css"
import PatientDetails from "./PatientDetails.jsx"

export default function KineScreen() {
  const kinesiName = "Anne"

  const stats = [
    { value: "35", label: "Patiënten" },
    { value: "25%", label: "Gemiddelde therapietrouw" },
    { value: "87%", label: "Compliance rate" }
  ]

  // state
  const [patients, setPatients] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)

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
      return
    }

    setPatients(data || [])
  }

  const addPatient = async () => {
    if (!name.trim() || !age) return

    const { error } = await supabase.from("users").insert([
      {
        name: name.trim(),
        age: Number(age),
        role: "child"
      }
    ])

    if (error) {
      console.error("Fout bij toevoegen patiënt:", error)
      alert("Patiënt kon niet toegevoegd worden")
      return
    }

    setName("")
    setAge("")
    setShowForm(false)
    fetchPatients()
  }

  const initials = (fullName) => {
    const parts = (fullName || "").trim().split(/\s+/).filter(Boolean)
    return parts
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("")
  }

  // ✅ DETAILS PAGE
  if (selectedPatient) {
    return (
      <div className="kine">
        <aside className="kineSidebar">
          <div className="brand">
            <img className="brandLogo" src="/images/kinedash.svg" alt="Nimbli" />
          </div>

          <nav className="sideNav">
            <button className="sideLink active" onClick={() => setSelectedPatient(null)}>
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

        <main className="kineMain">
          <PatientDetails
            patient={{
              ...selectedPatient,
              startDate: selectedPatient.startDate || "2026-02-15",
              goal: selectedPatient.goal || "Motorische ontwikkeling ondersteunen",
              parentName: selectedPatient.parentName || "Sarah Jansen",
              parentRole: selectedPatient.parentRole || "Ouder/verzorger",
              parentEmail: selectedPatient.parentEmail || "sarah.jansen@email.com",
              parentPhone: selectedPatient.parentPhone || "+31 6 1234 5678"
            }}
            onBack={() => setSelectedPatient(null)}
          />
        </main>
      </div>
    )
  }

  // ✅ DASHBOARD
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
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Patiënt toevoegen
            </button>
          </div>

          <div className="searchRow">
            <div className="searchBox">
              <span className="searchIcon">
                <img src="/images/search-icon.svg" alt="" />
              </span>
              <input placeholder="Zoek patiënt..." />
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
                <button className="btn" onClick={() => setShowForm(false)}>
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
                <div
                  key={p.id}
                  className="patientCard"
                  onClick={() => setSelectedPatient(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedPatient(p)
                  }}
                >
                  <div className="pcTop">
                    <div className="avatar">{initials(p.name)}</div>

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