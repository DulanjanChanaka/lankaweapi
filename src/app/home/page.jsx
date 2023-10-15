"use client"
import Hero from "../../components/Hero";
import React from "react";
import { useAuthContext} from '../../context/AuthContext'
import { useRouter } from "next/navigation";





export default function Home1() {

  const { user } = useAuthContext()
  const router = useRouter()

  React.useEffect(() => {
      if (user == null) router.push("/signin")
  }, [user])
  return (
    <>
    <Hero/>
   
    

    </>
    
    
        
    
  )
}