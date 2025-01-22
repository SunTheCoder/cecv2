import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="text-2xl">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-[1001]" ref={ulRef}>
          {user ? (
            <>
              <li className="px-4 py-2 hover:bg-gray-100">{user.username}</li>
              <li className="px-4 py-2 hover:bg-gray-100">{user.email}</li>
              <li className="border-t">
                <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
