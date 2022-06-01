const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },


    authMiddleware: function ({ req }) {
        //OKs TOKEN TO BE SENT
        let token = req.body.token || req.query.token || req.headers.authorization;

        //SEPARATE BEARER FROM TOKENVALUE
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        //IF NOT TOKEN - RETURN AS IS
        if (!token) {
            return req;
        }

        try {
            //DECODE AND ATTACH USER DATA TO REQ. OBJ
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // RETURN UPDATE REQ. OBJ
        return req;
    }

};
