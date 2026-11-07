
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollEnhancements from "./ScrollEnhancements";
import WaterRipple from "./WaterRipple";

const Layout = ({ children }) => {
  return (
    <div className="portfolio">
      <WaterRipple />

      <Header />
      <ScrollEnhancements />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
