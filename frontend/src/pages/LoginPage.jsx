import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 shadow-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <MessageSquare className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-sm text-base-content/60">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
              <input
                type="email"
                className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="btn btn-primary w-full text-base tracking-wide"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-base-content/60">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="link link-primary font-medium">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;