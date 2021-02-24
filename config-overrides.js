const {alias, aliasJest} = require('react-app-rewire-alias') // DO NOT CONVERT TO ES6 MODULE STYLE!

const aliasMap = {
  "@components": 'src/components',
  "@config": 'src/config.js',
  "@assets": 'src/assets',
  "@api": 'src/api',
  "@utils": 'src/utils.js',
  "@redux": 'src/redux'
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)