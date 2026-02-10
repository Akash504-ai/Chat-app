import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0E14] px-4 py-12">
      {/* Background Glow Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-primary rounded-[100%] blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-[#161B22] border border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
          
          {/* LOGO & HEADER */}
          <div className="text-center mb-10">
            <div className="flex flex-col items-center gap-3 group">
              <div className="size-14 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(var(--p),0.3)] group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="size-7 text-white" />
              </div>
              <div className="space-y-1 mt-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-white">Create Account</h1>
                <p className="text-gray-400 text-sm">Join the community today</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-gray-300 font-medium">Full Name</span>
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  className="input w-full bg-[#0D1117] border-white/10 text-white pl-12 focus:border-primary focus:outline-none transition-all rounded-xl h-12"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-gray-300 font-medium">Email Address</span>
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  className="input w-full bg-[#0D1117] border-white/10 text-white pl-12 focus:border-primary focus:outline-none transition-all rounded-xl h-12"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-gray-300 font-medium">Password</span>
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input w-full bg-[#0D1117] border-white/10 text-white pl-12 pr-12 focus:border-primary focus:outline-none transition-all rounded-xl h-12"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary w-full h-12 rounded-xl text-white font-bold text-base mt-4 shadow-lg shadow-primary/20 hover:shadow-primary/40 border-none transition-all active:scale-[0.98]"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Get Started"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already a member?{" "}
              <Link to="/login" className="text-primary hover:underline font-semibold ml-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;