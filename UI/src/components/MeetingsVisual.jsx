import "bootstrap-icons/font/bootstrap-icons.css"

export default function MeetingsVisual() {
    return (
        <div className="meetings-visual-container">
            <div className="meetings-visual-item">
                <div className="meetings-visual-item-icon">
                    <i className="bi bi-telephone-fill"></i>
                    <div className="rounded-rectangle" style={{
                        width: "120px",
                    }}/>
                </div>
                <div className="meetings-visual-item-people">
                    <i className="bi bi-person-circle"></i>
                    <i className="bi bi-person-circle"></i>
                    <i className="bi bi-person-circle"></i>
                </div>
            </div>
            <div className="meetings-visual-item">
                <div className="meetings-visual-item-icon">
                    <i className="bi bi-telephone-fill"></i>
                    <div className="rounded-rectangle" style={{
                        width: "180px",
                    }}/>
                </div>
                <div className="meetings-visual-item-people">
                    <i className="bi bi-person-circle"></i>
                    <i className="bi bi-person-circle"></i>
                </div>
            </div>
            <div className="meetings-visual-item">
                <div className="meetings-visual-item-icon">
                    <i className="bi bi-telephone-fill"></i>
                    <div className="rounded-rectangle" style={{
                        width: "90px",
                    }}/>
                </div>
                <div className="meetings-visual-item-people">
                    <i className="bi bi-person-circle"></i>
                    <i className="bi bi-person-circle"></i>
                    <i className="bi bi-person-circle"></i>
                </div>
            </div>
        </div>
    )
}