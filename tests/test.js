var test = require('tape')
var get = require('../')

test(function(t){
  var data = {
    value: 'Hello',
    object: {
      attribute: true
    }
  }

  var functions = {
    makeLouder: function(input){
      return input.toUpperCase() + '!!!'
    },
    append: function(input, textToAppend){
      return input + textToAppend
    },
    then: function(input, valueIfTrue, valueIfFalse){
      if (input){
        return valueIfTrue
      } else {
        return valueIfFalse
      }
    }
  }

  var context = {data: data, functions: functions}

  t.equal(get('value:makeLouder', context), 'HELLO!!!')
  t.equal(get('value:makeLouder:append(" EVERYONE!")', context), "HELLO!!! EVERYONE!")
  t.equal(get('object.attribute:then("It is true", "SO NOT TRUE")', context), "It is true")

  // or include params
  t.equal(get(['value:makeLouder:append(?)', ' People!'], context), "HELLO!!! People!")

  t.end()
})