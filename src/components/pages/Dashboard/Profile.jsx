// src/pages/Dashboard/Profile.jsx
// import { auth } from "../../Firebase/firebase.config";

import { auth } from "../../../Firebase/firebase.config";

const Profile = () => {
  const user = auth.currentUser;

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">
        My Profile
      </h2>

      <img
        src={user?.photoURL || "https://i.ibb.co/2kRkN9y/user.png"}
        className="w-20 rounded-full mb-4"
      />

      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Name:</strong> {user?.displayName || "Not Set"}</p>
    </div>
  );
};

export default Profile;
