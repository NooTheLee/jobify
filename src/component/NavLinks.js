import { NavLink } from 'react-router-dom';
import links from './../utills/links.js'
const NavLinks = (toggleSidebar) => {
    return (
        <div className="nav-links">
            {links.map(link => {
                const { text, path, id, icon } = link
                return (
                    <NavLink to={path} key={id} onClick={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        {text}
                    </NavLink>
                )
            })}
        </div>
    )
}

export default NavLinks;