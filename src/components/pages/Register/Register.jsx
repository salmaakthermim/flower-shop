import { useState } from "react";
import { googleLogin, registerUser } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [avatar, setAvatar] = useState(""); // নতুন: Avatar URL
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call
      const newUser = await registerUser({ name, email, password, role, avatar });

      // ✅ localStorage-এ save করা
      localStorage.setItem("role", newUser.role);
      localStorage.setItem("name", newUser.name);
      localStorage.setItem("avatar", newUser.avatar || avatar); // fallback to input URL

      toast.success("Registration successful 🌸");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const loggedUser = await googleLogin();

      if (!loggedUser || !loggedUser.role) {
        throw new Error("User role not found");
      }

      localStorage.setItem("role", loggedUser.role);

      toast.success("Google Login Successful 🌸");

      if (loggedUser.role === "admin") {
        navigate("/dashboard/admin", { replace: true });
      } else if (loggedUser.role === "customer") {
        navigate("/dashboard/customer", { replace: true });
      } else {
        navigate("/dashboard/guest", { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast.error("Google Login Failed ❌");
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

          {/* নতুন: Avatar URL input */}
          <input
            type="text"
            placeholder="Avatar URL (image link)"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
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
        {/* Divider */}
        <div className="my-4 text-center text-gray-500">OR</div>



        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

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
