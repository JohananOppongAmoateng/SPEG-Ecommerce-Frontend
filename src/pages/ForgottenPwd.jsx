import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import axiosInstance from "../utils/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import hero from "../assets/img/hero/Pineapple 2.jpg";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email) {
      setError("Email address is required.");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post("/api/users/forgotpwd", { email });
      setSuccess(true);
      toast.success("Password reset instructions sent to your email!");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white md:flex-row">
      {/* Hero image overlay for mobile */}
      <div className="relative h-32 md:hidden overflow-hidden bg-green-700">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${hero})` }}
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h2 className="text-3xl font-bold text-white shadow-xl">SPEG</h2>
          <p className="text-white text-sm shadow-xl">
            Sustainable Pineapple Exporters Ghana
          </p>
        </div>
      </div>

      {/* Image side - hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 bg-yellow-50 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-green-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h2 className="text-4xl font-bold drop-shadow-lg text-white">SPEG</h2>
          <p className="text-xl mt-2 max-w-md drop-shadow-md text-white">
            Sustainable Pineapple Exporters Ghana
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 bg-white">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center text-green-600 hover:text-green-700 mb-6 text-sm"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Login
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-green-700">
            Forgot Password
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
            Enter your email address to receive password reset instructions
          </p>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 rounded-lg transition-colors font-medium flex items-center justify-center text-sm sm:text-base mt-2"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Send Reset Instructions"
                )}
              </button>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-2">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Check your email
              </h3>
              <p className="text-green-700 text-sm mb-4">
                We've sent instructions to reset your password to{" "}
                <strong>{email}</strong>. Please check your inbox and follow the
                link provided.
              </p>
              <p className="text-green-700 text-sm mb-4">
                If you don't see the email, please check your spam folder.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={() => {
                    setEmail("");
                    setSuccess(false);
                  }}
                  className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm hover:bg-green-50"
                >
                  Try another email
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                >
                  Return to login
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-gray-500 text-xs sm:text-sm">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
