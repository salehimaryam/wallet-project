const path = require ("path");
const {verifyAdminToken} = require('../middlware/auth');
const {Router} = require ("express");


const userController = require("../controllers/userController");

const router = new Router();

router.post("/login",userController.login);

router.post("/register",userController.register);

router.post("/showUser",userController.showUser);

router.get("/users",verifyAdminToken, userController.usersList);
router.get("/users/:id",verifyAdminToken, userController.userDetails);

module.exports = router;