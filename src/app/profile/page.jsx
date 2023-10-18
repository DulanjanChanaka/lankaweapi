"use client"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { auth } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const { user } = useAuthContext();
  const router = useRouter();

  // Use useState to set and manage the user's country
  const [userCountry, setUserCountry] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userName, setUserName] = useState("");

  console.log(userUid)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user == null) router.push("/signin");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [user]);

  console.log(userCountry); // Log the user's country

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Call the Firebase sign-out method
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    // Assuming that user.country is set during authentication
    if (user) {
      setUserCountry(user.country);
    }
  }, [user]);

  useEffect(() => {
    // Assuming that user.country is set during authentication
    if (user) {
      setUserUid(user.uid);
    }
  }, [user]);

  useEffect(() => {
    // Assuming that user.country is set during authentication
    if (user) {
      setUserName(user.fname);
    }
  }, [user]);



  return (
    <div className="px-5">
      {user ? (
        <div >
          <h1 className="text-center text-base font-bold mb-10 bg-slate-400 px-2 py-2 rounded-2xl">Welcome {userName}</h1>
          
          {userCountry && <p className="mb-10 left-0 text-center w-64 py-2 bg-amber-600 text-white  rounded-2xl">{userCountry}</p>}
          <button
            className="p-2  bg-blue-400 rounded-lg shadow-lg"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </div>
  );
}

export default ProfilePage;

