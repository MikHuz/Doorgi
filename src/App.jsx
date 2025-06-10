import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
        <h1>Hello World!</h1>
        <img src="logo.png"/>
      </div>
    </>
  )
}

export default App
