
const mongoose = require('mongoose');
const {admin} = require('../models/admin');
const data = require('../data/admins.json');
const insertAdminsData = require('../services/firstInsertion');
module.exports = function(){

    mongoose.connect('mongodb://localhost:27017/sky-net')
    .then(()=>console.log('Connected...'))
    .catch(() => console.error('Could not connect....'));
        
    mongoose.connection
    .once("open", ()=>
    {
    mongoose.connection.db.listCollections().toArray(async function (err, collectionNames) {
        if (err) {
        console.log(err);
        return;
        }
        let obj = collectionNames.find(data => data.name === 'admins');
        if (obj === undefined || obj.length === 0) 
        {
               await insertAdminsData();
        }
        console.log(obj==undefined? 'All Work done only First Time': 'All Done');
    });
    })

    .on("error", (err)=>{console.warn(err)})



}