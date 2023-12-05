const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { Admin } = require('../../server/model/sequelize/sequelize_object_model.js')


router.post("/", async (req, res) => {

  const log = req.body;
  console.log('REQUETE',JSON.stringify(log))
  try {
    const admins = await Admin.findAll({
      where: {
        account_name: log.username,
      },
    });
    console.log("admin : ", admins);
    if (admins.length > 0) {
      const verifyPassword = bcrypt.compareSync(
        log.password,
        admins[0].password
      );

      if (verifyPassword) {
        console.log(verifyPassword);

        const admin = {
          id: admins[0].id,
          username: admins[0].account_name,
        };

        const token = jwt.sign(admin, process.env.SECRET_TOKEN_KEY, {
          expiresIn: "24h", // Durée de validité du token
        });

        const request = {
          user: admin,
          token: token,
          state: { error: false, message: "successful log in" },
        };

        res.status(200).json({ request });
      } else {
        res.status(401).json({ error: "Mot de passe incorrect" });
      }
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
module.exports = router;

