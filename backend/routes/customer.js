const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');

router.post('/register', (req, res) => {
    const { customer_name, customer_email, customer_password, customer_phone } = req.body;

    if(!customer_name, !customer_email, !customer_password, !customer_phone ){
        return res.status(400).json({ message: "customer_name, customer_email, customer_password, customer_phone là bắt buộc" });
    }
    connection.query('SELECT * FROM custome WHERE customer_name = ? OR customer_email = ?', [customer_name, customer_email], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            return res.status(500).json({ message: "Lỗi khi truy vấn cơ sở dữ liệu" });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: "Customer_name hoặc email đã tồn tại" });
        }
        bcrypt.hash(customer_password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Lỗi khi mã hóa mật khẩu:', err);
                return res.status(500).json({ message: "Lỗi khi mã hóa mật khẩu" });
            }
            const createdAt = new Date().toISOString(); 
            connection.query('INSERT INTO custome (customer_name, customer_email, customer_password, customer_phone, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', 
            [customer_name, customer_email, hashedPassword, createdAt], (err, result) => {
                if (err) {
                    console.error('Lỗi khi thêm người dùng:', err);
                    return res.status(500).json({ message: "Lỗi khi thêm người dùng" });
                }
                res.status(201).json({ message: "Đăng ký thành công" });
            });
        });
    });
});
router.post('/register', (req, res) => {
    const { customer_name, customer_email, customer_password, customer_phone } = req.body;
    if (!customer_name, !customer_email, !customer_password, !customer_phone ) {
        return res.status(400).json({ message: "Username, email và mật khẩu là bắt buộc" });
    }
    connection.query('SELECT * FROM custome WHERE customer_name = ? OR customer_email = ?', [customer_name, customer_email], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            return res.status(500).json({ message: "Lỗi khi truy vấn cơ sở dữ liệu" });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: "customer_name hoặc customer_email đã tồn tại" });
        }
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Lỗi khi mã hóa mật khẩu:', err);
                return res.status(500).json({ message: "Lỗi khi mã hóa mật khẩu" });
            }
            const createdAt = new Date().toISOString(); 
            connection.query('INSERT INTO custome (customer_name, customer_email, customer_password, customer_phone, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', 
            [customer_name, customer_email, hashedPassword, createdAt], (err, result) => {
                if (err) {
                    console.error('Lỗi khi thêm người dùng:', err);
                    return res.status(500).json({ message: "Lỗi khi thêm người dùng" });
                }
                res.status(201).json({ message: "Đăng ký thành công" });
            });
        });
    });
});
module.exports = router;
