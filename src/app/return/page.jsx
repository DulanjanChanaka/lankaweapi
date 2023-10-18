"use client"
import AddReturn from '../../components/AddReturn'
import React, { useEffect } from "react";
import { useAuthContext} from '../../context/AuthContext'
import { useRouter } from "next/navigation";
import ReturnCard from '../../components/ReturnCard'
import './../shop/styles.css';

function Return() {
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

    console.log(user)
  return (
    <div className="bg-cover h-screen relative   gradient-bg" >
    <div>
    <div className="fixed hidden lg:block top-20 right-0 p-5">
        <button className="btn p-2 bg-cyan-500 text-white rounded-lg shadow-xl" onClick={() => document.getElementById('my_modal_4').showModal()}>Add Sell Item</button>
      </div>
      <dialog id="my_modal_4" className="modal rounded-xl shadow-xl">
      
        <div className="modal-box p-5">
          <AddReturn />
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn float-right px-2 py-1 text-red-600 rounded-2xl mr-3 mb-3">Close</button>
          </form>
        </div>
      </dialog>
    </div>

    <div className=" grid-cols-2">
        <ReturnCard />
      </div>

      <div className="fixed lg:hidden bottom-0 right-0 p-5">
        <button className="btn p-2 bg-cyan-600 text-white rounded-lg shadow-xl" onClick={() => document.getElementById('my_modal_4').showModal()}>Add Sell Item</button>
      </div>
  </div>
  )
}

export default Return





