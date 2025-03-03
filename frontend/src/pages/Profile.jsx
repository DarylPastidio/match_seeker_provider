import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfile } from "../api/profile";
import Select from "react-select";
import countryList from "react-select-country-list";
import { industriesList } from "../constants/industry";
import { servicesList } from "../constants/services";
import StarRatingComponent from "react-star-rating-component";

const Profile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState({});
  const [location, setLocation] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [services, setServices] = useState(["null"]);
  const [initialServices, setInitialServices] = useState(["null"]);
  const [initialLocation, setInitialLocation] = useState(null);
  const [initialIndustry, setInitialIndustry] = useState(null);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (token) {
      getProfile(token).then((response) => {
        setProfile(response.data);
        const selectedIndustry = industriesList.find(
          (item) => item.value === response.data.industry
        );
        const selectedLocation = countryList()
          .getData()
          .find((item) => item.value === response.data.location);

        setServices(JSON.parse(response.data.services_offered));
        setIndustry(selectedIndustry);
        setLocation(selectedLocation);
        setInitialServices(
          JSON.parse(response.data.services_offered)
        );
        setInitialIndustry(selectedIndustry);
        setInitialLocation(selectedLocation);
      });
    }
  }, [token]);

  const handleUpdate = async () => {
    try {
      const updatedProfile =
        profile.role === "provider"
          ? {
              industry: industry.value,
              location: location.value,
              services_offered: JSON.stringify(services),
            }
          : {
              industry: industry.value,
              location: location.value,
            };
      await updateProfile(token, updatedProfile);

      // Show success modal
      setModal({
        show: true,
        message: "Profile updated successfully!",
        type: "success",
      });

      // Update initial values after successful update
      setInitialIndustry(industry);
      setInitialLocation(location);
      setInitialServices(services);
    } catch (error) {
      // Show error modal
      setModal({
        show: true,
        message: "Failed to update profile. Please try again.",
        type: "error",
      });
    }

    // Auto-close modal after 3 seconds
    setTimeout(() => {
      setModal({ show: false, message: "", type: "" });
    }, 500);
  };

  const handleCancel = () => {
    setIndustry(initialIndustry);
    setLocation(initialLocation);
    setServices(initialServices);
  };
  const isServicesChanged =
    profile.role === "provider" &&
    (initialServices.length !== services.length ||
      !initialServices.every((item) =>
        services.some((service) => service.value === item.value)
      ));

  const isChanged =
    industry?.value !== initialIndustry?.value ||
    location?.value !== initialLocation?.value ||
    isServicesChanged;
  return (
    <div className="flex items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Profile
        </h2>

        <div className="mt-4">
          <p className="text-gray-600">
            <strong>Email:</strong> {profile.email}
          </p>

          {profile.role === "provider" ? (
            <div className="flex flex-col mt-2">
              <label htmlFor="Services" className="font-medium text-gray-700">
                Services
              </label>
              <Select
                id="Services"
                isMulti
                options={servicesList}
                onChange={(selectedServices) => setServices(selectedServices)}
                value={services}
                placeholder="Select a country"
              />
            </div>
          ) : (
            <div className="flex mt-2">
            <label htmlFor="Services" className="font-medium text-gray-700 mr-2">
                Credit Rating
              </label>
              <StarRatingComponent
                name='rating'
                starCount={10}
                value={profile.credit_rating/10}
              />
            </div>
          )}

          <div className="flex flex-col mt-2">
            <label htmlFor="location" className="font-medium text-gray-700">
              Location
            </label>
            <Select
              id="location"
              options={countryList().getData()}
              onChange={(selectedLocation) => setLocation(selectedLocation)}
              value={location}
              placeholder="Select a country"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="industry" className="font-medium text-gray-700">
              Industry
            </label>
            <Select
              id="industry"
              options={industriesList}
              onChange={(selectedIndustry) => setIndustry(selectedIndustry)}
              value={industry}
              placeholder="Select an industry"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleUpdate}
            disabled={!isChanged}
            className={`px-4 py-2 rounded-md text-white ${
              isChanged
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Update
          </button>
          <button
            onClick={handleCancel}
            disabled={!isChanged}
            className={`px-4 py-2 rounded-md ${
              isChanged
                ? "bg-gray-600 text-white hover:bg-gray-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* MODAL */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3
              className={`text-lg font-semibold text-center ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.type === "success" ? "Success!" : "Error!"}
            </h3>
            <p className="mt-2 text-center text-gray-700">{modal.message}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setModal({ show: false, message: "", type: "" })}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
