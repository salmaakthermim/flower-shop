import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();

  const redirectByRole = (role) => {
    if (role === "admin") navigate("/dashboard/admin", { replace: true });
    else if (role === "customer") navigate("/dashboard/customer", { replace: true });
    else navigate("/dashboard/guest", { replace: true });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = await registerUser(form.name, form.email, form.password, form.role);
      toast.success("Account created! 🌸");
      redirectByRole(newUser.role);
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const loggedUser = await googleLogin();
      toast.success("Google login successful 🌸");
      redirectByRole(loggedUser.role);
    } catch {
      toast.error("Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1a2e1a]/55 backdrop-blur-[2px]" />

      {/* Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#e8a0b4]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#2d5a3d]/30 blur-3xl pointer-events-none" />

      <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 border border-white/50">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-serif text-2xl tracking-widest text-[#2d5a3d]">FIORELLO</p>
          <p className="text-[9px] tracking-[0.35em] text-[#e8a0b4] uppercase mt-0.5">Flower Studio</p>
          <h2 className="mt-5 text-2xl font-serif font-medium text-[#1a2e1a]">Create Account</h2>
          <p className="text-sm text-[#4a6a4a] mt-1">Join us and start ordering beautiful flowers</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {[
            { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
            { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                required
                className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition placeholder-[#8aaa8a]"
              />
            </div>
          ))}

          {/* Password with eye toggle */}
          <div>
            <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                required
                className="w-full border border-[#c8e0d0] px-4 py-3 pr-11 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition placeholder-[#8aaa8a]"
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a6a4a] hover:text-[#2d5a3d] transition"
              >
                {showPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Account Type</label>
            <select
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition bg-white"
            >
              <option value="customer">Customer</option>
              <option value="guest">Guest</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 text-[11px] mt-2">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#e8f0ea]" />
          <span className="text-xs text-[#4a6a4a]">or</span>
          <div className="flex-1 h-px bg-[#e8f0ea]" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] hover:bg-[#f0f7f2] transition font-medium"
        >
          <FcGoogle size={20} />
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="text-center mt-6 text-sm text-[#4a6a4a]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2d5a3d] font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
