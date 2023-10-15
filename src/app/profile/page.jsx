"use client"
// ProfilePage.js
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext'; 
import { auth } from '../../../firebase/firebase';  // Import your Firebase authentication object
import { useRouter } from "next/navigation";
function ProfilePage() {
  const { user, country } = useContext(AuthContext);
  const router = useRouter()
 useEffect(() => {
    if (user == null) router.push("/signin")
}, [user])

console.log(user)

  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
     // Call the Firebase sign-out method
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome to your profile page</h1>
          <p>Email: {user.email}</p>
          {user.country && <p>Country: {user.country}</p>}
          <button className='p-2 bg-blue-400 rounded-lg shadow-lg' onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </div>
  );
}

export default ProfilePage;

