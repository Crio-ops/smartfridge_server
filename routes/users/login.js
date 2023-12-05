const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { User } = require('../../server/model/sequelize/sequelize_object_model.js')


router.post("/", async (req, res) => {

  const log = req.body;
  console.log('REQUETE',JSON.stringify(log))
  try {
    const users = await User.findAll({
      where: {
        account_name: log.username,
      },
    });
    console.log("user : ", users);
    if (users.length > 0) {
      const verifyPassword = bcrypt.compareSync(
        log.password,
        users[0].password
      );

      if (verifyPassword) {
        console.log(verifyPassword);

        const user = {
          id: users[0].id,
          username: users[0].account_name,
          firstname: users[0].firstname,
          lastname: users[0].lastname,
          mail_address: users[0].mail_address,
        };

        const token = jwt.sign(user, process.env.SECRET_TOKEN_KEY, {
          expiresIn: "24h", // Durée de validité du token
        });

        const request = {
          user: user,
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

