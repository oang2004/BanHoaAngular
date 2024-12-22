const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'banhoa',
  port:'3308'
});

connection.connect((err) => {
  if (err) {
    console.error('Kết nối thất bại:', err.message);
  } else {
    console.log('Kết nối thành công!');
  }
});
module.exports = { connection }; 