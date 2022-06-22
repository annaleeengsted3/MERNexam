import React, { useState } from 'react';
import AuthService from "./AuthService";

export default function AddComment(props) {
    const id= props._id;
    const authService = new AuthService(`${props.api_url}/users/authenticate`);
    const [comment, setComment] = useState("");
    const [hasAdded, setAdded] = useState(false);
    let isLoggedIn = false;
 
  if(authService.loggedIn()){
    isLoggedIn=true;
  
  }

  let addedPart = <p></p>;
  if(hasAdded && isLoggedIn){
    addedPart = <p>Your comment has been added!</p>
  } else if(hasAdded && !isLoggedIn){
    addedPart = <p>Please login to comment</p>
  }

  //TODO: make this nicer
  return (
    <section className="ask">
    <h3>Comment!</h3>
    <form>
    <input type="text" placeholder="Write your comment here" size="100"
        onChange={
          (event) => {
            setComment(event.target.value)
          }
        } />
     
      <button type="button" onClick={function(event){ if(isLoggedIn){props.addComment(comment, id)}; setAdded(true)} }>Add Comment</button>
     
    </form>
      {addedPart}
    </section>
  );
}
