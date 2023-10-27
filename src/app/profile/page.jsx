"use client"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { auth, db } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { addDoc } from 'firebase/firestore';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cno, setCno] = useState("")
  const [message, setMessage] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'contact'), {
        name,
        email,
        cno,
        message,



      });
      console.log('Document written with ID: ', docRef.id);
      // Reset form fields
      setName('');
      setEmail("")
      setMessage('')
      setCno('')

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };


  return (
    <div className="px-5 w-full h-screen">
      {user ? (
        <div>
          <h1 className="text-center text-base font-bold mb-10 bg-slate-400 px-2 py-2 rounded-2xl">
            Welcome {userName}
          </h1>
          <div className=" flex flex-row justify-between">
            <button className="text-center text-base font-bold mb-10 bg-slate-400 px-2 py-2 rounded-2xl" onClick={openModal}>
              Feedback Us
            </button>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-80 lg:px-[100px] p-3 z-50">
                <div className="bg-white lg:w-[700px] p-4 w-full rounded-lg text-center">
                  <div className='col-span-3 w-full h-auto shadow-lg shadow-gray-400 rounded-xl lg:p-4'>
                    <div className='p-3'>
                      <form
                        onSubmit={handleSubmit}

                      >
                        <div className='grid md:grid-cols-2 gap-2 w-full  py-2'>
                          <div className='flex flex-col'>
                            <label className='uppercase text-sm py-1'>Name</label>
                            <input
                              className='border-2 rounded-lg p-1 flex border-gray-300'
                              type='text'
                              name='name'
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          <div className='flex flex-col'>
                            <label className='uppercase text-sm py-1'>
                              Phone Number
                            </label>
                            <input
                              className='border-2 rounded-lg p-1 flex border-gray-300'
                              type='text'
                              name='phone'
                              value={cno}
                              onChange={(e) => setCno(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className='flex flex-col py-2'>
                          <label className='uppercase text-sm py-1'>Email</label>
                          <input
                            className='border-2 rounded-lg p-1 flex border-gray-300'
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className='flex flex-col py-2'>
                          <label className='uppercase text-sm py-1'>Message</label>
                          <textarea
                            className='border-2 rounded-lg p-1 border-gray-300'
                            rows='5'
                            name='message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <button className='w-full p-4 rounded-2xl text-white  bg-blue-500 mt-4'>
                          Send Message
                        </button>
                      </form>

                    </div>


                  </div>

                  <div className="flex justify-end pt-5">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}



            {userCountry && (
              <p className="text-center text-base font-bold mb-10 bg-slate-400 px-2 py-2 rounded-2xl">
                {userCountry}
              </p>
            )}
          </div>

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

