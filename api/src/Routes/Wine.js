const { Router } = require("express");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const { Wine } = require("../server/db.js");

const router = Router();

router.post("/", async function PostWine(req, res) {
    const { name, image, brand, price, color, smell, flavor, type, end, active } =
    req.body;
    try {
        const post = await Wine.create({
            name,
            image,
            brand,
            price,
            color,
            smell,
            flavor,
            type,
            end,
            active,
            id: uuidv4(),
          });
        
          return res.json(post.id);
        
    } catch (error) {
        return console.log("hubo un error :(  " + error)
    }
  


});

module.exports = router;
