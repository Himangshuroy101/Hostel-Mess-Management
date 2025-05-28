import { useState } from 'react'

import './App.css'
import Navbar from './Components/NavBar'
import Slideshow from './Components/Slideshow'
import Card from './Components/Card'
import InfoCard from './Components/InfoCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Slideshow/>
      <Card/>
      <InfoCard/>
    </>
  )
}

export default App
