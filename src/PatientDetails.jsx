import { useEffect, useState } from "react"
import { supabase } from "./supabase"
import "./assets/css/PatientDetails.css"

export default function PatientDetails({ patient, onBack }) {
  if (!patient) return null

  const p = patient

  const [exercises, setExercises] = useState([])
  const [assignedExercises, setAssignedExercises] = useState([])
  const [showAssign, setShowAssign] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState("")
  const [frequency, setFrequency] = useState(3)
  const [activeTab, setActiveTab] = useState("Overzicht")

  useEffect(() => {
    fetchExercises()
    fetchAssignedExercises()
  }, [])

  // 🔹 alle oefeningen ophalen
// 🔹 alle oefeningen ophalen
const fetchExercises = async () => {
  const { data, error } = await supabase
    .from("exercises")
    .select("id, title, description")
    .order("title")

  console.log("EXERCISES UIT DB:", data, error)

  if (error) {
    console.error("Fout bij ophalen oefeningen:", error)
  } else {
    setExercises(data || [])
  }
}

  // 🔹 toegewezen oefeningen ophalen voor dit kind
  const fetchAssignedExercises = async () => {
    const { data, error } = await supabase
      .from("assigned_exercises")
      .select(`
        id,
        frequency,
        completed,
        exercises (
          id,
          title,
          description
        )
      `)
      .eq("child_id", p.id)

    if (error) {
      console.error("Fout bij ophalen toegewezen oefeningen:", error)
    } else {
      setAssignedExercises(data || [])
    }
  }

  // 🔹 oefening toewijzen
  const assignExercise = async () => {
    if (!selectedExercise) return

    const { error } = await supabase.from("assigned_exercises").insert([
      {
        child_id: p.id,
        exercise_id: selectedExercise,
        frequency: Number(frequency),
        completed: false
      }
    ])

    if (error) {
      console.error("Fout bij toewijzen:", error)
      alert("Oefening kon niet toegewezen worden")
    } else {
      setShowAssign(false)
      setSelectedExercise("")
      setFrequency(3)
      fetchAssignedExercises()
    }
  }

  const tabs = ["Overzicht", "Sessies", "Oefeningen", "Logboek"]

  return (
    <div className="pd">
      <button className="pdBack" onClick={onBack}>
        ← Terug naar overzicht
      </button>

      <h2>{p.name} ({p.age} jaar)</h2>

      <button
        className="btn btn-primary pdAddBtn"
        onClick={() => setShowAssign(true)}
      >
        + Oefening toevoegen
      </button>

      {showAssign && (
        <div className="pdAssignBox">
          <h3>Oefening toewijzen</h3>

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
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />

          <button className="btn btn-primary" onClick={assignExercise}>
            Toewijzen
          </button>
        </div>
      )}

      <div className="pdTabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={activeTab === t ? "active" : ""}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Oefeningen" && (
        <ul>
          {assignedExercises.length === 0 ? (
            <li>Geen oefeningen toegewezen</li>
          ) : (
            assignedExercises.map((a) => (
              <li key={a.id}>
                <strong>{a.exercises?.title}</strong> – {a.frequency}× / week
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}