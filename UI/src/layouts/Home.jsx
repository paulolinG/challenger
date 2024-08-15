import { startCase } from "lodash";
import HomeStats from "../components/HomeStats";
import HomeDate from "../components/HomeDate";
import NavBox from "../components/NavBox";
import MiniNavBox from "../components/MiniNavBox";

export default function Home({name}) {
    const yourIdealDay = 0;
    const meetings = 1;
    const flexibleHolds = 2;
    const schedulingLinks = 3;
    const connectedApps = 4;
    const preferences = 5;

    return (
        <div className="home-layout-container">
            <header className="home-greeting">Hi bob!</header>
            <div className="home-stats-list">
                <HomeDate />
                <HomeStats value={10} label="Meetings" previousValue={20} isPercentage={true} color="#5060c0" unit="hr"/>
                <HomeStats value={9} label="Focus Time held" previousValue={5} isPercentage={true} color="#008a69" unit="hr"/>
                <HomeStats value={10} label="Conflicts resolved" previousValue={20} isPercentage={false} unit=""/>
            </div>
            <div className="nav-box-list">
                <NavBox directTo="YourIdealDay" label="Your ideal day 🡢" visual={yourIdealDay}/>
                <NavBox directTo="Meetings" label="Flexible meetings 🡢" visual={meetings}/>
                <NavBox directTo="Tasks" label="Flexible holds 🡢" visual={flexibleHolds}/>
            </div>
            <div className="nav-box-list">
                <MiniNavBox directTo="SchedulingLinks" label="Scheduling links 🡢" visual={schedulingLinks} />
                <MiniNavBox directTo="ConnectedApps" label="Connected Apps 🡢" visual={connectedApps}/>
                <MiniNavBox directTo="Preferences" label="Preferences 🡢" visual={preferences}/>
            </div>
        </div>
    )
}