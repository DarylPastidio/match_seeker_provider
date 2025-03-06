import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMatches } from "../api/matches";
import StarRatingComponent from "react-star-rating-component";

const Dashboard = () => {
  const { token } = useAuth();
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set how many matches per page

  useEffect(() => {
    if (token) {
      getMatches(token).then((response) => setMatches(response.data.matches));
    }
  }, [token]);

  // Calculate total pages
  const totalPages = Math.ceil(matches.length / itemsPerPage);

  // Get matches for the current page
  const currentMatches = matches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-medium mb-4">Your Matches</h2>
        <ul className="space-y-4">
          {currentMatches.length > 0 ? (
            currentMatches.map((match, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded-lg flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-medium">{match.email}</span>
                  <span className="text-sm text-gray-600">
                    {match.industry} - {match.location}
                  </span>
                  {match.role === "provider" ? (
                    <div>
                      <label className="font-medium text-gray-700">
                        Services
                      </label>
                      <div className="flex flex-wrap">
                        {match.services_offered?.map(
                          (item, index) =>
                            !!item.value && (
                              <div
                                key={index + 5000}
                                className="bg-gray-300 px-2 py-1 rounded-full mx-1"
                              >
                                {item.value}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex mt-2">
                      <label
                        htmlFor="Services"
                        className="font-medium text-gray-700 mr-2"
                      >
                        Credit Rating
                      </label>
                      <StarRatingComponent
                        name="rating"
                        starCount={10}
                        value={match.credit_rating / 10}
                      />
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No matches available</p>
          )}
        </ul>

        {/* Pagination Controls */}
        {matches.length > itemsPerPage && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <span className="text-lg font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
