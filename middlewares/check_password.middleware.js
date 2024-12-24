const bcrypt = require('bcryptjs')

async function check_password (req, res, next) {
  try {
    const password = req.headers.authorization.split(' ')[1]
    if (await bcrypt.compare(password, process.env.PASSWORD)) return next()
    else return res.sendStatus(403)
  }
  catch (error) {
    if (error) return res.sendStatus(403)
  }
}

module.exports = check_password
