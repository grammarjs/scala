
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
 * Start.
 */

rule('scala')
  .match(':statement*', passthrough);

rule('statement')
  .match(':package', passthrough)
  .match(':class', passthrough);

rule('package')
  .match(
    ':keyword.package',
    ':punctuation.space',
    ':path',
    ':punctuation.whitespace',
    passthrough);

rule('path')
  .match(':path.start', ':path.end*', passthrough);

rule('path.start')
  .match(':identifier', passthrough);

rule('path.end')
  .match(':punctuation.period', ':identifier', passthrough);

// final case class Name(kind: Int, parent: Option[Context] = None)

rule('class');

rule('class.body');

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