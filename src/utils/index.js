const mongoose = require('mongoose')
const crypto = require('crypto')

const algorithm = 'aes-192-cbc'
const password = '2SOoCa@xsK5s$Ah09BqQF%ns'

exports.ObjectIdCast = mongoose.Types.ObjectId

exports.getMD5 = (password) => crypto.createHash('md5').update(password, 'utf8').digest('hex')

exports.resJsonP = (res, code, sucesso, retorno) => res.status(code).jsonp({ sucesso, retorno })

exports.encrypt = (text) => {
  try {
    const key = crypto.scryptSync(password, 'salt', 24)
    // Use `crypto.randomBytes` to generate a random iv instead of the static iv
    // shown here.
    const iv = Buffer.alloc(16, 0) // Initialization vector.

    const cipher = crypto.createCipheriv(algorithm, key, iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Erro in Utils.encrypt :', error)
  }
}

exports.decrypt = (textEncrypt) => {
  try {
    const key = crypto.scryptSync(password, 'salt', 24)
    // The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0) // Initialization vector.

    const decipher = crypto.createDecipheriv(algorithm, key, iv)

    // Encrypted using same algorithm, key and iv.
    const encrypted = textEncrypt

    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Erro in Utils.decrypt :', error)
  }
}
