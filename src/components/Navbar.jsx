import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi";

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
        className="nav flex items-center justify-between px-6 lg:px-16 h-[90px] border-b-[1px]"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="logo">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="GenUI Logo" className="h-[35px]" />
          </div>
        </div>
        <div className="icons flex items-center gap-[15px]">
          <div className="icon" onClick={toggleTheme}>
            {theme === "dark" ? <HiSun /> : <HiMoon />}
          </div>
          <a
            href="https://github.com/BhumikaNair/GenUI"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
