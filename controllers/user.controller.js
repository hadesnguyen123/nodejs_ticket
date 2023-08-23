const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password, numberPhone } = req.body
    try {
        //tạo chuỗi ngẫu nhiên
        const salt = bcrypt.genSaltSync(10)   //sync để đồng bộ luôn
        //mã hóa salt + password
        const hashPassword = bcrypt.hashSync(password, salt)
        console.log(hashPassword)
        const newUser = await User.create({ name, email, password: hashPassword, numberPhone }) // client đã đc xét mặc định ở bên migration
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        //tìm user  đăng nhập dựa trên email
        const user = await User.findOne({
            where: {
                email,
            }
        })
        if (user) {
            //kiểm tra mật khẩu, vì mật khẩu đã mã hóa nên cùng phải dùng cái khác để chuyển
            const isAuth = bcrypt.compareSync(password, user.password) //so sánh
            console.log("isAuth:", isAuth)
            if (isAuth) {
                const token = jwt.sign({ email: user.email, type: user.type }, "toi-yeu-vy-3000",
                    { expiresIn: 60 * 60 })  // thời lượng 1h
                res.status(200).send({ message: "Đăng nhập thành công!", token: token})
            } else {
                res.status(500).send({ message: "Tài khoản hoặc mật khẩu không đúng!" })
            }
        } else {
            res.status(404).send({ message: "Không tìm thấy email phù hợp" })
        }
    } catch (error) {
    }
}

module.exports = {
    register,
    login
}