import { motion } from "framer-motion";
import { Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { registerUser, googleLogin } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    registerUser(email, password)
      .then(() => toast.success("Registration successful 🌸"))
      .catch((err) => toast.error(err.message));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => toast.success("Google Login Successful 🌷"))
      .catch((err) => toast.error(err.message));
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

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">
          Join Flower Shop
        </h2>

        <form onSubmit={handleRegister} className="space-y-4 mt-6">
          <input name="email" type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-lg" />
          <input name="password" type="password" placeholder="Password" required className="w-full px-4 py-2 border rounded-lg" />

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-pink-500 text-white py-2 rounded-lg">
            Register
          </motion.button>
        </form>

        <button onClick={handleGoogle} className="w-full mt-4 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" className="w-5" />
          Continue with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-pink-500">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
