const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_TOKEN_KEY;

  function token_auth(token) {

    let isAllowed = true

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      console.log("token invalide ! ");
      isAllowed = false;
    } else {
      // Le JWT est valide, continuez avec la logique pour récupérer l'utilisateur.
      console.log("token recu ! ");
      isAllowed;
      let user = decoded;
    }
    
  });
  return isAllowed
}

module.exports = token_auth 