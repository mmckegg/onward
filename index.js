var tokenize = require('./lib/tokenize')

module.exports = function(query, context){
  var params = null

  // handle query params
  if (Array.isArray(query)){
    params = query.slice(1)
    query = query[0]
  }

  var tokens = tokenize(query)
  return doQuery(tokens, params, context)
}

function doQuery(tokens, params, context){
  var state = { value: context.source }

  for (var i=0,l=tokens.length;i<l;i++){
    var token = tokens[i]

    if (token.root){
      state.value = context.data
    } else if (token.get){
      state.value = state.value[token.get]
    } else if (token.call){
      var args = resolveValues(token.args, params, context)
      var func = getFunction(token.call)
      state.value = func.apply(context, [state.value].concat(args))
    } else if (token.or){
      if (state.value){ 
        break // we have the value, let's stop
      } else { 
        state.value = context.source // reset and start again
      }
    }
  }

  return state.value
}

function resolveValues(args, params, context){
  var result = []
  for (var i=0,l=args.length;i<l;i++){
    var token = args[i]
    if (token.value){
      result.push(token.value)
    } else if (token.tokens){
      result.push(doQuery(token.tokens, params, context))
    }
  }
  return result
}

function getFunction(functions, name){
  if (functions[name]){
    return functions[name]
  } else {
    throw new Error('No function called "' + name + '" in current context')
  }
}