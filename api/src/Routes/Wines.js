const { Router } = require("express");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const { Wine } = require("../server/db.js")

const router = Router();

router.get("/", async function (req, res) {
  const name = req.query.name
  if (name) {
    try {
      const DBWines = await Wine.findAll({
        where: { name: {[Sequelize.Op.iLike]: name + "%"}}
      })
      return DBWines
    } catch (error) {
      return console.log("hubo un error :(  " + error)
    }
  }
    try {
      const DBWines = await Wine.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
      })
      return res.send(DBWines);
    } catch (error) {
      return console.log("hubo un error :(  " + error)
    }
});
router.get("/:id", async (req, res) =>{
  const id = req.params.id
  try {
    const DBWine = await Wine.findByPk(id)
    res.json(DBWine)
  } catch (error) {
    return console.log("hubo un error :(  " + error)
  }
})

module.exports = router;