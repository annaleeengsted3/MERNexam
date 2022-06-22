import { useState } from "react";
import AuthService from "./AuthService";
import { Link } from "@reach/router";

function Login(props) {
  const {login} = props;
  const authService = new AuthService(`${props.url}/users/authenticate`);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
let errorMsg = "";

  function onSubmit() {
    console.log(username, password);
    login(username, password);
  }
if(!authService.loggedIn()){
  return (
    <div className="login">
      <h3>Login</h3>

      <input onChange={(event) => setUsername(event.target.value)} 
        type="text" name="username" placeholder="username"></input>
      <input onChange={(event) => setPassword(event.target.value)} 
        type="password" name="password" placeholder="password"></input>
      
      <button
        type="button"
        onClick={() => onSubmit()}>Login!
      </button>
      <p>{errorMsg}</p>
      <br></br>
      <br></br>
      <Link to="/newuser">Create new user</Link>
      <br></br>
      <br></br>
      <button><Link to="/">Back</Link></button>
    </div>
  );
} else if(authService.loggedIn()){
  return (
    <>
      <h3>Login</h3>

      <p>Logged in.</p>
    </>
  );
}
 
}

export default Login;