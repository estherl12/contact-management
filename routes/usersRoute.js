const express = require('express');
const router = express.Router();
const{ registerUsers, currentUsers, loginUsers} = require("../controllers/usersController");
const validateToken = require('../middleware/validateTokenHandler');

router.post("/register",registerUsers);
router.post("/login",loginUsers);
router.get("/current",validateToken,currentUsers);
module.exports = router;