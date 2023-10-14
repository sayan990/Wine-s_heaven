const { Router } = require("express");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { Sequelize } = require("sequelize");
const router = Router();
const { Wine } = require("../server/db.js");

router.post("/", async function Filter(req, res) {
  try {
    const { brand, type } = req.body;
    const filtros = {};
    if (brand) {
      filtros.brand = brand;
    }
    if (type) {
      filtros.type = type;
    }

    const wines = await Wine.findAll({ where: filtros });
    res.json(wines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Parece que hubo un error con los filtros" });
  }
});

module.exports = router;
