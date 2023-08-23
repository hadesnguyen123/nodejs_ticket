const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header("token") //người dùng sẽ gửi token từ header
    const decode = jwt.sign(token, "toi-yeu-vy-3000");
}

module.exports = {
    authenticate
}