import { useState } from 'react'
import ResisterStud from './pages/ResisterStud'
import './App.css'
import Header from './components/Header/Header'
import { Logo } from './components/index'
function App() {
  


  return (
    <>
      <Header/>
      <h1 className=' text-blue-400 '> Tejstarter</h1>
      <ResisterStud/>
    </>
  )
}

export default App
