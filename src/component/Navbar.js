
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from "../context/appContext";
import { useState } from "react";
const Navbar = () => {
    const { toggleSidebar } = useAppContext();
    // console.log(showSidebar);
    const [showDropDown, setShowDropDown] = useState(false);
    const { user, logOut } = useAppContext();
    return (
        <div className="nav-center d-flex justify-content-between">
            <button className="toggle-btn" onClick={toggleSidebar}>
                <FaAlignLeft />
            </button>
            <div className="dashboard">
                <h2 className="logo-text">
                    Dash board
                </h2>

            </div>
            <div className="logo">
                <button type='button' className="btn-user" onClick={() => setShowDropDown(!showDropDown)}>
                    <span className="logo1">
                        <FaUserCircle />
                    </span>
                    <span className="text">{user?.name}</span>
                    <span className="logo2">
                        <FaCaretDown />
                    </span>
                </button>
                <div className={`dropdown show-dropdown`}>
                    <button type='button' className={`dropdown-btn${showDropDown ? ' active' : ''}`} onClick={logOut}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;