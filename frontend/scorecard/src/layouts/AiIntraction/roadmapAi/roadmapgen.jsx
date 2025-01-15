import React from "react";
import { Link } from "react-router-dom";
import "./roadmapgen.scss"; // Import the SCSS file

function Roadmapgen({ userid }) {
  const [message, setMessage] = React.useState("Click to generate roadmap");
  const [reload, setReload] = React.useState(null);

  const roadmaoGenHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/gen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid }),
      });
      if (response.status === 201) {
        setMessage("Roadmap created successfully. Give some time, it will be visible on the sidebar.");
        setReload(() => {
          return (
            <Link to={"/"} className="reload-link">
              Reload
            </Link>
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="roadmapgen-container">
      <button className="generate-button" onClick={roadmaoGenHandler}>
        Generate Study Roadmap & Material
      </button>
      <p className="message">{message}</p>
      <div className="reload-container">{reload}</div>
    </div>
  );
}

export default Roadmapgen;
