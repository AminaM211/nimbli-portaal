import { useState } from "react"
import HomeScreen from "./HomeScreen"
import ChildScreen from "./ChildScreen"
import KineScreen from "./KineScreen"

function App() {
  const [screen, setScreen] = useState("home")

  return (
    <div>
      <button onClick={() => setScreen("home")}>Home</button>
      <button onClick={() => setScreen("child")}>Kind</button>
      <button onClick={() => setScreen("kine")}>Kinesist</button>

      {screen === "home" && <HomeScreen />}
      {screen === "child" && <ChildScreen />}
      {screen === "kine" && <KineScreen />}
    </div>
  )
}

export default App