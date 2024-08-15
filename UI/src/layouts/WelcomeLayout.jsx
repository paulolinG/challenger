import WelcomeNavbar from "../components/WelcomeNavbar";
import "./layouts.css"

export default function WelcomeLayout() {
    return (
        <div className="welcome-layout">
            <WelcomeNavbar className="home-navbar"/>
            <header className="quote1"> Your day, <span className="decorated-text"> your design</span> </header>
            <header className="quote2"> Challenger is a AI calendar assistant that works with your google calendar to cater to your day</header>
        </div>
    )
}