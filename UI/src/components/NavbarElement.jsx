import "bootstrap-icons/font/bootstrap-icons.css"
import { NavLink } from "react-router-dom"

export default function NavbarElement({icon, text, path}) {
    return (
        <div className="navbar-icon">
            <i className={icon} style={{
                gridArea: '1 / 1 / 2 / 2',
                justifySelf: "center",
            }}></i>
            <NavLink style={{
                textDecoration: 'none', 
                color: 'inherit', 
                gridArea: '1 / 2 / 2 / 3',
                justifySelf: 'start',
            }} 
            to={path}> {text} </NavLink>
        </div>
    )
}