import { useState } from "react";
// import { loginUser } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { googleLogin, loginUser } from "../../../api/auth";

import { FcGoogle } from "react-icons/fc";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loggedUser = await loginUser({ email, password });

      if (!loggedUser || !loggedUser.role) {
        throw new Error("User role not found");
      }

      // ✅ role save
      localStorage.setItem("role", loggedUser.role);

      toast.success("Login successful 🌷");

      // ✅ role অনুযায়ী redirect
      if (loggedUser.role === "admin") {
        navigate("/dashboard/admin", { replace: true });
      } else if (loggedUser.role === "customer") {
        navigate("/dashboard/customer", { replace: true });
      } else {
        navigate("/dashboard/guest", { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed ❌");
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
          "url('https://image.slidesdocs.com/responsive-images/background/pink-flowers-watercolor-nature-simple-floral-powerpoint-background_58c487484c__960_540.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-md p-8 z-10">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Flower Shop Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="my-4 text-center text-gray-500">OR</div>



          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>




        </form>

        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <a href="/register" className="text-pink-500 underline">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
