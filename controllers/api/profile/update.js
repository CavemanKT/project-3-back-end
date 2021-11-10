const { body } = require('express-validator')

const authenticateCurrentUserByToken = require('../../_helpers/authenticate-current-user-by-token')


const permittedFields = {
  dev: ['username', 'firstName', 'lastName'],
  talent: ['username', 'firstName', 'lastName', 'resume']
}

// const validations = [
//   body('title').default('').notEmpty().withMessage('Title is Required'),
//   body('Images.*.name').default('').notEmpty().withMessage('Item Name is Required'),
//   body('Images.*.checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiProfileUpdate = async function (req, res) {
  const { body } = req
  const { locals: { currentUser, type } } = res

  console.log(body, currentUser);
  if(type === "Developer"){
    await currentUser.update(body, { fields: permittedFields.dev })
  }

  if(type === "Talent"){
    await currentUser.update(body, { fields: permittedFields.talent })
  }

  await currentUser.reload()
  return res.status(200).json({ currentUser: currentUser })
}

module.exports = [
  authenticateCurrentUserByToken,
  apiProfileUpdate
]
