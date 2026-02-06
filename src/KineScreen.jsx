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
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [selectedExercise, setSelectedExercise] = useState("")
  const [frequency, setFrequency] = useState(3)

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

  const assignExercise = async () => {
    if (!selectedPatient || !selectedExercise) return
  
    const { error } = await supabase.from("assigned_exercises").insert([
      {
        child_id: selectedPatient.id,
        exercise_id: selectedExercise,
        frequency: frequency,
        completed: false
      }
    ])
  
    if (error) {
      console.error("Fout bij toewijzen:", error)
      alert("Oefening kon niet toegewezen worden")
    } else {
      alert(`Oefening toegewezen aan ${selectedPatient.name}`)
      setSelectedPatient(null)
      setSelectedExercise("")
      setFrequency(3)
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

          {/* LIJST OF EMPTY STATE */}
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
            <ul className="patientList">
              {patients.map((p) => (
                <li key={p.id} className="patientItem">
                  <div>
                    <strong>{p.name}</strong> – {p.age} jaar
                  </div>

                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedPatient(p)}
                  >
                    Oefeningen toewijzen
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* 👉 HIER KOMT HET TOEWIJS-BLOK */}
          {selectedPatient && (
            <div className="assignExerciseBox">
              <h3>Oefeningen toewijzen aan {selectedPatient.name}</h3>

              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
              >
                <option value="">Kies een oefening</option>
                {exercises.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                placeholder="Frequentie per week"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              />

              <div style={{ marginTop: "1rem" }}>
                <button className="btn btn-primary" onClick={assignExercise}>
                  Toewijzen
                </button>

                <button
                  className="btn"
                  onClick={() => setSelectedPatient(null)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Annuleren
                </button>
              </div>
            </div>
          )}

        </section>
      </main>
    </div>

    
  )

  
}
