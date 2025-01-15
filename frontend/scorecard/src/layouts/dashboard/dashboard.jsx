
import './dashboard.scss';
import StreakCalendar from '../../components/streakclander/streakcal';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="progress">
        <div className="progressInNumber">
          <div className="totalSubject">
            <span className="number">10</span>
            <h5>Total Subjects</h5>
          </div>
          <div className="totalTask">
            <span className="number">10</span>
            <h5>Total Tasks</h5>
          </div>
          <div className="finishedTask">
            <span className="number">10</span>
            <h5>Finished Tasks</h5>
          </div>
          <div className="subjectFinished">
            <span className="number">10</span>
            <h5>Subjects Finished</h5>
          </div>
        </div>
        <div className="progressDaysCompleted">
          <h3>Your Working Days</h3>
          <StreakCalendar />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
