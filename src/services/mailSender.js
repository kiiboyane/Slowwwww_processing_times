const nodemailer = require('nodemailer');

function sendmail(mail , id){
 console.log( process.env.EMAIL + "  " +  process.env.PASSWORD); 
 let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
});

// the email text is too dull, life is dull too 
let text = "Bonjour, \n\n Votre fichier *.zip portant l'id " + id + " est déjà cracké. \n \n Veuillez utiliser ce lien "+ "http://18.212.146.244/trackfile/"+ id +" pour accéder au mot de passe ! \n \n Cordialement.";   

let mailOptions = {
  from: process.env.EMAIL,
  to: mail,
  subject: "Le fichier est cracké", // google gave me fissuré as a translation , so cracké sounds more cool  :P
  text: text 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}


module.exports = sendmail ; 