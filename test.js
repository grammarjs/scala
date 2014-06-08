
var assert = require('assert');
var grammar = require('./');
var Parser = require('grammarjs-recursive-parser');
var parser = new Parser(grammar);
var transform = require('./index');

describe('scala', function(){
  test('private[parser]');
  test('private[this]');
});