export default function HomeStats({value, previousValue, label, isPercentage, color, unit}) {

    const determineTrend = () => {
        if (isPercentage) {
            if (previousValue > value) {
                const percentageDecrease = Math.round((previousValue - value) / previousValue * 100);
                return `🡣 ${percentageDecrease}% `;
            }
            const percentageIncrease = Math.round((value - previousValue) / previousValue * 100);
            return `🡡 ${percentageIncrease}% `;
        }
        if (previousValue > value) {
            const decrease = previousValue - value;
            return `- ${decrease} `;
        }
        const increase = value - previousValue;
        return `+ ${increase} `;
    }

    return (
        <div className="home-stats">
            <header className="home-stats-value" style={{
                color: color
            }}> {`${value} ${unit}`}</header>
            <header className="home-stats-label"> {label} </header>
            <header className="home-stats-trend"> 
                <span 
                className={previousValue > value ? "home-stats-trend-decrease" : "home-stats-trend-increase"}> 
                {determineTrend()} 
                </span> 
                vs previous week </header>
        </div>
    )
}