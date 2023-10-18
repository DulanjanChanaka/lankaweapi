import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { useAuthContext } from '../context/AuthContext';

function ItemCard() {
    const [itemPosts, setItemPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useAuthContext();
    const [userCountry, setUserCountry] = useState("");

    useEffect(() => {
        // Assuming that user.country is set during authentication
        if (user) {
          setUserCountry(user.country);
          return;
        }
      }, [user]);
    useEffect(() => {
        const fetchItemPost = async () => {
            if (!user || !user.country) {
                // Handle the case where user or user.country is undefined or falsy, for example, show an error message or return early.
                console.error('User or user country is missing or invalid');
                return;
            }
            const country = user.country;
            console.log("my country",country)
            try {
                const itemPostQuery = query(collection(db, 'shop'), where('userCountry', '==', country));
                const itemPostCollection = await getDocs(itemPostQuery);
                const itemPostData = itemPostCollection.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItemPosts(itemPostData);
            } catch (error) {
                console.error('Error fetching item posts:', error);
            }
        };
        fetchItemPost();
    }, [user]);
    

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {itemPosts.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                    >
                        <img
                            src={item.imagelink}
                            alt={item.location}
                            className="w-full h-[full] object-cover"
                        />
                        <div className="p-3 md:p-6 sm:p-3">
                            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                            <p className="text-gray-600 text-sm  mb-2">
                                Item Location: {item.location}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                                Item Condition: {item.condition}
                            </p>
                         
                            <button
                                onClick={() => {
                                    setSelectedPost(item);
                                    setModalVisible(true);
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-4 rounded"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalVisible && selectedPost && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="modal-bg fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
                    <div className="modal-container bg-white w-3/4 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <h2 className="text-2xl font-semibold mb-2">
                                {selectedPost.title}
                            </h2>
                            {selectedPost.imagelink && (
                                <img
                                    src={selectedPost.imagelink}
                                    alt={selectedPost.place}
                                    className="w-full h-[full] object-cover mb-4"
                                />
                            )}

                            <p className="text-gray-600 text-sm mb-2">
                                Post Owner: {selectedPost.name}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                                Poster Contact: {selectedPost.cno}
                            </p>
                            <p className="text-gray-600 text-sm mb-4">
                                Description: {selectedPost.description}
                            </p>
                            <p className="text-gray-600 text-sm mb-4">
                                Condition: {selectedPost.condition}
                            </p>
                            <p className="text-gray-600 text-sm mb-4">
                                Location: {selectedPost.location}
                            </p>
                            <p className="text-gray-600 text-sm mb-4">
                                Price: {selectedPost.price}
                            </p>
                            <button
                                onClick={() => setModalVisible(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemCard;
