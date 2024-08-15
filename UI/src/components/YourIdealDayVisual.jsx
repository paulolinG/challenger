import "bootstrap-icons/font/bootstrap-icons.css"

export default function YourIdealDayVisual() {
    return (
        <div className="your-ideal-day-visual-container">
            <div className="your-ideal-day-visual-col1">
                <div className="your-ideal-day-visual-col1-item">
                    <i className="bi bi-lightbulb"></i>
                    <header style={{
                        margin: "5px 0",
                    }}> Focus Time </header>
                </div>
                <div className="your-ideal-day-visual-col1-item">
                    <i className="bi bi-magic"></i>
                    <header style={{
                        margin: "5px 0",
                    }}> Resolve Conflicts </header>
                </div>
            </div>
            <div className="your-ideal-day-visual-col2">
                <div className="your-ideal-day-visual-col2-item">
                    <i className="bi bi-egg-fried"></i>
                    <header style={{
                        margin: "5px 0",
                    }}> Lunch </header>
                </div>
                <div className="your-ideal-day-visual-col2-item">
                    <i className="bi bi-droplet-fill"></i>
                    <header style={{
                        margin: "5px 0",
                    }}> Meeting Breaks </header>
                </div>
                <header className="your-ideal-day-visual-col2-footer"> 3 more </header>
            </div>
        </div>
    )
}