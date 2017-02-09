const Account = require('../models/Account')

module.exports = (router) => {
  router.route('/accounts')
    .get((req, res) => {
      Account.findAll().then((accounts) => {
        res.json(accounts)
      })
    })

    .post((req, res) => {
      Account.create({
        name: req.body.name,
        subdomain: req.body.subdomain,
        email: req.body.email,
        token: req.body.token
      }).then((account) => {
        res.json(account)
      })
    })

  router.route('/accounts/:account_id')
    .get((req, res) => {
      Account.findAll({
        where: {
          id: req.params.account_id
        }
      }).then((accounts) => {
        res.json(accounts)
      })
    })

    .put((req, res) => {
      Account.update({
        name: req.body.name,
        subdomain: req.body.subdomain,
        email: req.body.email,
        token: req.body.token
      }, {
        where: {
          id: req.params.account_id
        }
      }).then((account) => {
        res.json({message: 'Account updated.'})
      })
    })

}