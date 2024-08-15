export default function HomeDate() {
    const getWeek = () => {
        const currentDate = new Date();
        const firstDayOfWeek = new Date();
        const lastDayOfWeek = new Date();
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - currentDate.getDay() + 1);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

        return `${monthNames[firstDayOfWeek.getMonth()]} ${firstDayOfWeek.getDate()} - ${lastDayOfWeek.getDate()}, ${firstDayOfWeek.getFullYear()}`;
    }

    return (
        <div className="home-date-container">
            <header className="home-date-header"> This week </header>
            <header className="home-date-week"> {getWeek()} </header>
        </div>
    )
}