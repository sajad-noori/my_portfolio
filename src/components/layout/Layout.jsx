
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollEnhancements from "./ScrollEnhancements";
import CustomCursor from "./CustomCursor";
import WaterRipple from "./WaterRipple";

const Layout = ({ children }) => {
  return (
    <div className="portfolio">
      <WaterRipple />
      <CustomCursor />

      <Header />
      <ScrollEnhancements />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
