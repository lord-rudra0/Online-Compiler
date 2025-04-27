import { useState } from 'react'
import './App.css'
import NavbarDemo from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import EditorBox from './components/Editor/Editor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <NavbarDemo />
        <Footer />
        <EditorBox />
      </div>
    </>
  )
}

export default App
