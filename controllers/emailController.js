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
      text: 'Message from ' + name + ' (' + email+ ') \n - ' + body,
      html: 'Message from ' + name + ' (' + email+ ') </br></br>' + body
    };

    transporter.sendMail(mailOptions, function(err, info){
      if(err){
          console.log(err);
          return callback(err);
      }else{
          console.log('Message sent: ' + info.response);
          return callback(httpStatus.OK);
      }
    });
  }
}