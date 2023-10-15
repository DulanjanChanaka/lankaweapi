'use client'
import React, { useEffect, useState } from "react";
import signUp from "../../../firebase/auth/signup";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import { auth, db } from "../../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../../context/AuthContext";

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [contact, setContact] = useState('');
    const router = useRouter()
    const { setAuth } = useAuthContext();
    const handleForm = async (event) => {
        event.preventDefault()

        try {
          // Create a user with email and password
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);  // Updated function call
    
          // Get the user's UID
          const { uid } = userCredential.user;
    
          // Store additional user data in Firestore
          const userDocRef = doc(db, 'user', uid);
          await setDoc(userDocRef, {
            email,
            fname,
            lname,
            country,
            city,
            contact,
            uid
          });
          useEffect(() => {
            const userLis = onAuthStateChanged(auth, (user) => {
              if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                const docRef = doc(db, "user", uid);
                getDoc(docRef).then((docSnap) => {
                  if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setAuth(docSnap.data());
                  } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                  }
                });
              }
            });
        
            return () => userLis;
          }, []);

          // setAuth({
          //   email,
          //   fname,
          //   lname,
          //   country,
          //   city,
          //   contact,
          //   uid
          // });
        } catch (error) {
          console.error('Error during registration:', error);
        }



       

        // else successful

        router.push("/")
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
            <h1 className=" text-center text-white font-bold">Sign Up</h1>
            <form onSubmit={handleForm} className="flex flex-col gap-4">
              <label htmlFor="email">
                <p className="text-white">Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  name="email"
                  value={email}
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
                  value={password}
                  placeholder="password"
                  className="rounded-lg px-2 py-1"
                />
              </label>
              <label htmlFor="First Name">
                <p className="text-white">First Name</p>
                <input
                  onChange={(e) => setFname(e.target.value)}
                  required
                  type="text"
                  name="first name"
                  value={fname}
                  placeholder="First name"
                  className="rounded-lg px-2 py-1"
                />
              </label>
  
              <label htmlFor="First Name">
                <p className="text-white">Last Name</p>
                <input
                  onChange={(e) => setLname(e.target.value)}
                  required
                  type="text"
                  name="last name"
                  value={lname}
                  placeholder="Last name"
                  className="rounded-lg px-2 py-1"
                />
              </label>
  
              <label htmlFor="First Name">
                <p className="text-white">Country</p>
                <input
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  type="text"
                  name="country"
                  value={country}
                  placeholder="Country"
                  className="rounded-lg px-2 py-1"
                />
              </label>
  
              <label htmlFor="City">
                <p className="text-white">City</p>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  required
                  type="text"
                  name="city"
                  value={city}
                  placeholder="City"
                  className="rounded-lg px-2 py-1"
                />
              </label>
  
              <label htmlFor="First Name">
                <p className="text-white">Contact</p>
                <input
                  onChange={(e) => setContact(e.target.value)}
                  required
                  type="number"
                  name="contact"
                  value={contact}
                  placeholder="Contact"
                  className="rounded-lg px-2 py-1"
                />
              </label>
  
  
              <button className="p-1 bg-cyan-500 rounded-2xl text-white" type="submit">Sign Up</button>
            </form>
            <p className="text-white mt-4">
              Already have an account? <a href="/signin" className="text-cyan-300">Login</a>
            </p>
  
  
          </div>
  
        </div>
      </div>);
}

export default SignupPage;