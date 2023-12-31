import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { useAuthContext } from '../context/AuthContext';

function ReturnCard() {
    const [personPost, setPersonPost] = useState([]);
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
        const fetchPersonPost = async () => {
            if (!user || !user.country) {
                // Handle the case where user or user.country is undefined or falsy, for example, show an error message or return early.
                console.error('User or user country is missing or invalid');
                return;
            }
            const country = user.country;
            console.log("my country", country)
            try {
                const returnPostQuery = query(collection(db, 'return'), where('userCountry', '==', country));
                const returnPostCollection = await getDocs(returnPostQuery);
                const returnPostData = returnPostCollection.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPersonPost(returnPostData);
            } catch (error) {
                console.error('Error fetching item posts:', error);
            }
        };
        fetchPersonPost();
    }, []);

    const todayDate = new Date().toISOString().split('T')[0];
    console.log(todayDate)

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {personPost.map((item) => {
                    // Check if the item's date is equal to today's date
                    const isToday = item.date > todayDate;

                    return isToday ? (
                        <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">

                            <div className="p-6">
                                <h2 className="text-xl font-semibold">{item.date}</h2>
                                <p className="text-gray-600 text-sm mb-3">City: {item.location}</p>
                                <button
                                    onClick={() => {
                                        setSelectedPost(item);
                                        setModalVisible(true);
                                    }}
                                    className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 mt-4 rounded"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ) : null;
                })}
            </div>

            {modalVisible && selectedPost && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="modal-bg fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
                    <div className="modal-container bg-white w-3/4 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <h2 className="text-2xl font-semibold mb-2">
                                {selectedPost.date}
                            </h2>


                            <p className="text-gray-600 text-sm mb-2">
                                Post Owner: {selectedPost.name}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                                Poster Contact: {selectedPost.cno}
                            </p>
                            <p className="text-gray-600 text-sm mb-4">
                                Description: {selectedPost.location}
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

export default ReturnCard;
