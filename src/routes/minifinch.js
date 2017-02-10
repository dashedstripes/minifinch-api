const minifinch = require('../services/clone')

module.exports = (router, socketIO) => {
  router.route('/minifinch')
    .post((req, res) => {
      minifinch.start(socketIO, req.body.accounts, req.body.filters)
      res.send('Minifinch has begun.')
    })

}