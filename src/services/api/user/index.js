const { getUserByEmail, createUser } = require('../../../repositories/user')
const { createToken } = require('../../passport/create')
const { encrypt } = require('../../../utils')

exports.userSignUp = async ({ name, email, password, whatsapp }) => {
  if (!name ||
      !email ||
      !password) {
    throw new Error({ msg: 'Informações faltantes' })
  }

  let user = await getUserByEmail(email)

  if (user) {
    throw new Error({ msg: 'Usuário já cadastrado' })
  }

  const encryptedPassword = encrypt(password)
  user = await createUser({ name, email, password: encryptedPassword, role: 'user', whatsapp })

  if (user) {
    const token = createToken({ _id: user._id })

    return {
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }
  }

  throw new Error({ msg: 'Falha ao criar o usuário!' })
}

exports.loginUser = async (user) => {
  const token = createToken({ _id: user._id })
  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  }
}
