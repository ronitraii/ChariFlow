import DonationCard from './DonationCard';
import { useRequests} from '../context/RequestsContext'; // adjust path as needed

const RequestFeed = () => {
  const { requests } = useRequests();


  return (
    <div>
      {requests.length === 0 ? (
        <p>No requests available.</p>
      ) : (
        requests.map(request => (
          <DonationCard key={request.id} request={request} />
        ))
      )}
    </div>
  );
};

export default RequestFeed;
