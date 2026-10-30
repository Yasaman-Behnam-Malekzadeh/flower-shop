import React, { useState } from "react";
import AuthTabSwitch from "./AuthTabSwitch";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage(""); // Clear error when user types
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const endpoint = activeTab === "login" ? "/api/login" : "/api/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Authentication failed. Please try again.",
        );
      }

      // Save session token and user profile to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to account dashboard
      navigate("/account");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-[0_10px_30px_rgba(88,65,114,0.06)] border border-[#EBE5DB]">
      {/* Tab Controls */}
      <AuthTabSwitch activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Error Message Box */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-medium rounded-xl border border-red-200">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === "register" && (
          <FormInput
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        )}

        <FormInput
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />

        <FormInput
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-5 bg-[#584172] hover:bg-[#47345C] disabled:opacity-70 text-white text-sm font-semibold rounded-full shadow-md shadow-[#584172]/20 transition-all duration-200 mt-2 cursor-pointer"
        >
          {loading
            ? activeTab === "login"
              ? "Logging in..."
              : "Creating account..."
            : activeTab === "login"
              ? "Log in"
              : "Register"}
        </button>
      </form>

      {/* Footer Notice */}
      <p className="text-center text-xs text-[#9E93A7] mt-6">
        {activeTab === "login"
          ? "Secure sign-in connected to Cloudflare database."
          : "Join KnitFlora and keep your bouquets forever."}
      </p>
    </div>
  );
}
