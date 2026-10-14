import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./Components/Layout/RootLayout";
import LandingPage from "./Pages/LandingPage";
import ShopPage from "./Pages/ShopPage";
import BuildPage from "./Pages/BuildPage";
import HowItWorks from "./Pages/HowItWorksPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Route using Layout */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/build" element={<BuildPage />} />
          <Route path="HowItWorks" element={<HowItWorks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
