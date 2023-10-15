import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore'; // Import Firebase Firestore functions (update this import based on your project setup)
import { db } from '../../firebase/firebase';


const AddReturn = ({ onClose }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [cno, setCno] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and reloading the page

    try {
      
      // Assuming 'db' is your Firestore database instance
      const docRef = await addDoc(collection(db, 'return'), {
        name: name,
        location: location,
        date: date,
        cno: cno,
      });

      console.log('Document written with ID: ', docRef.id);

      // Reset form fields
      setName('');
      setLocation('');
      setDate('');
      setCno('');
      // Close the modal
      window.alert('Form submitted successfully.');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className='p-3 overflow-hidden'>
    <div className='text-center font-medium mb-3'>
      <h3>Add Your Details</h3>
    </div>
  
    <div className='flex flex-col mb-3'>
      <label>Your Name</label>
      <input
        type='text'
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='border-b border-solid'
      />
    </div>
  
    <div className='flex flex-col mb-3'>
      <label>Your City</label>
      <input
        type='text'
        placeholder="Enter city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className='border-b border-solid'
      />
    </div>
  
    <div className='flex flex-col mb-3'>
      <label>Contact No</label>
      <input
        type='text'
        placeholder="Enter contact no"
        value={cno}
        onChange={(e) => setCno(e.target.value)}
        className='border-b border-solid'
      />
    </div>
  
    <div className='flex flex-col mb-3'>
      <label>Date</label>
      <input
        type='date'
        placeholder="Enter date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className='border-b border-solid'
      />
    </div>
  
    <button className='p-2 bg-cyan-500 rounded-xl mt-3' onClick={handleFormSubmit}>
      Submit
    </button>
  </div>
  
  );
};

export default AddReturn;