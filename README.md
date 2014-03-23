onward
===

JavaScript/JSON query language that pipes the result of one function to the next.

Designed to be used for binding in "logicless" templating like [rincewind](https://github.com/mmckegg/rincewind).

[![NPM](https://nodei.co/npm/onward.png?compact=true)](https://nodei.co/npm/onward/)

## Example

```
var get = require('onward')

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

get('value:makeLouder', context) // => "HELLO!!!"
get('value:makeLouder:append(" EVERYONE!")', context) // => "HELLO!!! EVERYONE!"
get('object.attribute:then("It is true", "SO NOT TRUE")', context) // => "It is true"
```