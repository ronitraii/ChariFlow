// import React, { createContext, useState, useContext } from 'react';

// const RequestsContext = createContext();

// export const RequestsProvider = ({ children }) => {



//   const [requests, setRequests] = useState([
//     {
//       id: 1,
//       title: "Need Books for Students",
//       city: "Sukkur City",
//       desc: "Help provide essential school books for Grade 5 students from low-income families.",
//       category: "Education",
//       image: "https://images.pexels.com/photos/256517/pexels-photo-256517.jpeg",
//       fullDescription: "Our local elementary school is facing a critical shortage of textbooks...",
//       goal: 1000,
//       raised: 650,
//       supporters: 23,
//       organizer: "Sarah Johnson",
//       organizerRole: "School Principal",
//       urgency: "High",
//       beneficiaries: "40 Grade 5 students",
//       timeline: "Books needed by next month",
//       accounts: [
//         {
//           platform: "JazzCash",
//           accountNumber: "03001234567",
//           accountHolderName: "Sarah Johnson"
//         }
//       ]
//     },
//     // Add more requests if needed
//   ]);

//   const addRequest = (newRequest) => {
//     if (requests.some(req => req.id === newRequest.id)) {
//       console.warn('Request ID already exists:', newRequest.id);
//       return false;
//     }
//     setRequests(prev => [...prev, newRequest]);
//     return true;
//   };

//   return (
//     <RequestsContext.Provider value={{ requests, addRequest }}>
//       {children}
//     </RequestsContext.Provider>
//   );
// };

// // Custom hook
// export const useRequests = () => useContext(RequestsContext);




import React, { createContext, useState, useContext, useEffect } from 'react';

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: loading indicator
  const [error, setError] = useState(null);     // Optional: error tracking

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/requests'); // Adjust URL as needed
        const data = await response.json();
        if (response.ok) {
          setRequests(data);
        } else {
          setError(data.message || 'Failed to fetch requests');
        }
      } catch (err) {
        console.error('Failed to fetch requests:', err);
        setError('Server error while fetching requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const addRequest = (newRequest) => {
    if (requests.some(req => req.id === newRequest.id)) {
      console.warn('Request ID already exists:', newRequest.id);
      return false;
    }
    setRequests(prev => [...prev, newRequest]);
    return true;
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, loading, error }}>
      {children}
    </RequestsContext.Provider>
  );
};

// Custom hook
export const useRequests = () => useContext(RequestsContext);
