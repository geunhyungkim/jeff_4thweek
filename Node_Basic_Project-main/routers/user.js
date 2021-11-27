const express = require("express");
const User = require("../schemas/user");
const router = express.Router();
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middlewares/auth-middleware");

//미들웨어 /api/users/me
router.get("/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    console.log(user)
    res.send({
        user,
    });
});

//회원가입 /api/users
router.post("/", async (req, res) => {
    const { nickname, userPassword, confirmPassword } = req.body

    if (userPassword !== confirmPassword) {
        res.status(400).send({
            errorMessage: '패스워드 불일치',
        })
        return;
    }

    const existUsers = await User.find({
        $or: [{ nickname }],
    });
    if (existUsers.length) {
        res.status(400).send({
            errorMessage: '이미 가입된 닉네임 혹은 아이디 有',
        })
        return;
    }
    const user = new User({ nickname, userPassword });
    await user.save();

    res.status(201).send({});
});

//로그인 /api/users/in
router.post("/in", async (req, res) => {
    const { nickname, userPassword } = req.body;

    const user = await User.findOne({ nickname, userPassword }).exec();

    if (!user) {
        res.status(400).send({
            errorMessage: "아이디 혹은 비밀번호가 틀렸습니다."
        });
        return;
    }

    const token = jwt.sign({ userId: user.userId }, "this-is-secretkey");
    res.send({
        token, 
    })
});


module.exports = router;
