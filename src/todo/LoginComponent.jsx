import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

const LoginComponent = () => {

    const [username, setUsername] = useState('in28minutes'); // to access the username and change
    const [password, setPassword] = useState(''); // to access the password and change accordingly
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate(); // accessing the useNavigate hook from react-router-dom

    const authContext = useAuth(); // accessing the useAuth() method from AuthContext.js

    // with the onChange Listener if the username is changed this function will get executed
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);// setting the usename 
    }

    // with the onChange Listener if the password is changed this function will get executed
    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // setting the password 
    }

    // if we click the submit button this function gets executed
    const handleSubmit = () => {

        // if authContext.login(username, password) returns true
        if(authContext.login(username, password)){
            navigate(`/welcome/${username}`); // navigates to /welcome/{username}
        }else{
            setShowErrorMessage(true); 
        }
    }

    return (
      <div className='Login'>
        
        <h1>Time to Login!</h1>
        
        { showErrorMessage && <div className='errorMessage'>Authenticated Failed. Please check you credentials.</div> }
            
        <div className='LoginForm'>
            
            <div>
                <label>User Name</label>
                <input type="text" name='username' value={username} onChange={handleUsernameChange}/>
            </div>
            
            <div>
                <label>Password</label>
                <input type="password" name='password' value={password} onChange={handlePasswordChange}/>
            </div>
            
            <div>
                <button type='submit' onClick={handleSubmit}>Login</button>
            
            </div>
        
        </div>

      </div>
    )
}

export default LoginComponent;