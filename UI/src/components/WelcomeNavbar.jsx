import { NavLink, Outlet} from "react-router-dom"
import "./components.css"
import logo from "../assets/app_icon.png"
import { useEffect, useState } from "react";


export default function WelcomeNavbar() {

    async function authUser() {
      const urlPayload = await fetch(`${import.meta.env.VITE_BACKEND}/request`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // redirect to auth url
      const data = await urlPayload.json()
      window.location.href = data.url;
    }

    // async function checkAuthentication() {
    //   const response = await fetch(`${import.meta.env.VITE_BACKEND}/checkAuth`, {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   const data = await response.json();
    //   if (data.sessionExpired) {
    //     console.log("renew session");
    //     await authUser();
    //     return;
    //   }
    //   // Session is valid, proceed with the application
    // }
    
    return (
        <div className="welcome-navbar">
            <div className="logo-wrapper">
                <img src={logo} alt="Logo" className="logo" />
                <h1 className="logo-text"> challenger </h1>
            </div>
            <div className="login-about">
                <button className="login-button" onClick={authUser}>Login</button>
                <NavLink to="/about" className="about-nav-link">About</NavLink>
            </div>
        </div>
    );
}