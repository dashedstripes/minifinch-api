const Account = require('../models/Account')

module.exports = (router) => {
  router.get('/setup', (req, res) => {
    Account.sync({force: true}).then(() => {
      res.json({message: 'Setup Complete.'})
    })
  })
}