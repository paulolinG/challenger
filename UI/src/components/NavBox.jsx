import { NavLink } from "react-router-dom"
import YourIdealDayVisual from "./YourIdealDayVisual"
import MeetingsVisual from "./MeetingsVisual"
import FlexibleHoldsVisual from "./FlexibleHoldsVisual"

export default function NavBox({directTo, label, visual}) {
   
    return (
        <div>
            <NavLink to={directTo}>
                <div className="nav-box-container">
                    {visual === 0 ? <YourIdealDayVisual/> : 
                    visual === 1 ? <MeetingsVisual /> : <FlexibleHoldsVisual />}
                    <header className="nav-box-label"> {label} </header>
                </div>
            </NavLink>
        </div>
    )
}