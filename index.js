
/**
 * Module dependencies.
 */

var Grammar = require('grammarjs-grammar');
var Token = require('languagejs-token');
var grammar = new Grammar('scala');
var rule = grammar.expression; // grammar.rule;
var value = Token.value;
var passthrough = Token.passthrough;

/**
 * Start
 */

rule('scala')
  .match(':statement*', passthrough);

rule('statement')
  .match(':package', passthrough);

rule('package')
  .match(
    ':keyword.package',
    ':punctuation.space',
    ':path',
    passthrough);

rule('path');

/**
 * Keywords.
 */

keyword('package');

/**
 * Define a keyword.
 *
 * @param {String} name
 * @api private
 */

function keyword(name) {
  return rule('keyword.' + name).match(name, value);
}