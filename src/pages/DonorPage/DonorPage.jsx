import React, { useState } from 'react';
import RequestFeed from '../../components/RequestFeed';
import DonationForm from '../../components/DonationForm';
import DonateSomethingElse from '../../components/DonateSomethingElse';

function DonorPage() {
  const [view, setView] = useState('default'); // 'default' | 'donationForm' | 'somethingElse'

  return (
    <div className="pt-20 bg-gray-50 min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Show RequestFeed only in default view */}
        {view === 'default' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <RequestFeed />
          </div>
        )}

        {/* Show DonationForm in both default and donationForm view */}
        {(view === 'default' || view === 'donationForm') && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <DonationForm
              onCustomDonationClick={() => setView('somethingElse')}
              onInteract={() => setView('donationForm')}
            />
          </div>
        )}

        {/* Show custom donation form */}
        {view === 'somethingElse' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <DonateSomethingElse onBack={() => setView('default')} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DonorPage;
