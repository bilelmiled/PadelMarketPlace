import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white"> 
      <Navbar />
      <main className="w-full pb-10">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout