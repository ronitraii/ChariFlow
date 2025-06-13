import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequests } from '../../context/RequestsContext';

const VerifyRequest = () => {
  const { addRequest } = useRequests();
  const navigate = useNavigate();
  const [nicImage, setNicImage] = useState(null);
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [accounts, setAccounts] = useState([
    { platform: '', accountNumber: '', accountHolderName: '' }
  ]);

  const handleAccountChange = (index, field, value) => {
    const updated = [...accounts];
    updated[index][field] = value;
    setAccounts(updated);
  };

  const addAccountField = () => {
    if (accounts.length < 4) {
      setAccounts([...accounts, { platform: '', accountNumber: '', accountHolderName: '' }]);
    }
  };

  const removeAccountField = (index) => {
    if (accounts.length > 1) {
      const updated = accounts.filter((_, i) => i !== index);
      setAccounts(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const request = JSON.parse(localStorage.getItem('pendingRequest'));
    if (!request) {
      setError("No pending request found.");
      return;
    }

    if (!nicImage || !contact || !address) {
      setError("All fields are required.");
      return;
    }

    const validAccounts = accounts.filter(acc =>
      acc.platform && acc.accountNumber && acc.accountHolderName
    );

    if (validAccounts.length === 0) {
      setError("Please enter at least one valid account for online donations.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64NIC = reader.result;

      const updatedRequest = {
        ...request,
        contact,
        address,
        nicImage: base64NIC,
        verified: false,
        verificationStatus: 'pending',
        submittedAt: new Date().toISOString(),
        accounts: validAccounts,
      };

      const success = addRequest(updatedRequest);
      if (!success) {
        setError("Request already exists or submission failed.");
        return;
      }

      const existing = JSON.parse(localStorage.getItem('pendingVerifications')) || [];
      localStorage.setItem('pendingVerifications', JSON.stringify([...existing, updatedRequest]));

      localStorage.removeItem('pendingRequest');
      alert("Your request has been submitted for verification.");
      navigate('/');
    };

    reader.readAsDataURL(nicImage);
  };

  return (
    <div className="max-w-lg mx-auto mt-20 mb-10 p-6 bg-white border border-gray-300 rounded-lg shadow-md font-sans">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Verify Your Request</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">Upload NIC/ID Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNicImage(e.target.files[0])}
            required
            className="text-black block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:border-gray-300 file:text-sm file:bg-gray-100 file:text-gray-700"
          />
        </div>

        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="text-black px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:border-blue-400"
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          rows={3}
          className="text-black px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring focus:border-blue-400"
        />

        <hr className="my-2" />
        <h4 className="text-lg font-medium text-black">Online Transaction Accounts (1–4)</h4>

        {accounts.map((account, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-2 text-gray-700">
            <select
              value={account.platform}
              onChange={(e) => handleAccountChange(index, 'platform', e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select Platform</option>
              <option value="JazzCash">JazzCash</option>
              <option value="Easypaisa">Easypaisa</option>
              <option value="SadaPay">SadaPay</option>
              <option value="NayaPay">NayaPay</option>
              <option value="Raast ID">Raast ID</option>
              <option value="IBAN">Bank IBAN</option>
            </select>

            <input
              type="text"
              placeholder="Account Number or IBAN"
              value={account.accountNumber}
              onChange={(e) => handleAccountChange(index, 'accountNumber', e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />

            <input
              type="text"
              placeholder="Account Holder Name"
              value={account.accountHolderName}
              onChange={(e) => handleAccountChange(index, 'accountHolderName', e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />

            {accounts.length > 1 && (
              <button
                type="button"
                onClick={() => removeAccountField(index)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {accounts.length < 4 && (
          <button
            type="button"
            onClick={addAccountField}
            className="text-blue-600 text-sm font-medium hover:underline self-start"
          >
            + Add Another Account
          </button>
        )}

        <hr className="my-2" />
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit for Verification
        </button>
      </form>
    </div>
  );
};

export default VerifyRequest;
