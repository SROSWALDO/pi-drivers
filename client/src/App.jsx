import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import {Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Detail from './components/Detail/Detail'
import Create from './components/Create/Create'

function App() {

  

  return (
    <>
      <div className="App">

        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/drivers/:id' element={<Detail  />} />
          <Route path='/home' element={<Home />}  />
          <Route path='*' element={<Create /> } />

        </Routes>
        
      </div>
    </>
  )
}

export default App
