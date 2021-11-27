const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : 데이터가 존재하지 않습니다.`);
        res.render("err");
        return;
    }
});

module.exports = router;