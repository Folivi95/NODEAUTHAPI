const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) =>{
    res.json({
        message: 'Welcome to API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Posts Created....',
                authData
            })    
        }
    })
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'Folivi',
        email: 'test@test.com'
    };

    jwt.sign({user}, 'secretKey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        });
    });
});

//verifyToken function
function verifyToken(req,res,next) {
    //GET AUTH HEADER value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ');
        const bearer = bearerToken[1];
        req.token = bearer;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log('Server listening on port 5000'));