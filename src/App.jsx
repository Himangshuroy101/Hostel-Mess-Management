import { useState } from 'react'

import './App.css'
import Navbar from './Components/NavBar'
import Slideshow from './Components/Slideshow'
import Card from './Components/Card'
import InfoCard from './Components/InfoCard'
// import Signup from './auth/Signup'
import Demo from './Components/Demo'
import TextDemo from './Components/TextDemo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Slideshow/>
      <Card/>
      <InfoCard/>
      <Demo/>
      <TextDemo />
    
    </>
  )
}

export default App
