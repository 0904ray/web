const database = require('../data/accounts.json');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');


async function register(account,username,password){
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '0904Ray',
      database: 'english_trainer'
    });

    // connect to the MySQL database
    console.log('Connected to MySQL database!');
    const [account_used] = await connection.execute('SELECT * FROM user WHERE account = ? ', [account]);
    if(!(account_used.length === 0)){
      return 2;
    }
    const [username_used] = await connection.execute('SELECT * FROM user WHERE name = ?', [username]);
    if(!(username_used.length === 0)){
      return 3;
    }
    const [password_used] = await connection.execute('SELECT * FROM user WHERE password = ?', [password]);
    if(!(password_used.length === 0)){
      return 4;
    }
    // Insert into the user table
    const uuid = uuidv4();
    await connection.execute('INSERT INTO `user`(`account`,`name`,`password`,`token`) VALUES(?, ?, ?, ?)', [account, username, password, uuid]);
    return uuid;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }

  /*// connect to the MySQL database
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database!');
    }
  });

  connection.query('INSERT INTO `user`(`account`,`name`,`password`) VALUES( ? , ? , ? )',[account,username,password],)
  
  return new Promise((resolve,reject) => {
    connection.query('SELECT * FROM user WHERE account = ? AND password = ?',[account,password],(error, results)=>{
      if (error || results.length === 0){
        console.error('',error);
        resolve(false);
        return;
      }
      resolve(results);
      connection.end();

    }); 
  }) ;*/
}


module.exports = {
  register:register,
};