
import "./StreakCalendar.scss";

function StreakCal() {
  const TotalMonths = 12;
  const DayInMonth = 36;

  // Function to generate days for each month
  const streakdayreturn = () => {
    return Array.from({ length: DayInMonth }, (_, index) => {
      const Bg = index < 31 ? "green" : "grey";
      return (
        <div key={index} className="dayNumber" style={{ backgroundColor : Bg }}>
          {index + 1}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="streakcal">
        {Array.from({ length: TotalMonths }, (_, index) => (
          <div key={index} className="streakmonthsec">
            <div>{`Month ${index + 1}`}</div> {/* You can change this to dynamic month names */}
            <div className="streakmonthcal">
              {streakdayreturn()}  {/* Call the function to render the days */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreakCal;
