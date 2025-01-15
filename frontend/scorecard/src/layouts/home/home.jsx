
import './home.scss';

function home() {
  return (
    <div>
      <div className='profilePage'>
        <div className='profileContainer'>
          <div className='profileHeader'>
            <h3>Welcome Username</h3>
            <button>Edit Profile</button>
          </div>
          <div className='divider'></div>
          <div className='Profile'>
            <div className='ProfileImageContainer'>
              <img></img>
              <h3>User name</h3>
            </div>
            <div className='ProfileDetailContainer'>
              <ul>
                <li>Name : Prashant Chauhan</li>
                <li>Email : prashantchauhanwork@gmail.com </li>
                <li>Age : 20</li>
                <li>Phone no. : 9389061149</li>
                <li>Address : Clement town, Dehradun, Uttrakhand, India</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default home
