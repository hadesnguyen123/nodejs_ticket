const { Station } = require("../../models");

//middleware kiểm tra station có tồn tại hay không

const checkExist = (Model) => {
    return async (req, res, next) => {
        const { id } = req.params;
        const station = await Model.findOne({
            where: { id }
        })
        if (station) {
            next()
        } else {
            res.status(404).send(`Khong tim thay station co id là ${id}`)
        }
    }
}

module.exports = {
    checkExist
}