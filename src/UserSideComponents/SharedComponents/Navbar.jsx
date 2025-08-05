import React from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();

  // Use the useAuth hook to get the global state and functions
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const linkStyle = (base = "") =>
    `group flex flex-col gap-0.5 ${
      isScrolled ? "text-gray-700" : "text-white"
    } ${base}`;

  const underlineStyle = isScrolled ? "bg-gray-700" : "bg-white";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setIsScrolled(window.scrollY > 10);
      }
    };

    if (location.pathname === "/") {
      setIsScrolled(window.scrollY > 10);
    } else {
      setIsScrolled(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // IMPORTANT: The Navbar will not render any of its content until
  // the initial auth check is complete. This prevents flickering.
  if (isLoading) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className={`text-2xl md:text-4xl font-lora font-bold tracking-wide ${
          isScrolled ? "text-gray-700" : "text-white"
        }`}
      >
        JetSetStays
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} className={linkStyle()}>
            {link.name}
            <div
              className={`${underlineStyle} h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}

        {/* Conditionally render My Bookings and Dashboard/List Hotel */}
        {isAuthenticated ? (
          <>
            <Link to="/my-bookings" className={linkStyle()}>
              My Bookings
              <div
                className={`${underlineStyle} h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
            <span
              onClick={logout}
              className={`${linkStyle(
                "cursor-pointer text-red-600 hover:text-red-800"
              )}`}
            >
              Logout
              <div className="h-0.5 w-0 group-hover:w-full bg-red-600 transition-all duration-300" />
            </span>
          </>
        ) : (
          <>
            <Link to="/login" className={linkStyle()}>
              Dashboard
              <div
                className={`${underlineStyle} h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
            <Link to="/hotel-reg" className={linkStyle()}>
              List Your Hotel
              <div
                className={`${underlineStyle} h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
          </>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="search"
          className={`${
            isScrolled && "invert"
          } h-7 transition-all duration-500`}
        />
        {!isAuthenticated && (
          <Link
            to="/login"
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
              isScrolled ? "text-white bg-black" : "bg-white text-black"
            }`}
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt="menu"
          className={`${isScrolled && "invert"} h-4`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="close" className="h-6.5" />
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-lg"
          >
            {link.name}
          </Link>
        ))}

        {isAuthenticated ? (
          <>
            <Link
              to="/my-bookings"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              My Bookings
            </Link>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="text-red-600 hover:text-red-800 transition-all text-lg"
            >
              Logout ({user.username})
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              Dashboard
            </Link>
            <Link
              to="/hotel-reg"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              List Your Hotel
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
