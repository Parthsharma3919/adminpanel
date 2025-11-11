import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "./components/Navigation/navigation";
import { Header } from "./components/header";
import { Features } from "./components/Features/features";
import { Testimonials } from "./components/testimonials/testimonials";
import CollegesPage from "./components/college/CollegesPage";
import { Contact } from "./components/contact/contact";
import JourneyTimeline from "./components/journey/JourneyTimeline";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

export function LandingHome() {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <>
        <Helmet>
        {/* local landing CSS */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/site.css" />
        {/* Icons for landing (kept here so dashboard isn’t affected) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          referrerPolicy="no-referrer"
        />
      </Helmet>
      <Navigation />
      <Header />
      <Features />
      <JourneyTimeline />
      <CollegesPage />
      <Testimonials />
      <Contact />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
