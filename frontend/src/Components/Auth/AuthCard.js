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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/account");
  };

  return (
    <div className="w-full max-w-[440px] bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-[0_10px_30px_rgba(88,65,114,0.06)] border border-[#EBE5DB]">
      {/* Tab Controls */}
      <AuthTabSwitch activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === "register" && (
          <FormInput
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        )}

        <FormInput
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <FormInput
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-3.5 px-5 bg-[#584172] hover:bg-[#47345C] text-white text-sm font-semibold rounded-full shadow-md shadow-[#584172]/20 transition-all duration-200 mt-2"
        >
          {activeTab === "login" ? "Log in" : "Register"}
        </button>
      </form>

      {/* Demo Notice Footer */}
      <p className="text-center text-xs text-[#9E93A7] mt-6">
        Demo sign-in – no real data is stored.
      </p>
    </div>
  );
}
