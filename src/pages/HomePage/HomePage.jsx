import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../../context/UserRoleContext';

function HomePage() {
  const navigate = useNavigate();
  const { setRole } = useUserRole();

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1740&q=80")' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-3xl text-white space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            Welcome to <span className="text-indigo-400">Chariflow</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
            A platform to give and receive with dignity. Help others or ask for help. Join us in making a difference.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 pt-4">
            <button
              onClick={() => {
                setRole('donor');
                navigate('/donate');
              }}
              className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300"
            >
              I Want to Donate
            </button>

            <button
              onClick={() => {
                setRole('taker');
                navigate('/donate');
              }}
              className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300"
            >
              I Need a Donation
            </button>
          </div>

          {/* Volunteer Button */}
          <div className="pt-6">
            <button
              onClick={() => navigate('/volunteer')}
              className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300"
            >
              Volunteer Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
