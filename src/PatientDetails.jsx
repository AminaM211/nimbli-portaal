// ✅ maak nieuw bestand: src/PatientDetailsScreen.jsx
import "./assets/css/PatientDetails.css"

export default function PatientDetails({ patient, onBack }) {
  const p = patient || {
    name: "Liam De Broeck",
    age: 7,
    startDate: "2026-02-15",
    goal: "Motorische ontwikkeling ondersteunen",
    parentName: "Sarah Jansen",
    parentRole: "Ouder/verzorger",
    parentEmail: "sarah.jansen@email.com",
    parentPhone: "+31 6 1234 5678"
  }

  const tabs = ["Overzicht", "Sessies", "Oefeningen", "Logboek"]

  return (
    <div className="pd">
      <div className="pdTopBar">
        <button className="pdBack" onClick={onBack}>
          ← <span>Terug naar overzicht</span>
        </button>
      </div>

      <section className="pdHeaderCard">
        <div className="pdHeaderLeft">
          <div className="pdAvatar" />
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
          <img src="/images/qr.svg" alt="QR" />
        </div>

        <div className="pdDivider" />

        <div className="pdContactRow">
          <div className="pdContactLeft">
            <div className="pdContactName">{p.parentName}</div>
            <div className="pdContactRole">{p.parentRole}</div>
          </div>

          <div className="pdContactRight">
            <div className="pdContactItem">
              <img src="/images/mail.svg" alt="" />
              <span>{p.parentEmail}</span>
            </div>
            <div className="pdContactItem">
              <img src="/images/phone.svg" alt="" />
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
  )
}

