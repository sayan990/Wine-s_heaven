const { Router } = require('express');
const wines = require('./Wines')

const router = Router();

router.use("/home", wines)

module.exports = router;