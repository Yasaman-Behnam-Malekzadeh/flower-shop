import React, { useState, useEffect } from "react";
import { User, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setProfile({
          name: parsed.name || "",
          email: parsed.email || "",
          phone: parsed.phone || "+49 ",
          address: parsed.address || "Zeesen, Königs Wusterhausen, Germany",
        });
      } catch (e) {}
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(profile));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-6 sm:px-12 font-sans">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#2B2B2B]">Profile & Delivery</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your personal information and default shipping destination.</p>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border border-gray-200/80 rounded-2xl p-8 shadow-xs space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">Email address cannot be changed directly.</span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="+49 ..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Delivery Address (Germany / Europe)</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <textarea
                name="address"
                rows="3"
                value={profile.address}
                onChange={handleChange}
                placeholder="Street, House No., Postal Code, City"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2B2B2B] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}