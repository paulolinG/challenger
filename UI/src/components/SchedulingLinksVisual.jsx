import "bootstrap-icons/font/bootstrap-icons.css"

export default function SchedulingLinksVisual() {
    return (
        <div className="scheduling-links-visual-container">
            <header style={{display: "inline"}}> {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })} </header>
            <i className="bi bi-send-check-fill" style={{display: "inline", marginLeft: "15px"}}></i>
        </div>
    )
}