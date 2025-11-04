import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { UserDataContext } from '../context/userContext'; // adjust path if needed

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';

const Explore = () => {
  const { user } = useContext(UserDataContext) ?? {};
  const userId = user?._id || user?.userId || null;

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votingIds, setVotingIds] = useState(new Set()); // optimistic lock

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${API}/issues`);
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

  const handleVote = async (issueId) => {
    if (votingIds.has(issueId)) return; // prevent double clicks
    setVotingIds(prev => new Set(prev).add(issueId));

    // optimistic update
    setIssues(prev =>
      prev.map(i => {
        if (i._id !== issueId) return i;
        const alreadyVoted = userId ? (i.voters || []).includes(userId) : false;
        return {
          ...i,
          votesCount: alreadyVoted ? Math.max(0, (i.votesCount || 1) - 1) : (i.votesCount || 0) + 1,
          // if voters array exists locally, update it too for UI toggle
          voters: userId ? (alreadyVoted ? (i.voters || []).filter(v => v !== userId) : [...(i.voters || []), userId]) : i.voters
        };
      })
    );

    try {
      const res = await axios.post(`${API}/issues/${issueId}/vote`, { userId });
      // apply authoritative values from server
      setIssues(prev => prev.map(i => (i._id === issueId ? { ...i, votesCount: res.data.votesCount, voters: res.data.voters } : i)));
    } catch (err) {
      console.error('Vote error', err);
      toast.error('Could not register vote');
      // rollback (simple: refetch single issue)
      try {
        const r = await axios.get(`${API}/issues`);
        setIssues(r.data);
      } catch (_) { /* ignore */ }
    } finally {
      setVotingIds(prev => {
        const s = new Set(prev);
        s.delete(issueId);
        return s;
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <ClipLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  if (!issues.length) {
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
        {issues.map((issue) => {
          const userVoted = userId ? (issue.voters || []).map(String).includes(String(userId)) : false;
          return (
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
                <div className='flex justify-between items-center text-sm text-gray-500 mb-3'>
                  <span className='flex items-center gap-2'><FontAwesomeIcon icon={faLocationDot} /> {issue.location}</span>
                  <span>📅 {issue.date ? new Date(issue.date).toLocaleDateString() : '—'}</span>
                </div>

                <div className='flex items-center justify-between'>
                  <button
                    onClick={() => handleVote(issue._id)}
                    disabled={votingIds.has(issue._id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition ${
                      userVoted ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{issue.votesCount || 0}</span>
                  </button>

                  <button
                    onClick={() => {/* optional: navigate to details */}}
                    className='text-sm text-blue-600 hover:underline'
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { ClipLoader } from 'react-spinners';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocation } from "@fortawesome/free-solid-svg-icons";


// const Explore = () => {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/issues/`);
//         setIssues(response.data);
//       } catch (error) {
//         console.error('Error fetching issues:', error);
//         toast.error('Failed to load issues');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIssues();
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen w-full flex justify-center items-center">
//         <ClipLoader color="#4A90E2" size={50} />
//       </div>
//     );
//   }

//   if (issues.length === 0) {
//     return (
//       <div className='h-screen w-full bg-gray-100 flex justify-center items-center'>
//         <h1 className='font-sans font-semibold text-4xl text-gray-700'>
//           No Issues Posted Yet!
//         </h1>
//       </div>
//     );
//   }

//   return (
//     <div className='min-h-screen bg-gray-100 p-6'>
//       <h1 className='text-3xl font-bold text-center mb-8'>Reported Issues</h1>
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
//         {issues.map((issue) => (
//           <div key={issue._id} className='bg-white rounded-lg shadow-md overflow-hidden'>
//             {issue.photo && (
//               <img 
//                 src={issue.photo} 
//                 alt={issue.title} 
//                 className='w-full h-48 object-cover'
//               />
//             )}
//             <div className='p-4'>
//               <h2 className='text-xl font-semibold mb-2'>{issue.title}</h2>
//               <p className='text-gray-600 mb-2'>{issue.description}</p>
//               <div className='flex justify-between text-sm text-gray-500'>
//                 <span><faLocation/> {issue.location}</span>
//                 <span>📅 {new Date(issue.date).toLocaleDateString()}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Explore;
