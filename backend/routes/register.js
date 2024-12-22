const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { connection } = require('../config/helpers');
router.post('/register', (req, res) => { 
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email và mật khẩu là bắt buộc" });
    }
    connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            return res.status(500).json({ message: "Lỗi khi truy vấn cơ sở dữ liệu" });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: "Username hoặc email đã tồn tại" });
        }
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Lỗi khi mã hóa mật khẩu:', err);
                return res.status(500).json({ message: "Lỗi khi mã hóa mật khẩu" });
            }
            const createdAt = new Date().toISOString();
            connection.query('INSERT INTO users (username, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', 
            [username, email, hashedPassword, createdAt, createdAt], (err, result) => {
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