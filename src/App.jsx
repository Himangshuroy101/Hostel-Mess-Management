// import { useState } from 'react'

import './App.css'
import Navbar from './Components/NavBar'
import Slideshow from './Components/Slideshow'
import Card from './Components/Card'
import InfoCard from './Components/InfoCard'
// import Signup from './auth/Signup'
import Demo from './Components/Demo'
import TextDemo from './Components/TextDemo'
// // import './App.css'
// import Navbar from './Components/NavBar'
// import Slideshow from './Components/Slideshow'
// import Card from './Components/Card'
// import InfoCard from './Components/InfoCard'
// // import Signup from './auth/Signup'
// import Demo from './Components/Demo'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <Navbar/>
//       <Slideshow/>
//       <Card/>
//       <InfoCard/>
//       <Demo/>
//     </>
//   )
// }

// export default App


import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./auth/Signup";

import BorderProfile from "./Profile/BorderProfile";
import AdminProfile from "./Profile/AdminProfile";
import Home from "./Home";
import Manager from "./Profile/ManagerProfile";
import Request from "./auth/Request";
import Login from "./auth/Login";
import Contact from "./ContactUs/Contact";
import Terms from "./termsConditions/Terms";

function App() {

  return (
    <>
      <Navbar/>
      <Slideshow/>
      <Card/>
      <InfoCard/>
      <Demo/>
      <TextDemo />
    
      <BrowserRouter> 
        <Routes>
          <Route path="*" element={<div>Page Not Found</div>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/register" element={<Signup/>}></Route>
          <Route path="/terms" element={<Terms/>}></Route>
          <Route path="/request" element ={<Request/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/profile" element ={<BorderProfile/>}></Route>
          <Route path="/adminProfile" element={<AdminProfile/>}></Route>
          <Route path="/ManagerProfile" element={<Manager/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;



