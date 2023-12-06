import React, { useEffect } from "react";
import Hero from "components/Landing/Hero";

import Footer from "components/Landing/Footer";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);

  useEffect(() => {
    document.title = "SocialSculptor";
  }, []);

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return (
    <>
      <Hero />
    </>
  );
};

export default Landing;
