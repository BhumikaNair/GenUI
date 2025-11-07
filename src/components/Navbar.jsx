import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi";
import { RiSettings3Fill } from "react-icons/ri";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <div
        className="nav flex items-center justify-between px-[100px] h-[90px] border-b-[1px]"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="logo">
          <h3 className="text-[25px] font-[700] sp-text">GenUI</h3>
        </div>
        <div className="icons flex items-center gap-[15px]">
          <div className="icon" onClick={toggleTheme}>
            {theme === "dark" ? <HiSun /> : <HiMoon />}
          </div>
          <div className="icon">
            <FaUser />
          </div>
          <div className="icon">
            <RiSettings3Fill />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
