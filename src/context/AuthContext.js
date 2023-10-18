"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import CircularIndeterminate from "../components/CircularIndeterminate";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("auth state change");
      if (user) {
        // Fetch user's country information from Firestore
        const docRef = doc(db, "user", user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              console.log(userData);
              setUserData(userData);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user: userData, setUserData }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularIndeterminate />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

//custom hook for auth context
export const useAuthContext = () => useContext(AuthContext);
