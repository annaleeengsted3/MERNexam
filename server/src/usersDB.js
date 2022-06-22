module.exports = (mongoose) => {
    const bcrypt = require('bcryptjs');  // Used for hashing passwords!

    const userSchema = new mongoose.Schema({
      username: String,
      hash: String,
    });

    
    const userModel = mongoose.model('user', userSchema);

  
    async function getUsers() {
      try {
  
        return await userModel.find();
      } catch (error) {
        console.error("getQuestion:", error.message);
        return {};
      }
    }


    async function createUser(username, password) {
      console.log("creating user");
      console.log(username + "," + password);
      try {
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(password, 10, function (err, hash) {
            if (err) reject(err); else resolve(hash);
          });
        });

        let newUser = new userModel({username: username, hash: hashedPassword});
        console.log("just before save");
        return newUser.save();

      } catch (error) {
        console.error("createUser:", error.message);
        return {};
      }
    }
    

  
    async function bootstrap(count = 10) {
      let l = (await getUsers()).length;
      console.log("User collection size from bootstrap():", l);
  //FOR TESTING ONLY- pre-created users
      if (l === 0) {
        let promises = [];
        let initUsers= [
          {
          username:"krdo", 
          password: "123"
          }, 
          {
            username:"admin", 
            password: "456"
          }, 
            {
                username:"user3", 
                password: "789"
            }
            ]

        

        initUsers.forEach(async (user, i)=>{
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(user.password, 10, function (err, hash) {
                  if (err) reject(err); else resolve(hash);
                });
              });


              user.hash = hashedPassword; 
              delete user.password; 

          let newUser = new userModel(user);
          promises.push(newUser.save());



        })
        
       
        return Promise.all(promises);
      }
    
    }
  
    return {
      getUsers: getUsers,
      createUser: createUser,
      bootstrap
    }
  }