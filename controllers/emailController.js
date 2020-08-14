var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config.js');
var httpStatus = require('http-status');


module.exports = {
  sendEmail: function(sendTo, name, email, number, subject, body, callback){

    // login
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: config.gmail.user,
            clientId: config.gmail.clientId,
            clientSecret: config.gmail.clientSecret,
            refreshToken: config.gmail.refreshToken,
            accessToken: config.gmail.accessToken,
            expires: 1484314697598
        }
    });

    var numberString = ")"
    if(number != null) numberString = '/' + number + ')'

    var mailOptions = {
      to: sendTo,
      subject: name + ' - ' + subject,
      text: 'Message from ' + name + ' (' + email + numberString + '\n - ' + body,
      html: 'Message from ' + name + ' (' + email + numberString + '</br></br>' + body
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
  },

  kcSendEmail: function(sendTo, query, callback){


  var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
            user: "harleyrowland17@gmail.com",
            pass: "huis tjli jabu hjmn"
          }
    });

    if(query.package == undefined) query.package = "They did not specify a package."
    if(query.body == undefined) query.body = "They sent no body to the message."

    var mail = {
      from: "harley.rowland17@gmail.com",
      to: sendTo,
      subject: "Hog Roast Enquiry for " + query.date,
      text: 'Message from ' + query.name + ' (' + query.email+ ') \n\n\r\r - Telephone number: ' + query.number + '\n\n\r\r' + query.body + '\n\n\r\r' + query.package,
      html: 'Message from ' + query.name + ' (' + query.email+ ') \n\n\r\r - Telephone number: ' + query.number + '\n\n\r\r' + query.body + '\n\n\r\r' + query.package,
    };


    transporter.sendMail(mail, function(err, info) {
      if(err){
          console.log(err);
          return callback(err);
      }else{
          console.log('Message sent: ' + info.response);
          transporter.close();
          return callback(httpStatus.OK);
      }
    });
  },
  pbkSendEmail: function(sendTo, query, callback){

    // login
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
            user: "harleyrowland17@gmail.com",
            pass: config.gmail.password
          }
    });

    if(query.package == undefined) query.package = "They did not specify a package."
    if(query.body == undefined) query.body = "They sent no body to the message."

    var mailOptions = {
      from: "harley.rowland17@gmail.com",
      to: sendTo,
      subject: query.subject,
      text: 'Message from ' + query.name + ' (' + query.email+ ') \n\n\r\r - Telephone number: ' + query.number + '\n\n\r\r' + query.body,
      html: 'Message from ' + query.name + ' (' + query.email+ ') </br> - Telephone number: ' + query.number + '</br></br>' + query.body,
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