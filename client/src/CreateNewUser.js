import AuthService from "./AuthService";
import { useState } from "react";
import { Link } from "@reach/router";

function CreateNewUser(props) {
  const authService = new AuthService(`${props.url}/users/authenticate`);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");


  function onSubmit() {
    const bodyData= {username: newUsername, password: newPassword};

    const fetchData = async () => {
        const response = await authService.fetch(`${props.url}/users/`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData),
          });
        const data = await response.json();
        console.log(data.msg);
        if(data.msg === undefined){
            setUserMessage("New user created! Login to post and comment");

        }else{
            setUserMessage(data.msg);
        }
      };
      fetchData();

  }

  return (
    <div className="newuser">
      <h3>Create new user:</h3>

      <input onChange={(event) => setNewUsername(event.target.value)} 
        type="text" name="username" placeholder="username"></input>
      <input onChange={(event) => setNewPassword(event.target.value)} 
        type="password" name="password" placeholder="password"></input>
      
      <button
        type="button"
        onClick={() => onSubmit()}>Create new user!
      </button>
<p>{userMessage}</p>
      <button><Link to="/">Back</Link></button>
    </div>
  )

}


export default CreateNewUser;