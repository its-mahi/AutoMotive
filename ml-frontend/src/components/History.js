import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useUser } from "@clerk/clerk-react";


function History() {
  const [history, setHistory] = useState([]);
  const { isSignedIn, user, isLoaded } = useUser();

  const userId = user.id;

  useEffect(() => {
    axios.get(`http://localhost:3001/api/history/${userId}`)
      .then(response => setHistory(response.data))
      .catch(error => console.error('Error fetching history:', error));
  }, [userId]);

  return (
    <div className='mt-[100px] text-white'>
      <h1 className="heading mt-20 font-['Rubik'] font-bold">History</h1>

      <ul>
        {history.map(item => (
          <li key={item._id}>
            <div className='flex flex-auto justify-center'>
                <div className='mx-10 w-[500px]'>
                    <h2 className="font-['Rubik'] font-bold my-3">Input Video : </h2>
                    <video width="640" height="360" controls>
                        <source src={item.inputVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className='mx-10 w-[500px]'>
                    <h2 className="font-['Rubik'] font-bold my-3">Output Video : </h2>
                    <video width="640" height="360" controls>
                        <source src={item.outputVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

            </div>
            <div className='mt-10 mb-10 h-[2px] w-full bg-white rounded-md'></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import { clerkClient } from "@clerk/clerk-react";


// function History() {
//   const [inputVideo, setInputVideo] = useState('');
//   const [output, setOutput] = useState('');
//   const [userHistory, setUserHistory] = useState([]);
//   const [userId, setUserId] = useState(''); // Assume you have a way to get the userId
  

//   useEffect(() => {
//     // Fetch user history when component mounts
//     fetchUserHistory();
//   }, []);

//   const fetchUserHistory = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/api/user/history/${userId}`);
//       setUserHistory(response.data);
//     } catch (error) {
//       console.error('Error fetching user history:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log(clerkClient.users.getUser("user_2dfKjZTlfVLDI67Fug6BgS1iaxt"));

//     try {
//       const response = await axios.post('http://localhost:3001/api/user/history/', {
//         userId,
//         inputVideo,
//         output
//       });
//       console.log('User history added:', response.data);

//       // Refresh user history after adding new entry
//       fetchUserHistory();

//       // Clear input fields
//       setInputVideo('');
//       setOutput('');
//     } catch (error) {
//       console.error('Error adding user history:', error);
//     }
//   };

//   return (
//     <div className='text-sky-500'>
//       <h1>User History</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Input Video:
//           <input
//             type="text"
//             value={inputVideo}
//             onChange={(e) => setInputVideo(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Output:
//           <input
//             type="text"
//             value={output}
//             onChange={(e) => setOutput(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Add User History</button>
//       </form>
//       <h2>History:</h2>
//       <ul>
//         {userHistory.map((historyItem, index) => (
//           <li key={index}>
//             <strong>Input Video:</strong> {historyItem.inputVideo}, <strong>Output:</strong> {historyItem.output}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default History
