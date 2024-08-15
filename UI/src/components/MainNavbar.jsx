import NavbarElement from "./NavbarElement"
import logo from "../assets/app_icon.png"
import { Outlet } from "react-router-dom"

export default function MainNavbar() {
    return (
        <div className="viewport">
            <div className="mainscreen-container">
                <div className="mainscreen-logo">
                    <img src={logo} alt="Logo" className="mainscreen-logo-icon" />
                    <h1 className="mainscreen-logo-text"> challenger </h1>
                </div>
                <div className="mainsscreen-navbar">
                    <NavbarElement icon="bi bi-house-door" text="Home" path="/Home"></NavbarElement>
                    <NavbarElement icon="bi bi-calendar" text="Planner" path="/Planner"></NavbarElement>
                    <NavbarElement icon="bi bi-calendar2-check" text="Your ideal day" path="/IdealDay"></NavbarElement>
                    <NavbarElement icon="bi bi-chat-left-dots" text="Meetings" path="/Meetings"></NavbarElement>
                    <NavbarElement icon="bi bi-list-task" text="Tasks" path="/Tasks"></NavbarElement>
                    <NavbarElement icon="bi bi-link-45deg" text="Scheduling links" path="/Links"></NavbarElement>
                </div>
            </div>

            <main>
                <Outlet />
            </main>
        </div>
    )
}