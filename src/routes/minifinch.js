const minifinch = require('../services/clone')

module.exports = (router) => {
  router.route('/minifinch')
    .post((req, res) => {
      minifinch.start(req.body.accounts, req.body.filters)
      res.send('Minifinch has begun.')
    })

}