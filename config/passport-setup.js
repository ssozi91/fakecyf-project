var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var keys = require('./keys');
var dbs = require('./db.js');
var pool = dbs.getPool();

passport.serializeUser((currentUser, done) => {
    done(null, currentUser.github_id);
});

passport.deserializeUser((currentUser, done) => {

        done(null, currentUser.github_id);

});



passport.use(new GitHubStrategy({
    clientID: keys.github.GITHUB_CLIENT_ID,
    clientSecret: keys.github.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        // console.log(profile);

      // pool.connect((error, db, done)=>{
      // if(error){
      //   return console.log(error);
      // }
      // else {
      //   db.query('INSERT INTO rays (userid, userName) VALUES ($1, $2)',
      //   [profile.id,profile.login]);
      //     done();
      //   }
      // });

      pool.connect((error, db, done)=>{
        //   var query = {
        //   text: 'INSERT INTO users (github_id, github_username,github_profile_url,github_email,github_avatar_url) VALUES ($1, $2,$3,$4,$5)',
        //   values: [profile.id, profile._json.login,profile._json.url,profile._json.email,profile._json.avatar_url]
        // }
        //
        // // if(github_id===profile.id){
        // //   console.log("exits")
        // // }else{
        // //   db.query(query)
        //   .then(res => console.log(res.rows))
        //   .catch(err => console.error(err));
        //   done(null, user);
        //   // console.log(profile);
        // // }

      if(error){
        return console.log(error);
      }
      else {


        db.query('SELECT * FROM users WHERE github_id = $1',[profile.id],(error, user)=>{
          done();
          const currentUser = {id:user.rows[0]}
          if(error){
            return console.log(error);
          }
          else {
            if(user.rowCount){
              console.log("registered user")
              done(null,currentUser);
            } else{
              db.query('INSERT INTO users (github_id, github_username,github_profile_url,github_email,github_avatar_url) VALUES ($1, $2,$3,$4,$5)',
              [profile.id,profile._json.login,profile._json.url,profile._json.email,profile._json.avatar_url] ,(error, profile)=>{
                if(error){
                  return console.log(error);
                }
                else {
                  //console.log("am the"+profile)
                }
                done(null,currentUser);
              })
            }
          }
        })



      }

        });
    }));
