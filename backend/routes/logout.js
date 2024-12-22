const express = require('express');
const router = express.Router();
const { connection } = require('../config/helpers');

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Lỗi khi đăng xuất', status: 500 });
      }
      res.status(200).json({ message: 'Đăng xuất thành công', status: 200 });
    });
  });
  

module.exports = router; 