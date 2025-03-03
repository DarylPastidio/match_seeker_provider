import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfile } from "../api/profile";

const Profile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState({});
  const [editingField, setEditingField] = useState(null); // Tracks which field is being edited
  const [tempProfile, setTempProfile] = useState({}); // Temporary storage for cancel functionality

  useEffect(() => {
    if (token) {
      getProfile(token).then((response) => {
        setProfile(response.data);
        setTempProfile(response.data); // Store initial profile data for canceling changes
      });
    }
  }, [token]);

  const handleUpdate = async (field) => {
    await updateProfile(token, { [field]: profile[field] });
    setEditingField(null);
  };

  const handleCancel = () => {
    setProfile(tempProfile); // Reset profile to original state
    setEditingField(null); // Exit editing mode
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Profile
        </h2>

        <div className="mt-4">
          <p className="text-gray-600">
            <strong>Email:</strong> {profile.email}
          </p>

          {/* Industry Field */}
          

          {/* Location Field */}
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
