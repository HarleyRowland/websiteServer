var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config.js')

module.exports = {
  sendEmail: function(){
    emailjs = require('emailjs');

    var server = emailjs.server.connect({
        user:"harleyrowland17@gmail.com",
        password: config.gmailPassword,
        host:"smtp.gmail.com",
        ssl:true
      });

    server.send({
          text: "woo",
          from:"Harley <harleyrowland17@gmail.com>",
          to:"harleyrowland17@gmail.com",
          subject:"Subject"
        },
        function (err, message) {   
          console.log(err, message);
      });
  }
}