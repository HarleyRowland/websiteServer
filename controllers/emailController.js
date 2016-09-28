var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config.js');
var xoauth2 = require('xoauth2');
var httpStatus = require('http-status');

module.exports = {
  sendEmail: function(name, email, subject, body, callback){

    // login
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: config.gmail.user,
                clientId: config.gmail.clientId,
                clientSecret: config.gmail.clientSecret,
                refreshToken: config.gmail.refreshToken,
                accessToken: config.gmail.accessToken
            })
        }
    });

    var mailOptions = {
      to: 'harleyrowland17@gmail.com',
      subject: name + ' - ' + subject,
      text: 'Message from ' + ' (' + email+ ') \n - ' + body,
      html: 'Message from ' + ' (' + email+ ') </br></br>' + body
    };

    transporter.sendMail(mailOptions, function(err, info){
      if(err){
          callback(err);
          console.log(err);
      }else{
          console.log('Message sent: ' + info.response);
          callback(httpStatus.OK);
      }
    });
  }
}