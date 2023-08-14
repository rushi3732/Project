const {createUser, loginUser} = require("../controllers/user.controller.js");
const { signupValidation, loginValidation } = require('../validation/user.validation')
const express = require("express");
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const router = express.Router();
//upload.single('profile_pic'),
router.post("/register", signupValidation, createUser, function (res, req) {
    console.log(res)
});
router.post('/loginUser', loginUser, function (req, res) {
    console.log(res)
});
function genrateToken(user) {
    return jwt.sign({ data: user }, tokenSecret, { expireIn: 24 })

}
module.exports = router;

