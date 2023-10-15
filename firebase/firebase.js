import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZmvCkJwpWEwoX7OZWM0pxzuF5nN4jcPo",
  authDomain: "lankaweapi-5dd02.firebaseapp.com",
  projectId: "lankaweapi-5dd02",
  storageBucket: "lankaweapi-5dd02.appspot.com",
  messagingSenderId: "909121741937",
  appId: "1:909121741937:web:3e416153a452a5717d27d0"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);
const auth = getAuth(app);

export { db, auth };