import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

export default function Navigation() {
  // Common tooltip styles
  const tooltipClasses = "absolute pointer-events-none left-[calc(100%+8px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap z-10";
  const tooltipClassesRight = "absolute pointer-events-none right-[calc(100%+8px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap z-10";

  return (
    <nav className="p-4 shadow-lg">
      <ul className="flex gap-12 items-center text-gray-800">
        {/* Home Link with Tooltip */}
        <li className="relative group inline-block">
          <NavLink
            to="/"
            className="text-lg font-semibold hover:bg-gray-700 rounded transition"
          >
            <img
              src="../../../public/logo.png"
              alt="CEC logo. Click for home."
              width="50"
              height="50"
            />
          </NavLink>
          <span className={tooltipClasses}>
            Return to Home Page
          </span>
        </li>

        {/* Map Link with Tooltip */}
        <li className="relative group inline-block">
          <NavLink
            to="/map"
            className="px-2 py-1 text-lg font-semibold hover:bg-gray-200 rounded transition"
          >
            Map
          </NavLink>
          <span className={tooltipClasses}>
            View Interactive Map
          </span>
        </li>

        <li className="relative group inline-block">
          <NavLink
            to="/login"
            className="px-2 py-1 text-lg font-semibold hover:bg-gray-200 rounded transition"
          >
            Login
          </NavLink>
          <span className={tooltipClasses}>
            Sign In to Your Account
          </span>
        </li>

        {/* Profile Button with Tooltip */}
        <li className="relative group inline-block ml-auto">
          <ProfileButton />
          <span className={tooltipClassesRight}>
            Manage Your Profile
          </span>
        </li>
      </ul>
    </nav>
  );
}
