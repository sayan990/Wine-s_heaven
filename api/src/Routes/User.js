const { Router } = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../server/db.js");
const createAccesToken = require("../libs/jwt.js");
const { Sequelize } = require("sequelize")
const router = Router();

router.post("/register", async function Register(req, res) {
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
    password,
  } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 6);

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
      password: passwordHash,
      id: uuidv4(),
    });
    const token = await createAccesToken({ id: post.id });
      res.cookie("token", token);
      console.log("alguien se registro")
    return res.json(post.id);
  } catch (error) {
    return console.log("hubo un error :(  " + error);
  }
});

router.post("/login", async function Login(req, res) {
  const {
    mail,
    password,
  } = req.body;
  try {
    const userFound = await User.findOne({
      where: { mail: { [Sequelize.Op.iLike]: mail + "%" } },
    });

    if (!userFound) {
      return res.status(400).json({ message: "usuario no encontrado" });
    }

    const passwordCorr = await bcrypt.compare(password, userFound.password);

      if (!passwordCorr) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }
      const token = await createAccesToken({ id: userFound.id });
      res.cookie("token", token);
      console.log("alguien se logeo")
      res.json({
        id: userFound.id,
        name: userFound.name,
        mail: userFound.mail,
      });
  } catch (error) {
    return console.log("hubo un error :(  " + error);
  }
});

router.post("/logout", async function LogOut(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
});

module.exports = router;
