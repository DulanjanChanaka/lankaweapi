import React, { useState } from 'react';
import Navbar from './Navbar';

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-cover bg-center h-screen flex items-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/325193/pexels-photo-325193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
      <div className="text-white text-center md:pl-1 xl:pl-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to Lankawe Api Community</h1>
        <p className="text-lg mb-8">Discover amazing experiences with us.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={openModal}>
          Learn More
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-80">
          <div className="bg-white p-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Lankawe Api Community</h2>
            <p className="mb-4">
              විදෙස්ගතව සිටින අපගේ ශ්‍රී ලාංකිකයින්ගේ එකමුතුවකි. මෙය සම්පුර්ණයෙන්ම නොමිලේ සේවා සපයන web අඩවියකි .
              ඔබ මෙයට Register වීමෙන් ඇතුලත් වූ පසු මෙහි තිබෙන සියලු සේවා ලබා ගත හැක .
            </p>
            <br/>

            <p>
              මෙහි තිබෙන Return යන අංශයෙන් ඔබ ලංකාවට නැවත පිටත් වෙනවානම් එහි සටහනක් තැබිය හැක . එහිදී ඔබ මිතුරන්ට ඔබ මාර්ගයෙන් ලංකාවට භාණ්ඩයක් යැවීම වැනි උපකාරයක් කිරීමට හැක . එමෙන්ම මෙම web අඩවිය භාවිතයෙන් ලංකාවට නැවත යන අයව ඔබට පහසුවෙන් සම්බන්ද කර ගත හැක
            </p>
            <br/>

            <p>
              මෙහි ඇති shop යන අංශයෙන් ඔබගේ විකිනීමට ඇති භාණ්ඩයක් නොමිලේ පළකරගත හැක . එමෙන්ම එහි දැන්වීම් පළකර ඇති අයව සම්බන්ද කර ගැනීමෙන් ඔබට භාණ්ඩයක් මිලදී ගැනීමට පහසුව සැලසේ .
            </p>
            <div className="flex justify-end">
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
    </div>
  );
}

export default Hero;
