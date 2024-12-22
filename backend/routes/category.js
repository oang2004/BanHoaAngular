const express = require('express');
const router = express.Router();
const { connection } = require('../config/helpers');

router.get('/category', (req, res) => {

  connection.query('SELECT category_id,category_name FROM tbl_category_product ', (err, results) => {
    if (err) {
        console.error('Lỗi truy vấn:', err);
        return res.status(500).json({ message: "Lỗi khi truy vấn cơ sở dữ liệu",status:500 });
      }
      if (results.length === 0) {
        return res.status(400).json({ message: "Khong tim tháy loai san pham nao",status:500 });
      }
      res.status(200).json({ message: "Lay danh sach san pham thành công",status:200, list: results });
  });
});
router.get('/categoryid', (req, res) => {
    let categoryId =  req.query.category_id;;
    connection.query('SELECT category_id,category_name FROM tbl_category_product where  category_id = ? ', [categoryId], (err, results) => {
      if (err) {
          console.error('Lỗi truy vấn:', err);
          return res.status(500).json({ message: "Lỗi khi truy vấn cơ sở dữ liệu",status:500 });
        }
        if (results.length === 0) {
          return res.status(400).json({ message: "Khong tim tháy loai san pham nao",status:500 });
        }
        res.status(200).json({ message: "Lay danh sach san pham thành công",status:200, list: results });
    });
});

module.exports = router;
