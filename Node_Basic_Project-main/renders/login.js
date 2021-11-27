const express = require("express");
const router = express.Router();

// 로그인 페이지
router.get("/", async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : 데이터가 존재하지 않습니다.`);
        res.render("err");
        return;
    }
});

module.exports = router;