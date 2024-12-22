const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { connection } = require('../config/helpers'); 

router.post('/login', (req, res) => {  
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "email và mật khẩu là bắt buộc" });
    }
    connection.query('SELECT * FROM users where email = ? and password = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            return res.status(500).json({ message: "Lỗi khi truy vấn cơ sở dữ liệu",status:500 });
          }
          if (results.length === 0) {
            return res.status(400).json({ message: "Sai email hoặc password",status:500 });
          }
          res.status(200).json({ message: "Đăng nhập thành công",status:200, user: results[0] });
      });
});
  const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'secretKey', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };


module.exports = router;
