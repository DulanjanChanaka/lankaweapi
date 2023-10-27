'use client'
import React, { useEffect } from "react";
import { useAuthContext} from '../../context/AuthContext'
import { useRouter } from "next/navigation";
import './../shop/styles.css';
function Ask() {
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
        <div className="bg-cover h-screen relative   gradient-bg">
             <h1 className="flex justify-center text-center pt-10 text-2xl  text-white">Coming soon</h1>
        </div>
   
    );
}

export default Ask;