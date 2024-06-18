module.exports = (req, res) => {
  const auth = { login: process.env.BASIC_AUTH_USER, password: process.env.BASIC_AUTH_PASS };

  // Parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  // Verify login and password
  if (login && password && login === auth.login && password === auth.password) {
    return res.status(200).send('Access granted');
  }

  // Access denied
  res.setHeader('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).send('Authentication required.');
};
