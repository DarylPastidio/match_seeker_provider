import { useEffect, useState } from "react";
import { registerUser } from "../api/auth";
import countryList from "react-select-country-list";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { industriesList } from "../constants/industry";
import { servicesList } from "../constants/services";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState({ value: "seeker", label: "Seeker" });
  const [location, setLocation] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const roleList = [
    { value: "seeker", label: "Seeker" },
    { value: "provider", label: "Provider" },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    const services_offered = JSON.stringify(services);
    console.log(services_offered);
    try {
      await registerUser({
        email,
        password,
        role: role.value,
        industry: industry.value,
        location: location.value,
        services_offered,
      });
      setEmail("");
      setPassword("");
      setRole("seeker");
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="role" className="font-medium text-gray-700">
              Role
            </label>
            <Select
              id="role"
              options={roleList}
              onChange={(selectedRole) => setRole(selectedRole)}
              value={role}
            />
          </div>

          {role.value === "provider" && (
            <div className="flex flex-col">
              <label htmlFor="services" className="font-medium text-gray-700">
                Services
              </label>
              <Select
                isMulti
                id="services"
                options={servicesList}
                onChange={(selectedService) => setServices(selectedService)}
                value={services}
              />
            </div>
          )}

          <div className="flex flex-col">
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

          <div className="flex flex-col">
            <label htmlFor="industry" className="font-medium text-gray-700">
              Industry
            </label>
            <Select
              id="industry"
              options={industriesList}
              onChange={(selectedIndustry) => setIndustry(selectedIndustry)}
              value={industry}
              placeholder="Select a country"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
