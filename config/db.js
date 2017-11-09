var path = require('path');
var pg = require('pg');
require('dotenv/config');
 console.log(process.env);

var pool = new pg.Pool({
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  max: 20,
  host: process.env.DB_HOST,
  user:process.env.DB_USER
});
console.log(pool);
console.log("pooled");
//quering the database
pool.connect((error, db, done)=>{
  if(error){
    return console.log(error);
  }
  else {
    db.query('SELECT * from USERS',(error, table)=>{
      done();
      if(error){
        return console.log(error);
      }
      else {
        console.log(table);
      }
    })
  }
});
module.exports = {
    getPool: function () {
      if (pool){
      return pool;
    } // if it is already there, grab it here
      // pool = new pg.Pool(config);
      // return pool;
}};
