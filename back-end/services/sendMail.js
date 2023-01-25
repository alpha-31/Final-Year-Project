const mailer = require('nodemailer')

async function sendMail(email, subject, text){
  let mailTransport = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sheikhabdul.wahid.eagle@gmail.com',
        pass: '@Sqe4321'
    }
  });

  let mailDetails = {
    from: 'sheikhabdul.wahid.eagle@gmail.com',
    to: email,
    subject,
    text
  };

  await mailTransport.sendMail(mailDetails)
}

module.exports = sendMail;