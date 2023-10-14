const { Router } = require('express');
const wines = require('./Wines.js')
const createWine = require("./Wine.js")
const createUser = require("./User.js")
const filter = require("./Filters.js")

const router = Router();

router.use("/home", wines)
router.use("/filter", filter)
router.use("/createwine", createWine)
router.use("/createUser", createUser)

module.exports = router;