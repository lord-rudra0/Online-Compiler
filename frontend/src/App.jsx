import { useState } from 'react'
import './App.css'
import NavbarDemo from './components/Navbar/navbar'
import Footer from './components/Footer/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <NavbarDemo />
        <Footer />
        
      </div>
    </>
  )
}

export default App
