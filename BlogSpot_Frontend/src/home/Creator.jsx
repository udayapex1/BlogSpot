import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../utils';

const Creator = () => {
  const [pCreator, setpcreator] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/users/admins`);
        // console.log("Fetched Data:", data);
        setpcreator(data.admins || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCreators();
  }, []);

  return (
<div className="p-10 border-transparent rounded-xl w-[90%] mx-auto my-10 mt-40 mb-40 ">
  <h4 className="text-3xl font-bold mb-8 text-center text-black">Popular Creators</h4>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-black  max-w-screen-lg mx-auto">
    {pCreator.map((admin) => (
      <article
        key={admin._id}
        className="bg-white backdrop-blur-md shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-5 transform hover:scale-105 transition duration-300"
      >
        <div className="w-20 h-20 bg-gray-100 border-transparent rounded-full overflow-hidden text-black">
          <img
            src={admin.photo?.url || "https://via.placeholder.com/100"}
            alt={admin.userName}
            className="w-full h-full object-cover"
          />
        </div>
        <h5 className="text-lg font-medium mt-4 text-black">{admin.name || admin.userName}</h5>
        <p className="text-sm text-gray-600 mt-2">{admin.email}</p>
        <p className="bg-gray-100 p-2 rounded-full  text-sm text-gray-600 mt-2">{admin.profession}</p>

        
        
      </article>
    ))}
  </div>
</div>


  );
};

export default Creator;
