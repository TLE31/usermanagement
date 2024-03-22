import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpGenerating, setOtpGenerating] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // handle OTP generation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtpGenerating(true);
    await api
      .post("/otp/generate", { email })
      .then((res) => {
        console.log(res.data);
        setOtpSent(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to send OTP");
      });
    setOtpGenerating(false);
  };

  // handle Authentication
  const handleVerification = async (e) => {
    e.preventDefault();
    setOtpVerifying(true);
    await api
      .post("/otp/verify", { email, otp: parseInt(otp) })
      .then(async (res) => {
        console.log(res.data);
        await api
          .post("/auth/signup", { name, email, password, about, gender })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("id", res.data.id);
            navigate("/profile");
          })
          .catch((err) => {
            console.error(err);
            alert("Failed to create an account");
          });
      })
      .catch((err) => {
        console.error(err);
        alert("Invalid OTP");
      });
    setOtpVerifying(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!otpSent ? (
        <form onSubmit={handleSubmit} className="w-80">
          <div className="block font-bold text-3xl mb-2">
            Welcome to Profiler!
          </div>
          <div className="block font-bold text-2xl">Sign Up</div>
          <p className="mb-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2">
              Gender:
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border bg-white border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="about" className="block mb-2">
              About:
            </label>
            <input
              type="text"
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-400"
            disabled={otpGenerating}
          >
            {otpGenerating ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerification} className="w-64">
          <div className="mb-4">
            <label htmlFor="otp" className="block mb-2">
              Enter OTP:
            </label>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-400"
            disabled={otp.length !== 6 || otpVerifying}
          >
            {otpVerifying ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="border-blue-500 text-blue-500 px-4 py-2 rounded mx-2"
          >
            Resend OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
