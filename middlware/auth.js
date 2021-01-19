const jwt = require('jsonwebtoken');
const users = require('../models/User');

exports.verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        
        token = token.split(' ')[1]
        
        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');
        let verifiedUser = jwt.verify(token,"jhhjhjhlhijdhlcjdjkchdscdkc");  
        if (!verifiedUser) return res.status(401).send('Unauthorized request')

        req.user = verifiedUser; 
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }

}
exports.verifyAdminToken = async(req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        
        token = token.split(' ')[1] 
        
        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');
        let verifiedUser = jwt.verify(token,"jhhjhjhlhijdhlcjdjkchdscdkc"); 
        verifiedUser = await users.findById(verifiedUser.id);
        if (!verifiedUser) return res.status(401).send('Unauthorized request')
        if (verifiedUser.role !== 'admin') return res.status(401).send('You are not admin user!')

        req.user = verifiedUser; 
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }

}