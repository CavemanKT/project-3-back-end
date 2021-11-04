const moment = require('moment')

const { AuthenticityToken } = require("../../models")

module.exports = async function (req, res, next) {
  const { session: { token } } = req

  if (token) {

    const authToken = await AuthenticityToken.findOne({
      where: { token },
      include: [AuthenticityToken.Developer, AuthenticityToken.Talent]
    })

    if (authToken.Developer) {
      const currentDate = moment()
      const expireDate = moment(authToken.createdAt).add(7, 'days')
      if (!currentDate.isAfter(expireDate)) {
        res.locals.currentUser = authToken.Developer
      }
    } else if (authToken.Talent) {
      const currentDate = moment()
      const expireDate = moment(authToken.createdAt).add(7, 'days')
      if (!currentDate.isAfter(expireDate)) {
        res.locals.currentUser = authToken.Talent
      }
    }
  }

  if (res.locals.currentUser === undefined) {
    res.locals.currentUser = null
  }

  next()
}
