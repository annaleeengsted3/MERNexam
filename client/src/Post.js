import React from 'react';
import { Link } from "@reach/router";
import AddComment from './AddComment';
import Comment from './Comment';
import AuthService from "./AuthService";

export default function Post(props){
  let post= props.getPost(props._id);
  const authService = new AuthService(`${props.api_url}/users/authenticate`);



  
  let commentsmarkup= <p></p>
  if (post){
    commentsmarkup= <div> {post.comments.sort(function(a,b){
        return new Date(b.votes) - new Date(a.votes);
      }).map((comment, index) =>
      <div key={index} className="answer">
       <Comment comment={comment} post={post} url ={props.url} authService={authService}></Comment>
      </div>
      )}</div>
  }

//TO DO: GET post from GET request, send the id and not the entire post as props. that way auto update via state!!!


function addComment(comment, id) { 
    let author = authService.getUsername();
  
    const bodyData= {comment: comment, _postid: id, author: author, votes: 0, date: new Date(Date.now())}
    fetch(`${props.url}/comment/${id}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify(bodyData),
    })
    .then(response => console.log(response.json()))
    .then(data => {
      console.log("data: " + data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
  }

  if (post === undefined) {
    return <p>Nothing here</p>;
  } else{
    return (
      <>
      <div>
          <article className="question">
          <h2>{post.title}</h2>
        
                     <p><span className="italic comments">Comments: {post.comments.length}</span></p>
            
                 
          </article>
        <section>

        {commentsmarkup}
        </section>

        <AddComment addComment={addComment} _id={post._id} ></AddComment>
    
      
      </div>

      <button><Link to="/">Back</Link></button>
</>
    );
  } 



}