const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const checkAgeMiddleware = (req, res, next) => {
    const age = parseInt(req.query.age);
    if (!age || age < 18) {
        return res.status(403).json({ 
            error: "Forbidden", 
            message: "Bạn phải từ 18 tuổi trở lên để truy cập." 
        });
    }
    next(); 
};
app.get('/api/info', checkAgeMiddleware, (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    res.json({
        success: true,
        data: {
            name: name,
            age: age
        }
    });
});
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});