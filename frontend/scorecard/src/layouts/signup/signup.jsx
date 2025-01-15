import { useState } from 'react'
import './signup.scss'
import {Link} from 'react-router-dom'

function signup({setsignup}) {
  const[name, setname] = useState("");
  const[email, setemail] = useState("");
  const[password, setpassword] = useState("");
  const[confirmpassword, setconfirmpassword] = useState("");
  const[message, setmessage] = useState("");

  const signhandler = async(event) =>{
    event.preventDefault();
    let answer = "here you will get answer"
    //1. confirm password and password is same
    if(password == confirmpassword){
      //2. send data to server
        try{
           const response = await fetch("http://localhost:3000/signup", {
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: name, email : email, password : password}),
          })

          if(response.status == 201){
            setsignup(true)
          }
          else{
            setmessage("user not created")
          }

        }catch(error){
          console.log(error);
        }
    }
    else{
      setmessage(answer)
    }

    

    //3. signup information is sucessfully send to server and stored in database

    //4. redirect user to login page

        
    console.log(name,email,password, confirmpassword)
  }
  
  return (
    <div>
      <div className="signuppage">
        <div className="signupheader">
            <h3>Sign Up</h3>
        </div>
        <div className="divider"></div>
        <div className="signupcontainer">
            <div className="signupbanner">
                <img></img>
            </div>
            <div className="signupform">
                <form onSubmit={signhandler}>
                    <label>Name</label>
                    <input type="text" placeholder="name" value={name} onChange={(e) => {setname(e.target.value)}} required/>

                    <label>Email</label>
                    <input type="email" placeholder="email" value={email} onChange={(e) => {setemail(e.target.value)}} required/>

                    <label>password</label>
                    <input type="password" placeholder="password" value={password} onChange={(e) => {setpassword(e.target.value)}} required/>

                    <label>confirm password</label>
                    <input type="password" placeholder="confirm password" value={confirmpassword} onChange={(e) => {setconfirmpassword(e.target.value)}} required/>

                    <button>Sign Up</button>
                </form>

                <div className="login-footer">
                    <p>{message}</p>
                    <p>already have an account?<Link to="/Login">Login now!</Link></p>
                </div>
            </div>

            

        </div>
      </div>
    </div>
  )
}

export default signup
