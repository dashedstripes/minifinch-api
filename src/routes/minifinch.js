const minifinch = require('../services/clone')

module.exports = (router) => {
  router.route('/minifinch')
    .post((req, res) => {
      res.send(req.body.filters)
    })

}