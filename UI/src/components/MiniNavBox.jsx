import { NavLink } from "react-router-dom"
import SchedulingLinksVisual from "./SchedulingLinksVisual"
import ConnectedAppsVisual from "./ConnectedAppsVisual"
import PreferencesVisual from "./PreferencesVisual"

export default function MiniNavBox({directTo, label, visual}) {
   
    return (
        <div>
            <NavLink to={directTo}>
                <div className="mini-nav-box-container">
                    {visual === 3 ? <SchedulingLinksVisual /> : visual === 4 ? <ConnectedAppsVisual /> : <PreferencesVisual/> }
                    <header className="nav-box-label"> {label} </header>
                </div>
            </NavLink>
        </div>
    )
}