import "bootstrap-icons/font/bootstrap-icons.css"

export default function FlexibleHoldsVisual() {
    return (
        <div className="flexible-holds-visual-container">
            <div className="flexible-holds-visual-item" style={{
                height: "40%",
            }}>
                <i className="bi bi-car-front-fill"></i>
                <div className="rounded-rectangle" style={{
                    width: "180px",
                }}></div>
            </div>
            <div className="flexible-holds-visual-item" style={{
                height: "60%"
            }}>
                <i className="bi bi-lightning-charge-fill"></i>
                <div className="rounded-rectangle" style={{
                    width: "120px",
                }}></div>
            </div>
        </div>
    )
}