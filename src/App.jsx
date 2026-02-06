import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { supabase } from "./supabase"

import HomeScreen from "./HomeScreen"
import ChildScreen from "./ChildScreen"
import KineScreen from "./KineScreen"

function App() {

  // stille test: check of Supabase bereikbaar is
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
    <BrowserRouter>

      {/* Navigatieknoppen */}
      <nav style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/kind">
          <button>Kind</button>
        </Link>

        <Link to="/kinesist">
          <button>Kinesist</button>
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/homescreen" element={<HomeScreen />} />
        <Route path="/kind" element={<ChildScreen />} />
        <Route path="/kinesist" element={<KineScreen />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App