import { useState } from "react";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://192.168.0.170:8000";

export default function ForgotPasswordPage({
  onBackToLogin,
}) {
  const [step, setStep] =
    useState(1);

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // SEND OTP
  const handleSendOtp = async (
    e
  ) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/api/auth/send-otp`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Failed to send OTP"
        );
      }

      setMessage(
        "OTP sent successfully."
      );

      setStep(2);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async (
    e
  ) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/api/auth/verify-otp`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "OTP verification failed"
        );
      }

      setMessage(
        "OTP verified successfully."
      );

      setStep(3);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // RESET PASSWORD
  const handleResetPassword =
    async (e) => {
      e.preventDefault();

      setError("");
      setMessage("");

      if (
        password !==
        confirmPassword
      ) {
        setError(
          "Passwords do not match"
        );

        return;
      }

      setLoading(true);

      try {
        const response =
          await fetch(
            `${BASE_URL}/api/auth/reset-password`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
                otp,
                password,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail ||
              "Reset failed"
          );
        }

        setMessage(
          "Password reset successful."
        );

        setTimeout(() => {
          onBackToLogin();
        }, 2000);
      } catch (err) {
        setError(
          err.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4 shadow-lg">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2h-1V9a5 5 0 00-10 0v2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Reset Password
            </h1>

            <p className="text-gray-600 mt-2">
              {step === 1 &&
                "Enter your email to receive OTP"}

              {step === 2 &&
                "Verify your OTP"}

              {step === 3 &&
                "Create your new password"}
            </p>
          </div>

          {/* SUCCESS */}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {message}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <form
              onSubmit={handleSendOtp}
              className="space-y-5"
            >
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-200 disabled:opacity-50"
              >
                {loading
                  ? "Sending..."
                  : "Send OTP"}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form
              onSubmit={
                handleVerifyOtp
              }
              className="space-y-5"
            >
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-200 disabled:opacity-50"
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form
              onSubmit={
                handleResetPassword
              }
              className="space-y-5"
            >
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-200 disabled:opacity-50"
              >
                {loading
                  ? "Resetting..."
                  : "Reset Password"}
              </button>
            </form>
          )}

          {/* FOOTER */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Remember your password?{" "}

            <button
              onClick={onBackToLogin}
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}