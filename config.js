var config = {};

config.gmail = {};
config.gmail.user = process.env.emailUser;
config.gmail.clientId = process.env.emailClientId;
config.gmail.clientSecret = process.env.emailClientSecret;
config.gmail.refreshToken = process.env.emailRefreshToken;
config.gmail.accessToken = process.env.emailAccessToken;

module.exports = config;