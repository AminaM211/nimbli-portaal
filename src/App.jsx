import HomeScreen from "./HomeScreen"
import ChildScreen from "./ChildScreen"
import KineScreen from "./KineScreen"

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Nimbli – Revalidatie Demo</h1>

      <hr />
      <HomeScreen />

      <hr />
      <ChildScreen />

      <hr />
      <KineScreen />
    </div>
  )
}

export default App