import Canvas from "./components/Canvas"

const App = () => {
  return (
    <Canvas />
  )
}

// We need it so
// When we click on a port noodle,
// 1 -> We create a connecting type, (ok)
// 2 -> When we leave mouse on an input we draw the line. and reset connecting
// 3 -> If we leave on an empty space we reset connecting

export default App