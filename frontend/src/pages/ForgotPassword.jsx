import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Lock, Mail, ArrowLeft, ShieldCheck, KeyRound, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const {
    fetchSecurityQuestions,
    verifySecurityAnswers,
    resetPassword,
    securityQuestions,
    isFetchingQuestions,
    isVerifyingSecurity,
    isResettingPassword,
  } = useAuthStore();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState([]);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleFetchQuestions = async (e) => {
    e.preventDefault();
    const success = await fetchSecurityQuestions(email);
    if (success) {
      setAnswers(new Array(securityQuestions.length).fill(""));
      setStep(2);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const success = await verifySecurityAnswers({ email, answers });
    if (success) setStep(3);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (passwords.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    const success = await resetPassword({
      email,
      newPassword: passwords.newPassword,
    });

    if (success) {
      toast.success("Password reset successfully!");
      navigate("/login");
    }
  };

  const handleBack = () => {
    if (step === 1) navigate("/login");
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-base-200 p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full animate-pulse" />

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-3xl bg-base-100/80 backdrop-blur-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-500">
          <div className="p-6 md:p-8">
            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              className="group flex items-center gap-2 text-xs font-bold text-base-content/40 hover:text-primary transition-colors mb-6 uppercase tracking-widest"
            >
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

            {/* HEADER */}
            <div className="text-center mb-6">
              <div className="inline-flex size-12 rounded-2xl bg-primary/10 items-center justify-center mb-4">
                {step === 1 && <Mail className="size-6 text-primary" />}
                {step === 2 && <ShieldCheck className="size-6 text-primary" />}
                {step === 3 && <KeyRound className="size-6 text-primary" />}
              </div>
              <h1 className="text-2xl font-black tracking-tight">Account Recovery</h1>
              <p className="text-base-content/50 text-xs mt-1">
                {step === 1 && "Verify your email to continue"}
                {step === 2 && "Answer your security questions"}
                {step === 3 && "Set your new account password"}
              </p>
            </div>

            {/* PROGRESS BAR */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    step >= s ? "bg-primary" : "bg-base-300"
                  }`}
                />
              ))}
            </div>

            {/* STEP 1: Email */}
            {step === 1 && (
              <form onSubmit={handleFetchQuestions} className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-bold text-[10px] uppercase tracking-widest opacity-60">Email Address</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 opacity-30" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="input input-bordered w-full pl-12 bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 h-12 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" disabled={isFetchingQuestions} className="btn btn-primary w-full h-12 shadow-lg shadow-primary/20">
                  {isFetchingQuestions ? <Loader2 className="animate-spin" /> : "Verify Email"}
                </button>
              </form>
            )}

            {/* STEP 2: Security Questions (FIXED UI) */}
            {step === 2 && (
              <form onSubmit={handleVerify} className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="max-h-[320px] overflow-y-auto pr-1 space-y-5 custom-scrollbar">
                  {securityQuestions.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-primary bg-primary/10 size-5 flex items-center justify-center rounded-lg uppercase">
                          Q{index + 1}
                        </span>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">
                          Security Question
                        </label>
                      </div>
                      <p className="text-sm font-semibold text-base-content/80 px-1 leading-tight">
                        {question}
                      </p>
                      <input
                        type="text"
                        required
                        className="input w-full bg-base-200/50 border-2 border-transparent focus:border-primary/30 focus:bg-base-100 focus:outline-none h-11 text-sm transition-all rounded-xl px-4"
                        placeholder="Type your answer here..."
                        value={answers[index] || ""}
                        onChange={(e) => {
                          const updated = [...answers];
                          updated[index] = e.target.value;
                          setAnswers(updated);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" disabled={isVerifyingSecurity} className="btn btn-primary w-full h-12 shadow-lg shadow-primary/20">
                  {isVerifyingSecurity ? <Loader2 className="animate-spin" /> : "Verify Identity"}
                </button>
              </form>
            )}

            {/* STEP 3: Reset Password */}
            {step === 3 && (
              <form onSubmit={handleReset} className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-bold text-[10px] uppercase opacity-60">New Password</span></label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 opacity-30" />
                      <input
                        type="password"
                        required
                        className="input input-bordered w-full pl-12 bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 h-12"
                        placeholder="••••••••"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-bold text-[10px] uppercase opacity-60">Confirm Password</span></label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 opacity-30" />
                      <input
                        type="password"
                        required
                        className="input input-bordered w-full pl-12 bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 h-12"
                        placeholder="••••••••"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={isResettingPassword} className="btn btn-primary w-full h-12 shadow-lg shadow-primary/20 mt-2">
                  {isResettingPassword ? <Loader2 className="animate-spin" /> : "Update Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;