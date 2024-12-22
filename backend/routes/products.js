const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { connection } = require('../config/helpers');
router.get('/products', (req, res) => {

    connection.query('SELECT product_id, product_name, product_price, product_image FROM tbl_product ', (err, results) => {
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
router.get('/pro', (req, res) => {
    let productId =  req.query.product_id;;
    connection.query('SELECT product_id, product_name FROM tbl_product where  product_id = ?', [productId], (err, results) => {
      if (err) {
          console.error('Lỗi truy vấn:', err);
          return res.status(500).json({ message: "Lỗi khi truy vấn cơ sở dữ liệu",status:500 });
        }
        if (results.length === 0) {
          return res.status(400).json({ message: "Khong tim tháy san pham",status:500 });
        }
        res.status(200).json({ message: "Lay san pham thành công",status:200, list: results });
    });
});

router.get('/productCategory', (req, res) => {
  let category =  req.query.category_id;
  connection.query('SELECT product_id, product_name, product_quantity, product_sold, product_slug, category_id, brand_id, product_desc, product_content, product_price, product_image, product_status, created_at, updated_at  FROM tbl_product WHERE category_id = ? or 0 = ?', [category,category], (err, results) => {
    if (err) {
        console.error('Lỗi truy vấn:', err);
        return res.status(500).json({ message: "Lỗi khi truy vấn cơ sở dữ liệu",status:500 });
      }
      if (results.length === 0) {
        return res.status(400).json({ message: "Khong tim tháy san pham",status:500 });
      }
      res.status(200).json({ message: "Lay san pham thành công",status:200, list: results });
  });
});
router.get('/search', (req, res) => {
  const searchQuery = req.query.q;
  const sql = `SELECT * FROM tbl_product WHERE name LIKE ? OR description LIKE ?`;
  const query = `%${searchQuery}%`;
  db.query(sql, [query, query], (err, results) => {
      if (err) {
          console.error('Lỗi khi tìm kiếm sản phẩm:', err);
          res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm' });
      } else {
          res.status(200).json(results);
      }
  });
});

module.exports = router;