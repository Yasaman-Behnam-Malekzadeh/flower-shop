import React from "react";
import AuthCard from "./AuthCard";

export default function LoginPage() {
  return (
    <div className="my-32 bg-[#FAF7F2] font-sans flex justify-between selection:bg-[#584172] selection:text-white">
      <div className="flex items-center justify-center flex-1">
        <AuthCard />
      </div>
    </div>
  );
}
