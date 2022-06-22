import React from 'react';
import PostListView from './PostListView';


export default function Posts(props){
    let shownPosts = props.posts;
    if(props.topic === undefined){
      shownPosts= props.posts.sort(function(a,b){
        return new Date(b.votes) - new Date(a.votes);
      });
  } else{
    shownPosts= filterPosts(props.topic).sort(function(a,b){
      return new Date(b.votes) - new Date(a.votes);
    });;
  }
    
   

    function filterPosts(i){
      return props.posts.filter(post => {
         if (post.topic === i) {
          return true;
         } else {
           return false;
         }
       });
 
       }

        return (
            <>
              <section className="questions">
               {props.loggedIn}
                {shownPosts.slice(0,15).map((post, index) =>
                  <article key={index}>
                    <span>{index+1}</span>
                    <PostListView post={post} authService={props.authService} url={props.url}></PostListView>
                  </article>)}
              </section>
              </>
          );
    


}