const database = require('../data/accounts.json');
// const mysql = require('mysql2');
const mysql = require('mysql2/promise'); 
const { v4: uuidv4 } = require('uuid');



async function check_account(account,password){
  try {
    // 建立與 MySQL 數據庫的連接
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '0904Ray',
      database: 'english_trainer',
    });

    console.log('Connected to MySQL database!');

    const uuid = uuidv4();
    
    const [results, fields] = await connection.execute('SELECT * FROM user WHERE account = ? AND password = ?', [account, password]);

    if (results.length === 0) {
      console.error('User not found or password incorrect.');
      return false;
    }

    console.log(results);

    // 使用 await 版本的 execute
    await connection.execute('UPDATE `user` SET `token` = ?  WHERE `id` = ? ', [uuid, results[0].id]);

    console.log(uuid);

    const [re, field] = await connection.execute('SELECT * FROM user WHERE `id` = ? ', [results[0].id]);

    if (re.length === 0) {
      console.error('User not found or password incorrect.');
      return false;
    }

    // 關閉 MySQL 連接
    await connection.end();

    return re[0];
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    return false;
  }

/*
    // create a new MySQL connection
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0904Ray',
    database: 'english_trainer'
  });
  // connect to the MySQL database
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database!');
    }
  });

  return new Promise((resolve,reject) => {
    const uuid = uuidv4();
    connection.query('SELECT * FROM user WHERE account = ? AND password = ?',[account,password],(error, results)=>{
      if (error || results.length === 0){
        console.error('',error);
        connection.end();
        resolve(false);
        return;
      }     
        console.log(results);
        console.log(uuid);
        connection.execute('UPDATE `user` SET `token` = ?  WHERE `id` = ? ',[uuid,results[0].id]);
        resolve(results[0]);
        // close the MySQL connection
        connection.end();
      
    });
  })
*/  
}

async function chenck_token(token){
  let connection;

  try {
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '0904Ray',
      database: 'english_trainer'
    });

    // connect to the MySQL database
    console.log('Connected to MySQL database!');

    // Perform the query using await
    const [results] = await connection.execute('SELECT * FROM `user` WHERE token = ?', [token]);

    if (results.length === 0) {
      console.error('User not found.');
      return null;
    }

    console.log(results[0]);
    return results[0];
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    return null;
  } finally {
    // close the MySQL connection in the finally block to ensure it's always closed
    if (connection) {
      await connection.end();
    }
  }


  /*const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0904Ray',
    database: 'english_trainer'
  });
  // connect to the MySQL database
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database!');
    }
  });

  connection.query('SELECT * FROM user WHERE token = ?',[token],(error, results)=>{
    if (error || results.length === 0){
      console.error('',error);
      connection.end();
      resolve(false);
      return;
    }     
      console.log(results);
      resolve(results[0]);
      // close the MySQL connection
      connection.end();
    
  });*/
}
  
module.exports = {
    check_account:check_account,
    chenck_token:chenck_token,
};