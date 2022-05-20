import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext.js";
import links from './../utills/links.js'

const BigSidebar = ({ showSidebar }) => {

    const { currentPage, setCurrentPage } = useAppContext();
    return (
        <div className={showSidebar ? 'big-sidebar' : 'big-sidebar active'}>
            <ul>
                {links.map(item => {

                    const { id, text, path, icon } = item;
                    // className={active ? "active" : ""} onClick={() => {
                    //     setActive(!active);
                    // }}
                    return <li key={id} onClick={() => {
                        setCurrentPage(window.location.pathname);
                    }} className={path === currentPage ? "active" : ""}>
                        <NavLink to={path}>
                            <div className="icon">
                                {icon}
                            </div>
                            {text}
                        </NavLink>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default BigSidebar;