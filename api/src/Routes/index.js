const { Router } = require('express');
const wines = require('./Wines.js')
const createWine = require("./Wine.js")
const createUser = require("./User.js")

const router = Router();

router.use("/home", wines)
router.use("/createWine", createWine)
router.use("/createUser", createUser)

module.exports = router;