const { Router } = require("express");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const { User } = require("../server/db.js");

const router = Router();

router.post("/", async function PostUser(req, res) {
  const {
    name,
    lastName,
    mail,
    country,
    state,
    street,
    streetNum,
    depto,
    celNum,
    postalCode,
    active,
  } = req.body;
  try {
    const post = await User.create({
      name,
      lastName,
      mail,
      country,
      state,
      street,
      streetNum,
      depto,
      celNum,
      postalCode,
      active,
      id: uuidv4(),
    });

    return res.json(post.id);
  } catch (error) {
    return console.log("hubo un error :(  " + error);
  }
});

module.exports = router;
