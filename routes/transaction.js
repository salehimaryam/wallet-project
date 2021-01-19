const path = require("path");

const {Router} = require("express");

const transactionController = require('../controllers/transactionController');
const {verifyUserToken} = require('../middlware/auth');

const router = new Router();

router.post("/decreas", verifyUserToken, transactionController.decrease);
router.post("/increase", verifyUserToken, transactionController.increase);
router.post("/transfer", verifyUserToken, transactionController.transfer);

module.exports =router;
