"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,

} from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import CircularIndeterminate from '../components/CircularIndeterminate'
import { doc, getDoc } from 'firebase/firestore';



export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
            // Fetch user's country information from Firestore
            const docRef = doc(db, 'user', user.uid);
            getDoc(docRef)
              .then((docSnap) => {
                if (docSnap.exists()) {
                  const userData = docSnap.data();
                  setUser({ ...user, country: userData.country });
                }
              })
              .catch((error) => {
                console.error('Error fetching user data:', error);
              });
          } else {
            setUser(null);
          }
          setLoading(false);
        });
    
        return () => unsubscribe();
      }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div className='flex justify-center items-center h-screen'><CircularIndeterminate /></div> : children}
        </AuthContext.Provider>
    );
};



// "use client"
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import {
//     onAuthStateChanged,

// } from 'firebase/auth';
// import { auth } from '../../firebase/firebase';
// import CircularIndeterminate from '../components/CircularIndeterminate'



// export const AuthContext = createContext({});

// export const useAuthContext = () => useContext(AuthContext);

// export const AuthContextProvider = ({
//     children,
// }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setUser(user);
//             } else {
//                 setUser(null);
//             }
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user }}>
//             {loading ? <div className='flex justify-center items-center h-screen'><CircularIndeterminate /></div> : children}
//         </AuthContext.Provider>
//     );
// };