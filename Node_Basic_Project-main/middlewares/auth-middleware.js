const jwt = require("jsonwebtoken");
const User = require("../schemas/user")

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요"
        });
        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, "this-is-secretkey");
        
        User.findOne({userId}).exec().then((user) => {
            res.locals.user = user;
            next(); //미들웨어는 반드시 next 호출 -> 이유는 다음 미들웨어로 연결하기 위해서 반드시 필요함
        });
    } catch (error) {
        res.stauts(401).send({
            errorMessage: "로그인 후 사용하세요",
        });
    }
};