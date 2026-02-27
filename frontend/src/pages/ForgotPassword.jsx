import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Lock, Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const [newPassword, setNewPassword] = useState("");

  // STEP 1 → Get Questions
  const handleFetchQuestions = async (e) => {
    e.preventDefault();

    const success = await fetchSecurityQuestions(email);
    if (success) {
      setAnswers(new Array(securityQuestions.length).fill(""));
      setStep(2);
    }
  };

  // STEP 2 → Verify Answers
  const handleVerify = async (e) => {
    e.preventDefault();

    const success = await verifySecurityAnswers({
      email,
      answers,
    });

    if (success) {
      setStep(3);
    }
  };

  // STEP 3 → Reset Password
  const handleReset = async (e) => {
    e.preventDefault();

    const success = await resetPassword({
      email,
      newPassword,
    });

    if (success) {
      navigate("/login");
    }
  };

  const handleBack = () => {
    if (step === 1) navigate("/login");
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8">

            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-primary mb-4"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">
              Forgot Password
            </h2>

            {/* STEP 1 → Email */}
            {step === 1 && (
              <form onSubmit={handleFetchQuestions} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 opacity-50" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="input input-bordered w-full pl-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isFetchingQuestions}
                >
                  {isFetchingQuestions ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            )}

            {/* STEP 2 → Questions */}
            {step === 2 && (
              <form onSubmit={handleVerify} className="space-y-4">
                {securityQuestions.map((question, index) => (
                  <div key={index} className="form-control">
                    <label className="label">
                      <span className="label-text text-sm">
                        {question}
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      className="input input-bordered w-full"
                      placeholder="Your Answer"
                      value={answers[index] || ""}
                      onChange={(e) => {
                        const updated = [...answers];
                        updated[index] = e.target.value;
                        setAnswers(updated);
                      }}
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isVerifyingSecurity}
                >
                  {isVerifyingSecurity ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    "Verify Answers"
                  )}
                </button>
              </form>
            )}

            {/* STEP 3 → Reset Password */}
            {step === 3 && (
              <form onSubmit={handleReset} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 opacity-50" />
                  <input
                    type="password"
                    required
                    placeholder="Enter new password"
                    className="input input-bordered w-full pl-12"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isResettingPassword}
                >
                  {isResettingPassword ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    "Reset Password"
                  )}
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