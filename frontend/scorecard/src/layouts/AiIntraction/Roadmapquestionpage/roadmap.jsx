import React from 'react';
import './roadmap.scss';

function roadmap({ userid, setroadmapgen }) {
  const [job, setjob] = React.useState("");
  const [duration, setduration] = React.useState("");
  const [level, setlevel] = React.useState("");

  const RoadmapGenHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/roadmapgenerator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, job, duration, level }),
      });

      if (response.status === 201) {
        console.log("User roadmap created successfully");
        setroadmapgen(true);
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
  };

  return (
    <div>
      <div className="InfoForRoadmapPage">
        <div className="InfoHeader">
          <h3>Welcome to AI Trainer</h3>
          <div className="divider"></div>
        </div>
        <div className="InfoContainer">
          <div className="InfoField">
            <form onSubmit={RoadmapGenHandler}>
              <label>Input Job you want to prepare for</label>
              <input
                type="text"
                placeholder="Input Job"
                value={job}
                onChange={(e) => setjob(e.target.value)}
                required
              />
              <label>Input Duration for preparation</label>
              <input
                type="number"
                placeholder="Input duration in months"
                value={duration}
                onChange={(e) => setduration(e.target.value)}
                required
              />
              <label>Input level</label>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="nothing"
                  onClick={() => setlevel("nothing")}
                />
                Nothing
              </label>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="Intermediate"
                  onClick={() => setlevel("Intermediate")}
                />
                Intermediate
              </label>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="Expert"
                  onClick={() => setlevel("Expert")}
                />
                Expert
              </label>
              <button>Next</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default roadmap;
