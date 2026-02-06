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

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Fout bij ophalen patiënt:", error)
        setPatient(null)
      } else {
        setPatient(data)
      }

      setLoading(false)
    }

    if (id) fetchPatient()
  }, [id])

  const p = useMemo(() => {
    // fallback demo data (als je nog geen extra velden in Supabase hebt)
    const base = patient || {
      name: "Liam De Broeck",
      age: 7,
      startDate: "2026-02-15",
      goal: "Motorische ontwikkeling ondersteunen",
      parentName: "Sarah Jansen",
      parentRole: "Ouder/verzorger",
      parentEmail: "sarah.jansen@email.com",
      parentPhone: "+31 6 1234 5678"
    }

    return {
      ...base,
      startDate: base.startDate || "2026-02-15",
      goal: base.goal || "Motorische ontwikkeling ondersteunen",
      parentName: base.parentName || "Sarah Jansen",
      parentRole: base.parentRole || "Ouder/verzorger",
      parentEmail: base.parentEmail || "sarah.jansen@email.com",
      parentPhone: base.parentPhone || "+31 6 1234 5678"
    }
  }, [patient])

  const initials = (fullName) => {
    const parts = (fullName || "").trim().split(/\s+/).filter(Boolean)
    return parts
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("")
  }

  const tabs = ["Overzicht", "Sessies", "Oefeningen", "Logboek"]

  if (loading) {
    return (
      <div className="pd" style={{ padding: 24 }}>
        Laden...
      </div>
    )
  }

  return (
    <div className="main">
    {/* SIDEBAR */}
    <KineSidebar />
    
    {/* CONTENT */}
    <div className="pd">
      <div className="pdTopBar">
        <button className="pdBack" onClick={() => navigate("/kinesist")}>
          ← <span>Terug naar overzicht</span>
        </button>
      </div>

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

      <button className="btn btn-primary pdAddBtn">+ Oefening toevoegen</button>

      <div className="pdTabs">
        {tabs.map((t, i) => (
          <button key={t} className={`pdTab ${i === 0 ? "active" : ""}`}>
            {t}
          </button>
        ))}
      </div>

      <section className="pdChartCard">
        <div className="pdChartHeader">
          <h3>Voortgang</h3>
          <span>Laatste 30 dagen</span>
        </div>

        <div className="pdChart">
          <svg viewBox="0 0 700 260" preserveAspectRatio="none">
            <polyline
              points="40,190 130,120 220,90 310,170 400,120 490,80 610,40"
              fill="none"
              stroke="#2f2f2f"
              strokeWidth="3"
            />
            <polyline
              points="40,150 150,120 250,150 340,100 460,120 560,80 650,60"
              fill="none"
              stroke="#a7a7a7"
              strokeWidth="3"
            />
            <polyline
              points="40,210 200,210 320,140 430,160 540,120 650,160"
              fill="none"
              stroke="#d1d1d1"
              strokeWidth="3"
            />
          </svg>

          <div className="pdAxis">
            {["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}