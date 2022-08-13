const nodemailer  = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'prontomedix@gmail.com', 
      pass: 'yxvcdxouzspgeabg',
    },
});

transporter.verify().then(()=>{
    console.log('Ready for send emailss');
});

module.exports = {
    transporter,
}