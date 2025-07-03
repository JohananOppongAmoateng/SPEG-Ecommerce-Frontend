import { Mail } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const EmailVerification = () => {
  const { resendVerification } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await resendVerification(email);
      setMessage("Verification email sent successfully!");
      setEmail("");
    } catch (error) {
      setMessage("Failed to send verification email. Please try again.");
      console.error("Resend verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Mail className="text-emerald-500" size={64} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;ve sent a verification link to your email address. Please
          check your inbox (and spam folder) to complete the verification
          process.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              disabled={isSubmitting}
            />
            {message && (
              <p
                className={`text-sm ${
                  message.includes("success")
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
          <button
            onClick={handleResend}
            disabled={isSubmitting}
            className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 flex items-center justify-center space-x-2 disabled:bg-emerald-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <Mail size={20} />
                <span>Resend Verification Email</span>
              </>
            )}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Didn&apos;t receive the email? Check your spam folder or enter your
            email and click resend.
          </p>
        </div>
      </div>
    </div>
  );
};
