// import React from 'react'

// const Explore = () => {
//   return (
//   <div className='h-screen w-screen bg-gray-400 justify-center items-center'>
//         <div className='relative left-4 top-[200px]'>
//         <h1 className='font-sans font-semibold text-6xl text-black justify-center text-center'>
//             No Issues Posted Here!
//         </h1>

//         </div>
        
//     </div>
//   )
// }

// export default Explore
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faLocation } from "@fortawesome/free-solid-svg-icons";


const Explore = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/issues/`);
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
        toast.error('Failed to load issues');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <ClipLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className='h-screen w-full bg-gray-100 flex justify-center items-center'>
        <h1 className='font-sans font-semibold text-4xl text-gray-700'>
          No Issues Posted Yet!
        </h1>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-3xl font-bold text-center mb-8'>Reported Issues</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
        {issues.map((issue) => (
          <div key={issue._id} className='bg-white rounded-lg shadow-md overflow-hidden'>
            {issue.photo && (
              <img 
                src={issue.photo} 
                alt={issue.title} 
                className='w-full h-48 object-cover'
              />
            )}
            <div className='p-4'>
              <h2 className='text-xl font-semibold mb-2'>{issue.title}</h2>
              <p className='text-gray-600 mb-2'>{issue.description}</p>
              <div className='flex justify-between text-sm text-gray-500'>
                <span><faLocation/> {issue.location}</span>
                <span>📅 {new Date(issue.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
