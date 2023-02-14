const mailer = require('nodemailer')

async function sendMail(email, subject, text){

  var mailTransport = mailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "16bee199c60a94",
      pass: "3935c8461f857c"
    }
  });


  let mailDetails = {
    from: 'admin@skynet.com',
    to: email,
    subject,
    text
  };

  await mailTransport.sendMail(mailDetails)
}

module.exports = sendMail;