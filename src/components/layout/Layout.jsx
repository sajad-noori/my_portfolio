import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollEnhancements from "./ScrollEnhancements";

const Layout = ({ children }) => {
  return (
    <div className="portfolio">
      <Header />
      <ScrollEnhancements />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
  