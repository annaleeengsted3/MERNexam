import React, { useState, useEffect } from 'react';
import { Link } from "@reach/router";


export default function PostListView(props){
    let post = props.post;

    const [postVotes, PostVotes] = useState(post.votes)
    const [postButton, setPostButton] = useState("▲ Upvote")


    useEffect(() => {
        if(post.votes !== postVotes){
            console.log("postvotes NOT equal");
            const updatedWithVotes ={
                title: post.comment,
                topic: post.topic,
                _id: post._id,
                votes: postVotes,
                author: post.author,
                date: post.date,
                comments: post.comments
            }
          fetch(`${props.url}/post/${post._id}`, {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.authService.getToken()}`
              },
              body: JSON.stringify(updatedWithVotes),
            })
            .then(response => console.log(response.json()))
            .then(data => {
              console.log("data: " + data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
           
  
          
    }, [postVotes]);


const options = { year: "numeric", month: "long", day: "numeric" };

        return (
            <>
             
                   <h4> <Link to={`/${post._id}`}>{post.title}</Link></h4>
                   <div>
                       <p><span className="italic">Topic: <span className="bold">{post.topic}</span></span></p>
                       <p><span className="italic">Author: <span className="bold">{post.author}</span></span></p>
                       <p><span className="italic">Date: {new Date(post.date).toLocaleString("en-US", options)}</span></p>
                       <p><button type="button" onClick={function(event){ if(props.authService.loggedIn()){PostVotes(postVotes + 1)}else{setPostButton("Please login to vote")}}}>{postButton}</button><span className="italic votes">{postVotes}</span></p>
                   </div>
                 
                 
           
              </>
          );
    


}