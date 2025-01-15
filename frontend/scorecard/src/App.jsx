import React from 'react';
import './app.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './layouts/login/login';
import Layout from './layouts/layout/layout';
import Home from './layouts/home/home';
import Dashborad from './layouts/dashboard/dashboard';
import Roadmap from './layouts/AiIntraction/Roadmapquestionpage/roadmap';
import Signup from './layouts/signup/signup';
import Roadmapgen from './layouts/AiIntraction/roadmapAi/roadmapgen';
import Taskpage from './layouts/taskpage/taskpage';

function App() {
  const [islogin, setlogin] = React.useState(false);
  const [userid, setuserid] = React.useState('');
  const [issignup, setsignup] = React.useState(false);
  const [roadmapgen, setroadmapgen] = React.useState(false);

  return (
    <div>
      <Router>
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={islogin ? <Navigate to="/" /> : <Login setlogin={setlogin} setuserid={setuserid} />}
          />

          {/* Signup Route */}
          <Route
            path="/signup"
            element={issignup ? <Navigate to="/" /> : <Signup setsignup={setsignup} />}
          />

          {/* Protected Routes */}
          {islogin && (
            <>
              {/* Layout with Nested Routes */}
              <Route path="/" element={<Layout userid={userid} />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashborad />} />
                <Route path='taskpage' element={<Taskpage userid={userid}/>}/>
              </Route>

              {/* Roadmap Generator */}
              <Route
                path="/roadmapgenerator"
                element={
                  roadmapgen ? (
                    <Navigate to="/roadmapgen" />
                  ) : (
                    <Roadmap userid={userid} setroadmapgen={setroadmapgen} />
                  )
                }
              />
              <Route path="/roadmapgen" element={<Roadmapgen userid={userid} />} />
            </>
          )}

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to={islogin ? '/' : '/login'} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
