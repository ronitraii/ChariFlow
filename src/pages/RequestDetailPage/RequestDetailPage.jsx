import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import {
  ArrowLeft, Calendar, MapPin, Tag,
  Heart, Share2, Users, Target
} from 'lucide-react';
import DonationForm from '../../components/DonationForm';
import { useRequests } from '../../context/RequestsContext'; // adjust path as needed

const RequestDetailPage = () => {
  const { id } = useParams();
  const { requests } = useRequests(); // get requests from context
  const request = requests.find(req => req.id === parseInt(id));
  const progressPercentage = request ? (request.raised / request.goal) * 100 : 0;

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleStartChat = () => {
    navigate(`/chat/${id}`);
  };

  if (!request) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">Request Not Found</h1>
        <Link to="/donate" className="text-purple-400 underline font-semibold">
          Back to Donations
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/donate" className="inline-flex items-center gap-2 mb-6 text-purple-400 font-bold">
          <ArrowLeft size={16} /> Back to Donations
        </Link>

        <div className="flex flex-wrap gap-6">
          {/* LEFT SECTION */}
          <div className="flex-1 min-w-[60%] flex flex-col gap-6">
            <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <img src={request.image} alt={request.title} className="w-full h-72 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Tag size={16} />
                  <span className="text-sm font-semibold text-purple-300">{request.category}</span>
                  <span
                    className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold
                      ${request.urgency?.toLowerCase() === 'critical' ? 'bg-red-900 text-red-100'
                      : request.urgency?.toLowerCase() === 'high' ? 'bg-yellow-900 text-yellow-100'
                      : 'bg-emerald-900 text-emerald-100'}`}>
                    {request.urgency} Priority
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-3">{request.title}</h1>
                <div className="flex gap-6 text-gray-400 text-sm mb-5">
                  <span className="flex items-center gap-1"><MapPin size={16} /> {request.city}</span>
                  <span className="flex items-center gap-1"><Calendar size={16} /> Posted today</span>
                  <span className="flex items-center gap-1"><Users size={16} /> {request.supporters} supporters</span>
                </div>

                {/* PROGRESS */}
                <div className="mt-4">
                  <div className="flex justify-between font-bold">
                    <span>${request.raised}</span>
                    <span>of ${request.goal} goal</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-300 mt-2">{progressPercentage.toFixed(0)}% funded</div>
                </div>
              </div>
            </div>

            {/* ABOUT THIS REQUEST */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">About This Request</h2>
              <p className="mb-6">{request.fullDescription}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold flex items-center gap-2"><Target size={16} /> Beneficiaries</h4>
                  <p>{request.beneficiaries}</p>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2"><Calendar size={16} /> Timeline</h4>
                  <p>{request.timeline}</p>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2"><Heart size={16} /> Organizer</h4>
                  <p>{request.organizer}</p>
                  <small>{request.organizerRole}</small>
                </div>
              </div>
            </div>

            {/* SHARE */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-2">Help Spread the Word</h3>
              <p className="mb-4">Share this request with your friends and family to help us reach our goal faster.</p>
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-4 py-2 rounded-md">
                <Share2 size={16} /> Share This Request
              </button>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="flex-1 min-w-[30%] space-y-6">
            <DonationForm />

            <div className="mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 w-full text-white font-semibold py-2 px-4 rounded">
                I have an item to donate
              </button>
            </div>

            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                <div className="bg-white text-black p-6 rounded-md max-w-md w-full text-center">
                  <h3 className="text-lg font-bold mb-2">Start a Chat?</h3>
                  <p>This will start a chat with the requestor and a volunteer. Do you want to continue?</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={handleStartChat}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Yes, Start Chat
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
