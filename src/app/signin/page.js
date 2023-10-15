'use client'
import React from "react";
import signIn from "../../../firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Image from "next/image";

function Signinpage() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }
    return (
        <div className="w-full  flex justify-center items-center">
        <Image
          src="/assets/bg1.jpg"
          alt="amila"
          width={924.45}
          height={520}
          className="bg-cover bg-center h-screen w-full flex items-centerl"
        />
        <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center  ">
            <div className="bg-white bg-opacity-40 p-4 rounded-xl">
            <h1 className=" text-center text-white font-bold">Login</h1>
          <form onSubmit={handleForm} className="flex flex-col gap-4">
            <label htmlFor="email">
              <p className="text-white">Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
                className="rounded-lg px-2 py-1"
              />
            </label>
            <label htmlFor="password">
              <p className="text-white">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="rounded-lg px-2 py-1"
              />
            </label>
            <button className="p-1 bg-cyan-500 rounded-2xl text-white" type="submit">Sign In</button>
          </form>
          <p className="text-white mt-4">
        Don't have an account? <a href="/signup" className="text-cyan-300">Sign Up</a>
      </p>
         

            </div>
          
        </div>
      </div>);
}

export default Signinpage;