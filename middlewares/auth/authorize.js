//phân quyền

const authorize = (req, res, next) => {
    try {
        const { user } = req.user     //user được gửi qua từ authenticate
    } catch (error) {

    }
}

module.exports = {
    authorize
}