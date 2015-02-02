# error-first-handler
[![Build Status](https://travis-ci.org/boennemann/error-first-handler.svg)](https://travis-ci.org/boennemann/error-first-handler)
[![Dependency Status](https://david-dm.org/boennemann/error-first-handler.svg)](https://david-dm.org/boennemann/error-first-handler)
[![devDependency Status](https://david-dm.org/boennemann/error-first-handler/dev-status.svg)](https://david-dm.org/boennemann/error-first-handler#info=devDependencies)

[![NPM](https://nodei.co/npm/error-first-handler.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/error-first-handler/)

> handles error first callbacks

```bash
npm i -S error-first-handler
```
```js
var fs = require('fs')
var efh = require('error-first-handler')

var default = efh()
fs.readFile('./package.json', default(function (data) {
  // If an error occured it is thrown
  // Otherwhise the error is shaved off the arguments array
}))

var custom = efh(function (err) {
  console.log(err)
})
fs.readFile('./package.json', custom(function (data) {
  // If an error occured it is logged
  // Otherwhise the error is shaved off the arguments array
}))

var custom2 = efh(function (err) {
  console.log(err)
  return true
})
fs.readFile('./package.json', custom2(function (data) {
  // If an error occured it is logged
  // As the handler returns a truthy value the callback is executed
}))

// Passing errors to a parent callback is easy
function readFile(cb) {
  fs.readFile('./package.json', efh(cb)(function {
    // If an error occured it is handled by the parent callback
    // Otherwhise the error is shaved off the arguments array
  }))  
}
```

MIT License
2015 Stephan Bönnemann
