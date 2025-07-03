import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../utils/AxiosInstance";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import hero from "../assets/img/hero/Pineapple 2.jpg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(isLogin
      ? {}
      : {
          firstName: "",
          lastName: "",
          farmName: "",
          farmLocation: "",
          telNumber: "",
        }),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    if (!formData.email || !formData.password) {
      return "Email and Password are required.";
    }
    if (!isLogin && (!formData.firstName || !formData.lastName)) {
      return "First and Last Name are required for signup.";
    }
    if (!isLogin && (!formData.farmName || !formData.farmLocation)) {
      return "Farm details are required.";
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const endpoint = isLogin ? "/api/users/login" : "/api/users/signup";

    try {
      const response = await axiosInstance.post(endpoint, formData);
      const data = response.data;

      if (isLogin) {
        // Store the redirect destination
        const redirectTo = location.state?.from || "/";

        // Wait for login to complete
        const loginSuccess = await login(data.accessToken);

        if (loginSuccess) {
          toast.success("Login successful!");

          // Navigate to the intended destination
          navigate(redirectTo, { replace: true });
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        toast.success(
          "Signup successful! Check your email to verify your account."
        );
        navigate("/verify_email");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = (toLogin) => {
    setIsFading(true);
    setTimeout(() => {
      setIsLogin(toLogin);
      // Reset form data when switching between login and signup
      setFormData({
        email: "",
        password: "",
        ...(toLogin
          ? {}
          : {
              firstName: "",
              lastName: "",
              farmName: "",
              farmLocation: "",
              telNumber: "",
            }),
      });
      setError("");
      setIsFading(false);
    }, 300);
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
          <h2 className="text-3xl font-bold text-white">SPEG</h2>
          <p className="text-white text-sm">
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-green-700">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
            {isLogin ? "Sign in to access your account" : "Create your account"}
          </p>

          <div className="flex mb-6 sm:mb-8 border-b">
            <button
              onClick={() => handleSwitch(true)}
              className={`flex-1 py-2 sm:py-3 font-medium transition-colors text-sm sm:text-base ${
                isLogin
                  ? "border-b-2 border-green-500 text-green-700"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleSwitch(false)}
              className={`flex-1 py-2 sm:py-3 font-medium transition-colors text-sm sm:text-base ${
                !isLogin
                  ? "border-b-2 border-green-500 text-green-700"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Animated container for form and bottom text */}
          <div
            className={`transition-opacity duration-300 ${
              isFading ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="farmName"
                      placeholder="Farm Name"
                      value={formData.farmName}
                      onChange={handleChange}
                      className="w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="farmLocation"
                      placeholder="Farm Location"
                      value={formData.farmLocation}
                      onChange={handleChange}
                      className="w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      name="telNumber"
                      placeholder="Phone Number"
                      value={formData.telNumber}
                      onChange={handleChange}
                      className="w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs sm:text-sm">
                  {error}
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <a
                    href="/forgotten-pwd"
                    className="text-xs sm:text-sm text-green-600 hover:text-green-700"
                  >
                    Forgot password?
                  </a>
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
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-gray-500 text-xs sm:text-sm">
              {isLogin ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => handleSwitch(false)}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => handleSwitch(true)}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
