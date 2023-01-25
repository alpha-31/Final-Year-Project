const mongoose = require('mongoose');
const {Admin} = require('../models/admin');
const {User} = require('../models/user');
const escapeStringRegexp = require('escape-string-regexp');

async function createID(user){
  let ID = ''
  let count = '0'

  // for multiple admins but here we have only one admin so...
  /*
  if(user === 'Admin'){
    const y = new Date().getFullYear().toString().slice(-2);
    ID += 'A-'+y+'-';
    const $regex = escapeStringRegexp(ID);
    const t = await Admin.find({ID : {$regex}});
    count = (t.length+1).toString();
  } else {// }
  */

  const y = new Date().getFullYear().toString().slice(-2);
  ID += 'U-'+y+'-';
  const $regex = escapeStringRegexp(ID);
  const t = await User.find({ID : {$regex}});
  count = (t.length+1).toString();
  

  if(count.length == 2){
    count = '00'+count;
  } else if(count.length == 3){
    count = '0'+count;
  } else if(count.length == 1){
    count = '000'+count;
  }
  ID += count;
  return ID
}

module.exports = createID;