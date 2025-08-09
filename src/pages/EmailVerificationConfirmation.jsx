import { Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Using React Router v6's useLocation and useNavigate
import toast from "react-hot-toast"; // Import React Hot Toast
import axiosInstance from "../utils/AxiosInstance";
import { useParams } from "react-router-dom";

const EmailVerificationConfirmation = () => {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const params = useParams();
  console.log("useParams output:", params);
  const { token } = params;
  console.log("Extracted token:", token);

  const navigate = useNavigate(); // Using React Router v6's useNavigate for navigation

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatusMessage("Invalid or expired token.");
        setIsSubmitting(false);
        return;
      }

      try {
        // Make the API call using fetch
        const response = await axiosInstance.post("/api/users/verifytoken", { token });

        // Check if the response is successful
        setStatusMessage(res.data?.message || "Your email has been successfully verified.");
        setIsSuccess(true);
        toast.success("Email successfully verified! You can now log in.");
      } catch (error) {
        setStatusMessage("An error occurred. Please try again.");
        setIsSuccess(false);
        toast.error("An error occurred. Please try again.");
        console.error("Verification error:", error);
      } finally {
        setIsSubmitting(false); // Stop the loading state
      }
    };

    if (token) {
      verifyEmail(); // Run the verification function when token is available
    }
  }, [token])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Mail className={`text-emerald-500 ${isSuccess ? "text-emerald-500" : "text-red-500"}`} size={64} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Email Verification
        </h2>
        <p className="text-gray-600 mb-6">{statusMessage}</p>
        {isSubmitting ? (
          <div className="text-gray-600">Verifying your email...</div>
        ) : (
          <div className="text-gray-600">{isSuccess ? "Go to Login" : "Try Again"}</div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationConfirmation;
