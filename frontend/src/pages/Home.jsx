import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Welcome to SRANALYTICS APP</h2>
      <div className="flex space-x-4 mb-8">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Register
        </Link>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Section 1: About */}
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-gray-700">
              Learn about SRANALYTICS APP and its features.
            </p>
            <Link
              to="https://sranalytics.io/about-us/"
              target="_blank"
              className="mt-4 block text-blue-500 hover:text-blue-700"
            >
              Learn More
            </Link>
          </div>
          {/* Section 2: Services */}
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <p className="text-gray-700">
              Explore the services offered by SRANALYTICS APP.
            </p>
            <Link
              to="https://sranalytics.io/analytics-consulting/marketing-analytics/"
              target="_blank"
              className="mt-4 block text-blue-500 hover:text-blue-700"
            >
              View Services
            </Link>
          </div>
          {/* Section 3: Contact */}
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-700">
              Get in touch with us for any queries or assistance.
            </p>
            <Link
              to="https://sranalytics.io/contact-us/"
              target="_blank"
              className="mt-4 block text-blue-500 hover:text-blue-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
