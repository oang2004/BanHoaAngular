const express = require('express');
const router = express.Router();
const { connection } = require('../config/helpers');

router.post('/', (req, res) => {
    const { hoten, diachi, dienthoai, email } = req.body;

    const sql = `INSERT INTO donhang (hoten, diachi, dienthoai, email, created_at) VALUES (?, ?, ?, ?, NOW())`;
    db.query(sql, [hoten, diachi, dienthoai, email], (err, result) => {
        if (err) {
            console.error('Lỗi khi tạo đơn hàng:', err);
            res.status(500).json({ message: 'Lỗi khi tạo đơn hàng' });
        } else {
            res.status(201).json({ message: 'Đơn hàng đã được tạo thành công!' });
        }
    });
});

module.exports = router;
