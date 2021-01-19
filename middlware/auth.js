const jwt = require('jsonwebtoken');
const users = require('../models/User');

exports.verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        
        token = token.split(' ')[1] // Remove Bearer from string
        
        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');
        let verifiedUser = jwt.verify(token,"jhhjhjhlhijdhlcjdjkchdscdkc");  // config.TOKEN_SECRET => 'secretKey'
        if (!verifiedUser) return res.status(401).send('Unauthorized request')

        req.user = verifiedUser; // user_id & user_type_id
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }

}
exports.verifyAdminToken = async(req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        
        token = token.split(' ')[1] // Remove Bearer from string
        
        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');
        let verifiedUser = jwt.verify(token,"jhhjhjhlhijdhlcjdjkchdscdkc");  // config.TOKEN_SECRET => 'secretKey'
        verifiedUser = await users.findById(verifiedUser.id);
        if (!verifiedUser) return res.status(401).send('Unauthorized request')
        if (verifiedUser.role !== 'admin') return res.status(401).send('You are not admin user!')

        req.user = verifiedUser; // user_id & user_type_id
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }

}