module.exports = (mongoose) => {
  const postSchema = new mongoose.Schema({
    title: String,
    topic: String,
    author: String,
    date: Date,
    votes: Number,
    comments: [{
      comment:String,
      author: String,
      votes: Number,
      date: Date 
      }],
  });

  const topicSchema = new mongoose.Schema({
    title: String
  });

  const postModel = mongoose.model('post', postSchema);
  const topicModel = mongoose.model('topic', topicSchema);

  const topics = ["TV", "News", "Funny", "Sports", "Random"]

  async function getPosts() {
    try {

      return await postModel.find();
    } catch (error) {
      console.error("getPosts:", error.message);
      return {};
    }
  }

  async function getTopics() {
    try {
      return await topicModel.find();
    } catch (error) {
      console.error("getTopics:", error.message);
      return {};
    }
  }

  async function getPost(id) {
    try {
      return await postModel.findById(id);
    } catch (error) {
      console.error("getPost:", error.message);
      return {};
    }
  }

  async function createPost(post) {
  
    let newPost = new postModel(post);
    return newPost.save();
  }
  

  async function updateComments(comment) { 
    let postToUpdate =  await postModel.findById(comment._postid);
   if(comment.votes > 0){
      const commentToUpdate =postToUpdate.comments.find(post=> post.comment== comment.comment);
commentToUpdate.votes = comment.votes;
   } else if(comment.votes === 0){
      postToUpdate.comments.push({comment: comment.comment, author: comment.author, votes: comment.votes, date: comment.date})
   }
    postToUpdate.save();
    return postModel.findById(comment._postid);
  }



  async function updatePost(post) {
    let postToUpdate =  await postModel.findById(post._id);
postToUpdate.votes = post.votes;
    postToUpdate.save();
    return postModel.findById(post._id);
  }

  async function bootstrap() {
    let l = (await getPosts()).length;
    console.log("Question collection size from bootstrap():", l);
//if there are no posts, create test data:
    if (l === 0) {
      let promises = [];
      let initQuestions= [
        {
        title:"Why didn't the eagles just fly the ring to mordor...", 
        topic: topics[0], 
        author: "lotr123", 
        date: new Date('2020-12-09'),
        votes: 23,
        comments:[{comment: "omg I can't even", votes: 23, author:"catlover", date: new Date("2020-12-10")}] 
        }, 
        {
          title:"Can someone explain the Dark(netflix) timeline?", 
          topic: topics[0], 
          author: "lotr123", 
          date: new Date('2020-12-10'),
          votes: 18,
          comments:[{comment: "I wouldn't know where to start", votes: 32, author:"user3", date: new Date("2020-12-10")}] 
          }, 
          {
            title:"I'm still mad about the Lost season finale", 
            topic: topics[0], 
            author: "user123", 
            date: new Date('2020-11-03'),
            votes: 11,
            comments:[{comment: "don't even get me started on Game of Thrones", votes: 23, author:"catlover", date: new Date("2020-11-04")}] 
            }, 
            {
              title:"Why are there no movies coming out?", 
              topic: topics[0], 
              author: "randomUser", 
              date: new Date('2021-01-09'),
              votes: 5,
              comments:[{comment: "because of corona dude..", votes: 14, author:"user3", date: new Date("2021-01-09")}] 
              }, 
              {
                title:"What's the worst movie you've ever seen?", 
                topic: topics[0], 
                author: "lotr123", 
                date: new Date('2021-01-23'),
                votes: 76,
                comments:[{comment: "The Room!!!!", votes: 65, author:"doglover", date: new Date('2021-01-23')}, {comment: "Definitely the room, you're tearing me apart Lisa!!!", votes: 58, author:"booklover", date: new Date('2021-01-24')}] 
                }, 
                {
                  title:"What's the best movie ever?", 
                  topic: topics[0], 
                  author: "tommyWiseau", 
                  date: new Date('2021-02-14'),
                  votes: 15,
                  comments:[{comment: "Lord of the Rings!!", votes: 2, author:"lotr123", date: new Date('2021-02-14')}] 
                  }, 
                  {
                    title:"Why is Disney making so many live-action remakes of classics?", 
                    topic: topics[0], 
                    author: "user123", 
                    date: new Date('2021-02-15'),
                    votes: 4,
                    comments:[{comment: "MONEY", votes: 42, author:"randomguy01", date: new Date('2021-02-15')}] 
                    }, 
                    {
                      title:"Why is Disney making so many live-action remakes of classics?", 
                      topic: topics[0], 
                      author: "user123", 
                      date: new Date('2021-02-15'),
                      votes: 4,
                      comments:[{comment: "MONEY", votes: 42, author:"randomguy01", date: new Date('2021-02-15')}] 
                      }, 
                      {
                        title:"Anyone watch Harry Potter", 
                        topic: topics[0], 
                        author: "harry123", 
                        date: new Date('2020-12-17'),
                        votes: 3,
                        comments:[{comment: "literally everyone has watched Haryy Potter", votes: 23, author:"catlover", date: new Date("2020-12-17")}] 
                        }, 
                        {
                          title:"Who is playing that one guy in the new Thor movie", 
                          topic: topics[0], 
                          author: "lotr123", 
                          date: new Date('2020-12-09'),
                          votes: 0,
                          comments:[] 
                          }, 
                         
        {
        title:"What's going on with all the UFO articles", 
        topic: topics[1], 
        author: "thetruthisoutthere", 
        date: new Date('2021-01-09'),
        votes: 84,
        comments:[{comment: "even Obama admitted it", votes: 13, author:"area51", date: new Date("2021-01-10")}] 
        }, 
        {
          title:"Did you hear about Biden's new plans?", 
          topic: topics[1], 
          author: "user123", 
          date: new Date('2021-01-08'),
          votes: 14,
          comments:[{comment: "He's getting a lot more done than that orange guy", votes: 13, author:"user7", date: new Date("2021-01-08")}] 
          }, 
          {
            title:"Forest fires in Australia are wiping out the koalas", 
            topic: topics[1], 
            author: "aussie", 
            date: new Date('2021-01-10'),
            votes: 17,
            comments:[{comment: "It's so sad!", votes: 5, author:"user8", date: new Date("2021-01-10")}] 
            }, 
            {
              title:"Now Australia has mice plague", 
              topic: topics[1], 
              author: "aussie", 
              date: new Date('2021-05-28'),
              votes: 20,
              comments:[{comment: "wow you guys...", votes: 13, author:"user8", date: new Date("2021-05-28")}] 
              }, 
              {
                title:"Volcano in Iceland has erupted", 
                topic: topics[1], 
                author: "icelander", 
                date: new Date('2021-03-27'),
                votes: 17,
                comments:[{comment: "please don't close the airports again", votes: 24, author:"admin", date: new Date("2021-03-27")}] 
                }, 
                {
                  title:"New strain of corona virus discovered", 
                  topic: topics[1], 
                  author: "icelander", 
                  date: new Date('2021-04-16'),
                  votes: 4,
                  comments:[] 
                  }, 
                  {
                    title:"Another strain of corona virus discovered", 
                    topic: topics[1], 
                    author: "admin", 
                    date: new Date('2021-04-17'),
                    votes: 3,
                    comments:[] 
                    }, 
                    {
                      title:"A third strain of corona virus discovered", 
                      topic: topics[1], 
                      author: "admin", 
                      date: new Date('2021-04-18'),
                      votes: 2,
                      comments:[] 
                      }, 
                      {
                        title:"Wow you guys won't believe it, a fourth strain of corona virus discovered", 
                        topic: topics[1], 
                        author: "admin", 
                        date: new Date('2021-04-19'),
                        votes: 1,
                        comments:[{comment: "please stop", votes: 24, author:"user3", date: new Date("2021-04-19")}] 
                        }, 
                        {
                          title:"Some other news not related to corona virus", 
                          topic: topics[1], 
                          author: "admin", 
                          date: new Date('2021-04-20'),
                          votes: 0,
                          comments:[] 
                          }, 
                          {
                            title:"New species of fish discovered in Pacific Ocean", 
                            topic: topics[1], 
                            author: "admin", 
                            date: new Date('2021-04-24'),
                            votes: 0,
                            comments:[] 
                            }, 
          {
            title:"Hehe check out this funny video", 
        topic: topics[2], 
        author: "notarickroll", 
        date: new Date('2021-03-23'),
        votes: 12,
        comments:[{comment: "nice", author:"nice123", votes: 23, date: new Date("2021-03-24")}] 
          },
          {
            title:"Trump thinks he's going to be re-elected", 
        topic: topics[2], 
        author: "user3", 
        date: new Date('2021-06-02'),
        votes: 19,
        comments:[{comment: "lol", author:"nice123", votes: 4, date: new Date("2021-06-02")}] 
          },
          {
            title:"Try not to laugh https://www.youtube.com/watch?v=Lrj2Hq7xqQ8", 
        topic: topics[2], 
        author: "admin", 
        date: new Date('2021-05-02'),
        votes: 87,
        comments:[{comment: "hehe", author:"notarickroll", votes: 67, date: new Date("2021-05-02")}] 
          }, 
          {
            title:"What's your favorite meme", 
        topic: topics[2], 
        author: "admin", 
        date: new Date('2021-05-03'),
        votes: 17,
        comments:[{comment: "Gavin all the way", author:"user3", votes: 67, date: new Date("2021-05-04")}] 
          }, 
          {
            title:"What are some of the best dad jokes", 
        topic: topics[2], 
        author: "user3", 
        date: new Date('2021-05-03'),
        votes: 45,
        comments:[{comment: "I'm afraid for the calendar. Its days are numbered.", author:"admin", votes: 67, date: new Date("2021-05-04")}, {comment: "Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.", author:"lotr123", votes: 46, date: new Date("2021-05-06")}] 
          },
          {
            title:"Best party games?", 
        topic: topics[2], 
        author: "user3", 
        date: new Date('2021-05-09'),
        votes: 4,
        comments:[] 
          },  
          {
            title:"Another funny video", 
        topic: topics[2], 
        author: "user3", 
        date: new Date('2021-05-12'),
        votes: 6,
        comments:[] 
          }, 
          {
            title:"Another funny post", 
        topic: topics[2], 
        author: "randomguy07", 
        date: new Date('2021-05-11'),
        votes: 7,
        comments:[] 
          }, 
          {
            title:"What did the zero say to the eight?", 
        topic: topics[2], 
        author: "randomguy08", 
        date: new Date('2021-05-11'),
        votes: 21,
        comments:[{comment: "That belt looks good on you.", author:"randomguy08", votes: 25, date: new Date("2021-05-04")}] 
          },
          {
            title:"Another dad joke", 
        topic: topics[2], 
        author: "randomguy09", 
        date: new Date('2021-05-25'),
        votes: 4,
        comments:[] 
          },          
          {
            title:"Any updates on Tokyo 2021", 
            topic: topics[3], 
            author: "sportsman", 
            date: new Date('2021-03-23'),
            votes: 22,
            comments:[{comment: "no idea", author:"nice123", votes: 9, date: new Date("2021-03-24")}] 
          },
          {
            title:"Some tennis news", 
            topic: topics[3], 
            author: "sportsman2", 
            date: new Date('2021-04-22'),
            votes: 4,
            comments:[{comment: "wow much tennis", author:"user123", votes: 3, date: new Date("2021-04-24")}] 
          },
          {
            title:"The latest in golf", 
            topic: topics[3], 
            author: "sportsman2", 
            date: new Date('2021-04-26'),
            votes: 3,
            comments:[{comment: "something about tiger woods", author:"user123", votes: 2, date: new Date("2021-04-26")}] 
          },
          {
            title:"Formula 1", 
            topic: topics[3], 
            author: "sportsman2", 
            date: new Date('2021-04-26'),
            votes: 6,
            comments:[{comment: "cars go vroom", author:"user5", votes: 2, date: new Date("2021-04-26")}] 
          },
          {
            title:"I really don't know anything about sports", 
            topic: topics[3], 
            author: "admin", 
            date: new Date('2021-05-26'),
            votes: 8,
            comments:[{comment: "wow I would have never been able to tell", author:"user6", votes: 2, date: new Date("2021-05-26")}] 
          },
          {
            title:"Djokovic may reconsider Olympics", 
            topic: topics[3], 
            author: "admin", 
            date: new Date('2021-05-26'),
            votes: 5,
            comments:[] 
          },
          {
            title:"Eric Lamaze has withdrawn from Olympics due to health", 
            topic: topics[3], 
            author: "admin", 
            date: new Date('2021-05-30'),
            votes: 9,
            comments:[] 
          },
          {
            title:"Farah focused on setting records in Tokyo", 
            topic: topics[3], 
            author: "admin", 
            date: new Date('2021-05-27'),
            votes: 3,
            comments:[] 
          },
          {
            title:"Usain Bolt sets another record somewhere...", 
            topic: topics[3], 
            author: "admin", 
            date: new Date('2021-05-14'),
            votes: 0,
            comments:[] 
          },
          {
            title:"Simone Biles gets 10/10", 
            topic: topics[3], 
            author: "admin", 
            date: new Date('2021-05-11'),
            votes: 0,
            comments:[] 
          },
          {
            title:"How to knit a sweater", 
            topic: topics[4], 
            author: "user3", 
            date: new Date('2021-05-28'),
            votes: 8,
            comments:[{comment: "there's definitely some tutorials on YouTube", author:"user6", votes: 2, date: new Date("2021-05-28")}] 
          },
          {
            title:"Why is my plant dying", 
            topic: topics[4], 
            author: "user5", 
            date: new Date('2021-05-15'),
            votes: 36,
            comments:[{comment: "Forget to water it?", author:"user9", votes: 2, date: new Date("2021-05-16")},{comment: "Water it too much?", author:"user10", votes: 5, date: new Date("2021-05-16")}, {comment: "Not enough sun?", author:"user4", votes: 3, date: new Date("2021-05-16")}] 
          },
          {
            title:"I think my cat is plotting something", 
            topic: topics[4], 
            author: "randomdude03", 
            date: new Date('2021-06-01'),
            votes: 31,
            comments:[{comment: "Definitely is", author:"user9", votes: 5, date: new Date("2021-06-01")}] 
          },
          {
            title:"How do I switch tabs on Chrome?", 
            topic: topics[4], 
            author: "user3", 
            date: new Date('2021-06-02'),
            votes: 25,
            comments:[{comment: "Oh man I can never remember", author:"admin", votes: 6, date: new Date("2021-06-02")}] 
          },
          {
            title:"Can someone help me with my math homework", 
            topic: topics[4], 
            author: "user123", 
            date: new Date('2021-06-02'),
            votes: 12,
            comments:[{comment: "dude", author:"user3", votes: 67, date: new Date("2021-06-02")}] 
          },
          {
            title:"Book recommendations?", 
            topic: topics[4], 
            author: "admin", 
            date: new Date('2021-06-04'),
            votes: 5,
            comments:[] 
          },
          {
            title:"How long can leftovers last in the fridge ", 
            topic: topics[4], 
            author: "user123", 
            date: new Date('2021-04-04'),
            votes: 3,
            comments:[] 
          },
          {
            title:"Why is the sky blue", 
            topic: topics[4], 
            author: "user7", 
            date: new Date('2021-04-10'),
            votes: 1,
            comments:[] 
          },
          {
            title:"Tips for picking the right color wall paint", 
            topic: topics[4], 
            author: "randompainter", 
            date: new Date('2021-04-04'),
            votes: 5,
            comments:[] 
          },
          {
            title:"Why can't penguins fly", 
            topic: topics[4], 
            author: "user5", 
            date: new Date('2021-06-04'),
            votes: 0,
            comments:[] 
          }
          ]
      for (let i = 0; i < initQuestions.length; i++) {
        let newPost = new postModel(initQuestions[i]);
      
        promises.push(newPost.save());
      }

    
      return Promise.all(promises);
    }
  
    let t = (await getTopics()).length;
    if(t===0){
      topics.forEach(topic=>{
        let topicToAdd = new topicModel({title: topic});
        topicToAdd.save();
      })
   
    }
  }

  return {
    getPosts: getPosts,
    getTopics: getTopics,
    getPost: getPost,
    createPost: createPost,
    updateComments: updateComments,
    updatePost: updatePost,
    bootstrap
  }
}