const fs = require('fs/promises')
const bcrypt = require('bcryptjs')

async function once_generate_password (password) {
  const password_hash = await bcrypt.hash(password, Number(process.env.HASH_SALT_ROUNDS))

  await fs.writeFile('.env', `PASSWORD=${password_hash}`)
}

module.exports = once_generate_password
