const express = require('express')
const { Station } = require('../models')
const { createStation, getAllStation, getDetailStation, updateStation, deleteStation } = require('../controllers/station.controller')
const { checkExist } = require('../middlewares/validations/checkExist')
const { authenticate } = require('../middlewares/auth/authenticate')
const { authorize } = require('../middlewares/auth/authorize')

const stationRouter = express.Router()

stationRouter.post("/", authenticate, authorize(['admin', 'super_admin']), createStation)
stationRouter.get("/", getAllStation)
stationRouter.get("/:id", getDetailStation)
stationRouter.put("/:id", authenticate, authorize(['admin', 'super_admin']), checkExist(Station), updateStation)
stationRouter.delete("/:id", authenticate, authorize(['admin', 'super_admin']), checkExist(Station), deleteStation)

module.exports = {
    stationRouter
}
