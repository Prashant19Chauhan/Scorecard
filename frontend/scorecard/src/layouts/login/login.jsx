import { useState } from 'react';
import './login.scss'
import { Link } from 'react-router-dom'

function login({setlogin, setuserid}) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");

  const emailchange = (event) => {
    setemail(event.target.value);
  }
  
  const passwordchange = (event) =>{
    setpassword(event.target.value);
  }
  
  const loginhandler = async(event) =>{
    event.preventDefault();
    try{
      const response = await fetch("http://localhost:3000/login", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:email, password:password}),
      })

      const userid = await response.json();

      if(response.status == 201){
        setlogin(true)
        setuserid(userid.userId);
      }
      if(response.status == 401){
        setmessage("user not found")
      }
      
    }catch(error){
      console.log(error)
    }

  };

  return (
    <div className="login">
      <div className="loginPage">
        <div className="sideBanner"></div>
        <div className="loginForm">
        <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={loginhandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={emailchange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={passwordchange} required />
          </div>
          <button type="submit" className="btn-login">Login</button>
        </form>
        <div className="login-footer">
          <p>{message}</p>
          <p>Dont have an account? <a href="#register"><Link to="/Signup">Sign up</Link></a></p>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  )
}

export default login


