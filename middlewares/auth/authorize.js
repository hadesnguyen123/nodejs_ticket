//phân quyền
const authorize = (arrType) => (req, res, next) => {
    try {
        const { user } = req     //user được gửi qua từ authenticate
        console.log(user)
        if (arrType.findIndex(ele => ele === user.type) > -1) {
            next()
        } else {   //ko tồn tại trả về -1
            res.status(403).send("Đã đăng nhập nhưng ko có quyền")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    authorize
}