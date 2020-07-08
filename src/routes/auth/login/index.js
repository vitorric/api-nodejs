const { resJsonP } = require('../../../utils')
const { loginUser } = require('../../../services/api/user')

module.exports = () => (req, res) => {
  loginUser({ ...req.body })
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err))
}
