import { useState } from "react";
import { loginUser } from "../../../api/auth";
import DashboardRedirect from "../DashboardRedirect";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Pass both email and password to backend
      const loggedUser = await loginUser({ email, password });

      if (!loggedUser) {
        throw new Error("Invalid credentials");
      }

      setUser(loggedUser);
      toast.success("Login successful 🌷");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Login failed ❌");
    } finally {
      setLoading(false);
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
        </form>

        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <a href="/register" className="text-pink-500 underline">
            Create Account
          </a>
        </p>

        {/* Redirect after successful login */}
        {user && <DashboardRedirect user={user} />}
      </div>
    </div>
  );
}
