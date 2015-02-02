'use strict'

var test = require('tape')
var efh = require('./')
var dflt = efh()

function callbackFn () {
  var args = Array.prototype.slice.call(arguments)
  args.pop().apply(null, args)
}

test('`efh()` throws error', function(t) {
  t.plan(1)
  t.throws(callbackFn.bind(null, new Error(), dflt(function () {})))
})

test('`efh(fn)` passes error to custom handler', function(t) {
  t.plan(1)
  var err = new Error()
  var cstm = efh(function(passed) {
    t.is(passed, err)
  })

  callbackFn(err, cstm(function() { }))
})

test('shaves off falsy `err` and runs callback with remaining arguments', function(t) {
  t.plan(3)
  callbackFn(null, 1, 2, 3, dflt(function (a, b, c) {
    t.is(a, 1)
    t.is(b, 2)
    t.is(c, 3)
  }))
})

test('executes callback when handler returns truthy value', function(t) {
  t.plan(2)
  var err = new Error()
  var cstm = efh(function(passed) {
    t.is(passed, err)
    return true
  })

  callbackFn(err, 1, cstm(function(a) {
    t.is(a, 1)
  }))
})
