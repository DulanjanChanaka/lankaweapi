"use client"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { auth, db } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

function ProfilePage() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [userCountry, setUserCountry] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userName, setUserName] = useState("");
  const [itemPosts, setItemPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
        const timer = setTimeout(() => {
          if (user == null) router.push("/signin");
        }, 3000);
    
        return () => {
          clearTimeout(timer);
        };
      }, [user]);

  useEffect(() => {
    if (user) {
      setUserCountry(user.country);
      setUserUid(user.uid);
      setUserName(user.fname);
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Call the Firebase sign-out method
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };



  useEffect(() => {
    const fetchItemPost = async () => {
      try {
        const itemPostQuery = query(collection(db, "shop"), where("userUid", "==", userUid));
        const itemPostCollection = await getDocs(itemPostQuery);
        const itemPostData = itemPostCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItemPosts(itemPostData);
      } catch (error) {
        console.error("Error fetching item posts:", error);
      }
    };
    if (userUid) {
      fetchItemPost();
    }
  }, [userUid]);

  const deleteItemPost = async (postId) => {
    try {
      await deleteDoc(doc(db, "shop", postId));
      setItemPosts((prevItemPosts) => prevItemPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting item post:", error);
    }
  };

  return (
    <div className="px-5 w-full h-screen">
      {user ? (
        <div>
          <h1 className="text-center text-base font-bold mb-10 bg-slate-400 px-2 py-2 rounded-2xl">
            Welcome {userName}
          </h1>
          {/* {userCountry && (
            <p className="mb-10 left-0 text-center w-64 py-2 bg-amber-600 text-white rounded-2xl">
              {userCountry}
            </p>
          )} */}

          <h3 className="text-center font-bold">My Posts</h3>

          {itemPosts.length > 0 ? (
            itemPosts.map((item) => (
              <div key={item.id} className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 shadow-xl">
                <img src={item.imagelink} alt={item.location} className="w-full h-[150px] object-cover" />
                <div className="p-3 md:p-6 sm:p-3">
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">Item Location: {item.location}</p>
                  <p className="text-gray-600 text-sm mb-2">Item Condition: {item.condition}</p>

                  <button
                    onClick={() => deleteItemPost(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-4 rounded "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No post here</p>
          )}

          <div className="fixed bottom-3 left-5 ">
            <button
              className="p-2 mt-20 bg-blue-400 rounded-lg shadow-lg"
              onClick={handleSignOut}
            >
              Sign Out
            </button>

          </div >



        </div>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </div>
  );
}

export default ProfilePage;

