const { Router } = require("express");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const { Wine } = require("../server/db.js")

const router = Router();

router.get("/", async function (req, res) {
    try {
      const DBWines = await Wine.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
      })
      return res.send(DBWines);
    } catch (error) {
      return console.log("hubo un error :(  " + error)
    }
});

module.exports = router;