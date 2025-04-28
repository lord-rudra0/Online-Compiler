import { useState } from 'react'
import './App.css'
import NavbarDemo from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import EditorBox from './components/Editor/Editor'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <div className="app-container">
        <NavbarDemo />
        <Footer />
        <EditorBox />
      </div>
    </ThemeProvider>
  )
}

export default App
