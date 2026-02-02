// src/pages/Dashboard/DashboardHome.jsx
// import { auth } from "../../Firebase/firebase.config";

import { auth } from "../../../Firebase/firebase.config";

const DashboardHome = () => {
  const user = auth.currentUser;

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-600">
        Welcome 🌸
      </h1>
      <p className="mt-2 text-gray-600">
        {user?.email}
      </p>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold text-pink-500">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Favorite Flowers</h3>
          <p className="text-3xl font-bold text-pink-500">5</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Pending Delivery</h3>
          <p className="text-3xl font-bold text-pink-500">2</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
