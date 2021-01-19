const path = require("path");

const {Router} = require("express");

const wallerController = require('../controllers/walletController');
const {verifyUserToken, verifyAdminToken} = require('../middlware/auth');

const router = new Router();

router.get("/show",verifyUserToken, wallerController.authWallet);
router.get("/read",verifyUserToken, wallerController.authTransactions);
router.get("/wallets",verifyAdminToken,wallerController.wallets);
router.get("/transactions",verifyAdminToken,wallerController.transactions);
router.get("/wallets/:id",verifyUserToken,wallerController.userWallet);
router.get("/transactions/:id",verifyUserToken,wallerController.userTransactions);

module.exports =router;
