const { body } = require('express-validator')

const authenticateCurrentUserByToken = require('../../_helpers/authenticate-current-user-by-token')

const permittedFields = {
  currentUser: ['username', 'firstName', 'lastName']
}

// const validations = [
//   body('title').default('').notEmpty().withMessage('Title is Required'),
//   body('Images.*.name').default('').notEmpty().withMessage('Item Name is Required'),
//   body('Images.*.checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiProfileUpdate = async function (req, res) {
  const { body } = req
  const { locals: { currentUser } } = res

  await currentUser.update(body, { fields: permittedFields.currentUser })

  await currentUser.reload()
  console.log(currentUser);
  return res.status(200).json({ currentUser: currentUser })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  apiProfileUpdate
]
