"use client"
import Hero from "../../components/Hero";
import React, { useEffect } from "react";
import { useAuthContext} from '../../context/AuthContext'
import { useRouter } from "next/navigation";





export default function Home1() {

  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user == null) router.push("/signin");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [user]);
  return (
    <>
    <Hero/>
   
    

    </>
    
    
        
    
  )
}