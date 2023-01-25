const express = require('express');
const user = require('../routes/userRoute');
const currentUser = require('../routes/currentUser');
const signout = require('../routes/signout');
const errorHandler = require('../middlewares/error-handler');
const NotFoundError  = require('../errors/not-found-error');
const cookieSession = require('cookie-session');
const cors = require('cors')

module.exports = function(app) {
    app.set('trust proxy', true);
    // app.use(cors({
    //     origin: ['http://172.16.163.61:3000' ,'http://localhost:3000'],
    //     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    //     credentials:true,
    //     exposedHeaders: ["set-cookie"]
    // }))
    app.use(express.json());
    app.use(
        cookieSession({
            signed: false
        })
    );
    app.use('/api/currentUser', currentUser);
    app.use('/api/signout', signout);
    app.use('/api/user', user);
    app.use('/api/test', require('../routes/test'));
    app.use('/api/admin', require('../routes/adminRoutes'));
    
    
    app.all('*', async (req,res,next) => {
        next(new NotFoundError());
    })
    app.use(errorHandler);
}
