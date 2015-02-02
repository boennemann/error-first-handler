'use strict'

var exports = module.exports = function (input) {
  var errorHandler = exports.throwError
  if (typeof input === 'function') errorHandler = input

  return function(handler) {
    return function(err) {
      if (err) if (!errorHandler.apply(null, arguments)) return

      handler.apply(this, Array.prototype.slice.call(arguments, 1))
    }
  }
}

exports.throwError = function (err) {
  throw err
}
