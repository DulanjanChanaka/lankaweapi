"use client"
import React, { useState } from 'react';
import { db, storage } from '../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

function SellItem() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState(' ')
    const [location, setLocation] = useState(' ')
    const [description, setDescription] = useState('');
    const [cno, setCno] = useState('');
    const [condition, setCondition] = useState('');
    const [price, setPrice] = useState('');
    const [uploading, setUploading] = useState(false);
    const [formError, setFormError] = useState('');
    const [image, setImage] = useState(null);
    const [imagelink, setImagelink] = useState('');

    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImage(imageUrl);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            setFormError('Please select an image before uploading.');
            return;
        }

        setUploading(true);

        // Use a reference to Firebase Storage
        const storageRef = ref(storage, '' + Date.now()); // You can adjust the path as needed

        try {
            const response = await fetch(image);
            const blob = await response.blob();

            // Upload the blob to the storageReference
            await uploadBytesResumable(storageRef, blob).then(() => {
                getDownloadURL(storageRef).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUploading(false);
                    console.log('Photo uploaded!');
                    setImagelink(downloadURL);
                    console.log(downloadURL);
                    console.log(imagelink)// Move this line inside the .then() block
                });
            });
        } catch (error) {
            console.error('Error uploading image: ', error);
            setUploading(false);
            console.log('Error uploading image', 'An error occurred while uploading the image.');
        }
    };


    const handleFormSubmit = async () => {
        if (!image) {
            setFormError('All fields and the image are required.');
            return;
        }

        setFormError('');

        try {
            const docRef = await addDoc(collection(db, 'shop'), {
                name,
                title,
                description,
                condition,
                cno,
                location,
                price,
                imagelink,
            });

            console.log('Document written with ID: ', docRef.id);
            setName('');
            setTitle('');
            setDescription('normal');
            setCondition('');
            setCno('');
            setLocation('');
            setPrice('');
            setImagelink('');


            // Handle form submission or other actions as needed
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div className=' p-3 overflow-hidden'>
            <div>
                <div className='  text-center font-medium mb-3'>
                <h3 >Add Your Item</h3>

                </div>
                
            <div className='flex flex-col mb-3'>
                    <label>Title</label>
                    <input
                    className='border-b border-solid'
                        type='text'
                        placeholder="Enter your name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>




                <div className='flex flex-col mb-3'>
                    <label>Name</label>
                    <input
                   
                        type='text'
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>

               

                <div className='flex flex-col mb-3'>
                    <label>Description</label>
                    <input
                        type='text'
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>

                <div className='flex flex-col mb-3'>
                    <label>Condition</label>
                    <input
                        type='text'
                        placeholder="Enter condition"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                    ></input>
                </div>

                <div className='flex flex-col mb-3'>
                    <label>Location</label>
                    <input
                        type='text'
                        placeholder="Your Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    ></input>
                </div>

                <div className='flex flex-col mb-3'>
                    <label>Price</label>
                    <input
                        type='text'
                        placeholder="Enter Title"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></input>
                </div>

                <div className='flex flex-col mb-3'>
                    <label>Contact</label>
                    <input
                        type='number'
                        placeholder="Contact Nomber"
                        value={cno}
                        onChange={(e) => setCno(e.target.value)}
                    ></input>
                </div>
                <div >
                    <div className='flex flex-col mb-3'>
                    <label className='pb-2'>Choose Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    </div>
                 
                    <div>
                        {image && <img src={image} style={{ width: 200, height: 200 }} />}
                    </div>
                    {formError && <p >{formError}</p>}
                    {uploading && <div className="loader"></div>}
                    <div className='flex flex-col mb-3'>
                    <button className='p-1 mt-3 border-2 rounded-lg outline-gray-600 ' onClick={uploadImage}>Upload Image</button>
                    <button className='p-2 bg-cyan-500 rounded-xl mt-5'onClick={handleFormSubmit}>Submit</button>

                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default SellItem;
