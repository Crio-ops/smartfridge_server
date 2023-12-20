const express = require("express");
const router = express.Router();

const { User } = require('../../server/model/sequelize/sequelize_object_model.js')
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", async (req, res) => {
  let user_to_create = req.body;

  if (req.method === "POST") {
    const secretKey = process.env.SECRET_TOKEN_KEY;
    var result = await create_user(user_to_create);
  }

  async function create_user(user_to_create) {
    var hashed_password = bcrypt.hashSync(user_to_create.password, saltRounds);

    // create user with sequelize == INSERT INTO user ...
    const users = User.create({
      account_name: user_to_create.account_name,
      password: hashed_password,
      firstname: user_to_create.firstname,
      lastname: user_to_create.lastname,
      mail_address: user_to_create.mail_address,
    })
      .then(() => {
        const request = {
          token: token,
          state: { error: false, message: "successful registration" },
        };

        res.status(200).json({ request });
      })
      .catch(function (error) {
        if (error) {
          if (error.parent && error.parent.code === "ER_DUP_ENTRY") {
            console.log("L'ERREUR !!!!!!! : ", error.parent);
            const request = {
              state: {
                error: true,
                message: "account name or mail address already used",
              },
            };
            res.status(200).json({ request });
          } else {
            const request = {
              state: {
                error: true,
                message: "Une erreur est survenue, veuillez recommencer",
              },
            };
            res.status(200).json({ request });
          }
        }
      });
  }
});
module.exports = router;