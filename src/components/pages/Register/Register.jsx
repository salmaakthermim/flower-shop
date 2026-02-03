import { useState } from "react";
import { registerUser } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call
      const newUser = await registerUser({ name, email, password, role });
      toast.success("Registration successful 🌸");

      // Role অনুযায়ী redirect
      if (newUser.role === "admin") {
        navigate("/dashboard/admin");
      } else if (newUser.role === "customer") {
        navigate("/dashboard/customer");
      } else {
        navigate("/dashboard/guest");
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/04/61/56/75/360_F_461567541_ssas8kkgKtBJZSVsEzLLB4jMoVn8tU6Y.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-md p-8 z-10">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Join Flower Shop
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
