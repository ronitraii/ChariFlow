import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequests } from '../../context/RequestsContext';

const VolunteerDashboard = () => {
  const { verificationRequests, approveRequest, rejectRequest } = useRequests();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleApprove = (id) => {
    const success = approveRequest(id);
    if (!success) {
      setError('Error approving request.');
    } else {
      setError('');
      alert('✅ Request approved!');
    }
  };

  const handleReject = (id) => {
    const success = rejectRequest(id);
    if (!success) {
      setError('Error rejecting request.');
    } else {
      setError('');
      alert('❌ Request rejected!');
    }
  };

  const handleJoinChat = (id) => {
    navigate(`/chat/${id}`);
  };

  if (!verificationRequests || verificationRequests.length === 0) {
    return (
      <div className="text-center mt-12 text-gray-600 text-lg">
        No requests pending verification.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 font-sans bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Volunteer Dashboard – Verify Requests
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 font-medium text-center py-2 rounded mb-4">
          {error}
        </div>
      )}

      {verificationRequests.map((req) => (
        <div
          key={req.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8 transition duration-300 hover:shadow-md"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-3">{req.title}</h3>

          <div className="space-y-2 text-gray-700 text-sm sm:text-base">
            <p><span className="font-medium">City:</span> {req.city}</p>
            <p><span className="font-medium">Category:</span> {req.category}</p>
            <p><span className="font-medium">Description:</span> {req.desc}</p>
            <p><span className="font-medium">Goal:</span> {req.goal}</p>
            <p><span className="font-medium">Urgency:</span> {req.urgency}</p>
            <p><span className="font-medium">Timeline:</span> {req.timeline}</p>
            <p><span className="font-medium">Beneficiaries:</span> {req.beneficiaries}</p>
          </div>

          <h4 className="mt-6 mb-2 text-indigo-500 font-semibold text-lg">
            Verification Details:
          </h4>
          <div className="space-y-2 text-gray-700 text-sm sm:text-base">
            <p><span className="font-medium">Organizer:</span> {req.verificationData?.organizer}</p>
            <p><span className="font-medium">Organizer Role:</span> {req.verificationData?.organizerRole}</p>
            <p><span className="font-medium">NIC Number:</span> {req.verificationData?.nicNumber}</p>

            {req.verificationData?.nicImage && (
              <img
                src={req.verificationData.nicImage}
                alt="NIC"
                className="w-48 h-auto mt-2 rounded border border-gray-300"
              />
            )}

            <p><span className="font-medium">Contact:</span> {req.verificationData?.contactNumber}</p>
            <p><span className="font-medium">Address:</span> {req.verificationData?.address}</p>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => handleApprove(req.id)}
              className="bg-green-100 hover:bg-green-200 text-green-700 font-medium px-5 py-2 rounded-lg border border-green-300 transition"
            >
              ✅ Approve
            </button>
            <button
              onClick={() => handleReject(req.id)}
              className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-5 py-2 rounded-lg border border-red-300 transition"
            >
              ❌ Reject
            </button>
            <button
              onClick={() => handleJoinChat(req.id)}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium px-5 py-2 rounded-lg border border-indigo-300 transition"
            >
              💬 Join Chat
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VolunteerDashboard;
