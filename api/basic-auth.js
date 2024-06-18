const basicAuth = require('basic-auth');

const USER = process.env.BASIC_AUTH_USER;
const PASS = process.env.BASIC_AUTH_PASS;

module.exports = (req, res) => {
  const user = basicAuth(req);

  if (!user || user.name !== USER || user.pass !== PASS) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected Area"');
    res.statusCode = 401;
    res.end('Access denied');
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.end('Access granted');
  }
};
