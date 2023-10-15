import React from 'react'
import Navbar from './Navbar'

function Hero() {
  return (
    
    <div className="bg-cover bg-center h-screen flex items-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/325193/pexels-photo-325193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
      <div className="text-white text-center md:pl-1 xl:pl-20   ">
        <h1 className="text-5xl font-bold mb-4">Welcome to Lankawe Api Community</h1>
        <p className="text-lg mb-8">Discover amazing experiences with us.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Learn More</button>
      </div>
    </div>
    
  )
}

export default Hero