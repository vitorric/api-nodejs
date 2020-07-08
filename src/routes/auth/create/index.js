const { resJsonP } = require('../../../utils')
const { userSignUp } = require('../../../services/api/user')

module.exports = () => (req, res) => {
  userSignUp({ ...req.body })
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err))
}
