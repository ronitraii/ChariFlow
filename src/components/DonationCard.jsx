import { Calendar, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserRole } from '../context/UserRoleContext';

const DonationCard = ({ request }) => {
  const { id, title, city, desc, image, category, date } = request;
  const { role } = useUserRole();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto overflow-hidden">
      {/* Image */}
      <div className="h-48 overflow-hidden group">
        <img
          src={image || "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg"}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center gap-2 text-purple-600 font-medium text-sm mb-3">
          <Tag className="w-4 h-4" />
          <span>{category}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
          <MapPin className="w-4 h-4" />
          <span>{city}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
          <Calendar className="w-4 h-4" />
          <span>{date || "Posted today"}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-base leading-relaxed mb-4">{desc}</p>

        {/* Action Button */}
        <Link
          to={`/requests/${id}`}
          className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium py-2 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          {role === 'donor' ? 'Support this cause' : 'Request for this donation'}
        </Link>
      </div>
    </div>
  );
};

export default DonationCard;
