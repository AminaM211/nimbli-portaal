import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "./supabase"
import "./assets/css/style.css"
import "./assets/css/PatientDetails.css"
import KineSidebar from "./components/KineSidebar"

export default function PatientDetailsScreen() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  const [exercises, setExercises] = useState([])
  const [assignedExercises, setAssignedExercises] = useState([])
  const [showAssign, setShowAssign] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState("")
  const [frequency, setFrequency] = useState(3)
  const [activeTab, setActiveTab] = useState("Overzicht")

  /* -------------------------
     DATA FETCHING
  --------------------------*/

  useEffect(() => {
    if (id) fetchPatient()
  }, [id])

  useEffect(() => {
    if (patient?.id) {
      fetchExercises()
      fetchAssignedExercises()
    }
  }, [patient])

  const fetchPatient = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single()

    if (!error) setPatient(data)
    else setPatient(null)

    setLoading(false)
  }

  const fetchExercises = async () => {
    const { data, error } = await supabase
      .from("exercises")
      .select("id, title, description")
      .order("title")

    if (!error) setExercises(data || [])
  }

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
      .eq("child_id", patient.id)

    if (!error) setAssignedExercises(data || [])
  }

  const assignExercise = async () => {
    if (!selectedExercise) return

    const { error } = await supabase.from("assigned_exercises").insert([
      {
        child_id: patient.id,
        exercise_id: selectedExercise,
        frequency: Number(frequency),
        completed: false
      }
    ])

    if (!error) {
      setShowAssign(false)
      setSelectedExercise("")
      setFrequency(3)
      fetchAssignedExercises()
    }
  }

  /* -------------------------
     DERIVED DATA
  --------------------------*/

  const p = useMemo(() => {
    if (!patient) return null

    return {
      ...patient,
      startDate: patient.startDate || "2026-02-15",
      goal: patient.goal || "Motorische ontwikkeling ondersteunen",
      parentName: patient.parentName || "Sarah Jansen",
      parentRole: patient.parentRole || "Ouder/verzorger",
      parentEmail: patient.parentEmail || "sarah.jansen@email.com",
      parentPhone: patient.parentPhone || "+31 6 1234 5678"
    }
  }, [patient])

  const initials = (fullName) =>
    (fullName || "")
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase()

  const tabs = ["Overzicht", "Sessies", "Oefeningen", "Logboek"]

  /* -------------------------
     RENDER
  --------------------------*/

  if (loading || !p) {
    return <div className="pd" style={{ padding: 24 }}>Laden...</div>
  }

  return (
    <div className="main">
      <KineSidebar />

      <div className="pd">
        <div className="pdTopBar">
          <button className="pdBack" onClick={() => navigate("/kinesist")}>
            ← <span>Terug naar overzicht</span>
          </button>
        </div>

        {/* HEADER */}
        <section className="pdHeaderCard">
          <div className="flex">
            <div className="pdHeaderLeft">
              <div className="pdAvatar">{initials(p.name)}</div>

              <div className="pdHeadText">
                <div className="pdNameRow">
                  <h2 className="pdName">{p.name}</h2>
                  <span className="pdAge">{p.age} jaar</span>
                </div>
                <div className="pdMeta">Startdatum: {p.startDate}</div>
                <div className="pdGoal">{p.goal}</div>
              </div>
            </div>

            <div className="pdQr">
              <img src="/images/QR.svg" alt="QR" />
            </div>
          </div>

          <div className="pdDivider" />

          <div className="pdContactRow">
            <div className="pdContactLeft">
              <div className="pdContactName">{p.parentName}</div>
              <div className="pdContactRole">{p.parentRole}</div>
            </div>

            <div className="pdContactRight">
              <div className="pdContactItem">
                <img src="/images/mail-icon.svg" alt="" />
                <span>{p.parentEmail}</span>
              </div>
              <div className="pdContactItem">
                <img src="/images/phone-icon.svg" alt="" />
                <span>{p.parentPhone}</span>
              </div>
            </div>
          </div>
        </section>

        {/* OEFENING TOEVOEGEN */}
        <button className="btn btn-primary pdAddBtn" onClick={() => setShowAssign(true)}>
          + Oefening toevoegen
        </button>

        {showAssign && (
          <div className="pdAssignBox">
            <select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)}>
              <option value="">Kies een oefening</option>
              {exercises.map((e) => (
                <option key={e.id} value={e.id}>{e.title}</option>
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

        {/* TABS */}
        <div className="pdTabs">
          {tabs.map((t) => (
            <button
              key={t}
              className={`pdTab ${activeTab === t ? "active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* OEFENINGEN TAB */}
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
    </div>
  )
}