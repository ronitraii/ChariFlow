import { useState } from 'react'
import './App.css'
import SignUpPage from "./components/SignUpPage";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <SignUpPage/>
    </>
  )
}

export default App
