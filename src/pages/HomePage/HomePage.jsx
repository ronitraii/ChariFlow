import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../../context/UserRoleContext';

function HomePage() {
  const navigate = useNavigate();
  const { setRole } = useUserRole();

  return (
    <div className="bg-gray-50 min-h-screen pt-20 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 animate-fade-in">
          Welcome to <span className="text-indigo-600">Chariflow</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          A platform to give and receive with dignity. Help others or ask for help.
        </p>

        {/* First row of buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => {
              setRole('donor');
              navigate('/donate');
            }}
            className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-xl text-base font-medium shadow-lg transition duration-300"
          >
            I Want to Donate
          </button>

          <button
            onClick={() => {
              setRole('taker');
              navigate('/donate');
            }}
            className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-xl text-base font-medium shadow-lg transition duration-300"
          >
            I Need a Donation
          </button>
        </div>

        {/* Volunteer button on next line */}
        <div className="mt-8">
          <button
            onClick={() => {
              navigate('/volunteer');
            }}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-base font-semibold shadow-lg transition duration-300"
          >
            Volunteer Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
