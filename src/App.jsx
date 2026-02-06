import { Routes, Route, Link } from "react-router-dom"

import HomeScreen from "./HomeScreen"
import ChildScreen from "./ChildScreen"
import KineScreen from "./KineScreen"
import PatientDetails from "./PatientDetails"
import { useEffect } from "react"
import { supabase } from "./supabase"

function App() {
  useEffect(() => {
    const checkConnection = async () => {
      const { error } = await supabase
        .from("users")
        .select("id")
        .limit(1)

      if (error) {
        console.error("Supabase connectie fout:", error.message)
      } else {
        console.log("Supabase verbonden ✅")
      }
    }

    checkConnection()
  }, [])

  return (
    <>
      {/* tijdelijke dev navigatie */}
      <nav style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/kind">Kind</Link>
        <Link to="/kinesist">Kinesist</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/kind" element={<ChildScreen />} />
        <Route path="/kinesist" element={<KineScreen />} />
        <Route path="/kinesist/patient/:id" element={<PatientDetails />} />
      </Routes>
    </>
  )
}

export default App