const Sequelize = require('sequelize')
const sequelize = require('../db')

const Account = sequelize.define('account', {
  name: Sequelize.STRING,
  subdomain: Sequelize.STRING,
  email: Sequelize.STRING,
  token: Sequelize.STRING
})

module.exports = Account