import './sidebar.scss'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

function sidebar({userid}) {
    const [skills, setSkills] = useState(new Set()); // Using a Set to store unique skills
    const [name, setname] = useState(null);

  useEffect(() => {
    async function fetchSidebardata() {
      try {

        // Otherwise, fetch data from the server
        const response = await fetch(`http://localhost:3000/?userid=${userid.userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch sidebar data");
        }

        const data = await response.json();
        const topic = data.findtopicforSidbar;
        setname(data.name);

        const newSkills = new Set();
        topic.forEach((item) => {
          newSkills.add(item);
        });

        // Store the data in both state and localStorage
        setSkills(newSkills);
        
        console.log("Fetched and stored skills:", newSkills);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    }

    fetchSidebardata();
  }, [userid]);

  const skillArray = Array.from(skills); // Convert Set or object to array if necessary
  
const skillview = skillArray.map((data, index) => {
  const skill = data.skill;
  const topic = data.Topics.split(','); // Split Topics into an array
  const topicSet = new Set(topic);
  const topicArray = Array.from(topicSet);
  
  return (
    <div key={index + 1}>
      <h4>{data.Skill}</h4> {/* Display Skill Name */}
      <ul>
        {topicArray.map((topic, topicIndex) => (
          <li key={topicIndex + 1}>
            <Link to={`/taskpage?task=${topic.trim()}`}>{topic.trim()}</Link> {/* Link to taskpage */}
          </li>
        ))}
      </ul>
    </div>
  );
});

  return (
    <div>
      <div className='sidebar'>
        <div className='logodiv'>
            <div className='logo'>
                <h1>Scorecard</h1>
            </div>
            <div className='togglebtn'>
                X
            </div>
        </div>

        <div className='menudiv'>
            <ul>
                <h3>Weclome {name}</h3>
                <li><Link to='/'>Profile</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
            </ul>
        </div>

        <div className='Coursesdiv'>
            <div className='coursesHeader'>
                <h3>Courses</h3>
                <button><Link to={'roadmapgenerator'}>Add Courses</Link></button>
            </div>
            <div className='coursedisplay'>
                <ul>
                    {skillview}
                </ul>
            </div>
        </div>

        <div className='prioritydiv'>
            <ul>
                <h3>Status</h3>
                <li>urgent</li>
                <li>completed</li>
                <li>pending</li>
                <li>Backlog</li>
            </ul>
        </div>

      </div>
    </div>
  )
}

export default sidebar
