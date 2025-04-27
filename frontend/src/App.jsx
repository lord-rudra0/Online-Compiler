import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavbarDemo from './components/Navbar/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <NavbarDemo />
        
        
      </div>
    </>
  )
}

export default App
