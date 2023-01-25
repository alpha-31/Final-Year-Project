
const {Admin} = require('../models/admin');
const adminData = require('../data/admins.json');
module.exports = async function insertAdminsData() {
    

    // admin1 = {
    //     ID : "A-23-0001",
    //     name: 'SkyNet Admin Talha',
    //     email: 'admin.mtm@skynet.com',
    //     password: 'SkynetAdmin@mtm'
    // };

    // admin2 = {
    //     ID : "A-23-0002",
    //     name: 'SkyNet Admin Sheikh',
    //     email: 'admin.saw@skynet.com',
    //     password: 'SkynetAdmin@saw'
    // };
    // admin3 ={
    //     ID : "A-23-0008",
    //     name: 'SkyNet Admin Sohaib',
    //     email: 'admin.msr@skynet.com',
    //     password: 'SkynetAdmin@msr'
    // };
    // const adminData = [admin1, admin2, admin3];


    
    try {
        await Admin.deleteMany()
        // iterate over the array of data
        for (const data of adminData) {
            // create a new document
            const document = new Admin(data)
            // save the document
            await document.save()
        }
    } catch (error) {
        console.log(error)
    }
}

  
