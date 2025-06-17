import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "../context/UserRoleContext"; // adjust path as needed

// Optional: Example DonationCard (not used in this component)
const DonationCard = ({ donation }) => (
  <div className="bg-white shadow rounded-lg p-4 mb-4">
    <h3 className="text-lg font-semibold">{donation.title}</h3>
    <p className="text-gray-600">{donation.description}</p>
    <p className="text-gray-800 font-bold">Amount: ${donation.amount}</p>
  </div>
);

const DonationForm = ({
  onCustomDonationClick,
  onInteract,
  availableDonations,
}) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const presetAmounts = [10, 25, 50, 100];

  const navigate = useNavigate();
  const { role, setRole } = useUserRole();

  useEffect(() => {
    if (!hasInteracted && (amount || message)) {
      onInteract();
      setHasInteracted(true);
    }
  }, [amount, message, onInteract, hasInteracted]);

  const handleBack = () => {
    setRole(null);
    navigate("/");
  };

  // If user is a taker
  if (role === "taker") {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <button
          onClick={handleBack}
          className="mb-4 text-blue-600 hover:underline flex items-center"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onCustomDonationClick}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          I want to request something else
        </button>
      </div>
    );
  }

  // If user is a donor
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <button
        onClick={handleBack}
        className="mb-4 text-blue-600 hover:underline flex items-center"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Make a Donation</h2>

      <label className="block text-gray-700 mb-2">Choose Amount</label>
      <div className="flex flex-wrap gap-3 mb-4">
        {presetAmounts.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setAmount(preset.toString())}
            className={`px-4 py-2 rounded border ${
              amount === preset.toString()
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            } transition`}
          >
            ${preset}
          </button>
        ))}
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter custom amount"
        aria-label="Custom donation amount"
        min="1"
        className="text-black w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="donation-message" className="block text-gray-700 mb-2">
        Leave a Message (Optional)
      </label>
      <textarea
        id="donation-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message of support..."
        className="w-full mb-4 p-2 border rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />

      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            if (amount) {
              let authUser =  JSON.parse(localStorage.getItem("authUser"))
              let token = authUser.token;
              
              let userId = authUser.userId;
              console.log('Token: ', token)
              console.log('userid: ', userId)
              // Call the api
              
              fetch("http://localhost:3000/api/donations/", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId: userId,
                  amount: parseFloat(amount),
                  message,
                }),
              })
                .then((data) => {
                  console.log(data)
                  if (data.status == 201) {
                    alert("Donation successful!");
                    setAmount("");
                    setMessage("");
                  } else {
                    alert("Donation failed. Please try again.");
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  alert("An error occurred. Please try again later.");
                });
            } else {
              alert("Please enter a donation amount.");
            }
          }}
          type="button"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Proceed to Payment
        </button>

        <button
          type="button"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Share with Friends
        </button>

        <button
          type="button"
          onClick={onCustomDonationClick}
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          I want to donate something else
        </button>
      </div>
    </div>
  );
};

export default DonationForm;
