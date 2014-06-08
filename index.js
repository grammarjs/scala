
/**
 * Module dependencies.
 */

var Grammar = require('grammarjs-grammar');
var Token = require('languagejs-token');
var punctuation = require('syntaxjs-punctuation');
var grammar = new Grammar('scala');
var rule = grammar.expression; // grammar.rule;
var value = Token.value;
var passthrough = Token.passthrough;
grammar.use(punctuation());

/**
 * Start.
 */

rule('scala')
  .match(':statement*', passthrough);

/**
 * Statement.
 */

rule('statement')
  .match(':package', passthrough)
  .match(':class', passthrough);

/**
 * Package.
 */

rule('package')
  .match(
    ':keyword.package',
    ':punctuation.space',
    ':path',
    ':punctuation.whitespace',
    passthrough);

/**
 * Path.
 */

rule('path')
  .match(
    ':path.start', 
    ':path.end*', 
    passthrough);

/**
 * Path start.
 */

rule('path.start')
  .match(
    ':identifier', 
    passthrough);

/**
 * Path end.
 */

rule('path.end')
  .match(
    ':punctuation.period', 
    ':identifier', 
    passthrough);

/**
 * Class.
 */

rule('class');

/**
 * Class body.
 */

rule('class.body');

/**
 * Modifier.
 */

rule('modifier')
  .match(':modifier.local', passthrough)
  .match(':modifier.access', passthrough)
  .match(':keyword.override', passthrough);

/**
 * Local modifier.
 */

rule('modifier.local')
  .match(':keyword.abstract', passthrough)
  .match(':keyword.final', passthrough)
  .match(':keyword.sealed', passthrough)
  .match(':keyword.implicit', passthrough)
  .match(':keyword.lazy', passthrough);

/**
 * Access modifier.
 */

rule('modifier.access')
  .match(
    ':keyword.private', 
    ':qualifier.access?', 
    passthrough)
  .match(
    ':keyword.protected', 
    ':qualifier.access?', 
    passthrough);

/**
 * Access qualifier.
 */

rule('qualifier.access')
  .match(
    ':punctuation.bracket.square.begin',
    ':qualifier.access.content',
    ':punctuation.bracket.square.end',
    passthrough);

rule('qualifier.access.content')
  .match(':identifier', passthrough)
  .match(':keyword.this', passthrough);

/**
 * Declaration.
 */

rule('declaration')
  .match(
    ':keyword.val', 
    ':declaration.variable', 
    passthrough)
  .match(
    ':keyword.var', 
    ':declaration.variable', 
    passthrough)
  .match(
    ':keyword.def', 
    ':declaration.function', 
    passthrough)
  .match(
  ':keyword.type', 
  ':declaration.type', 
  passthrough); // ‘type’ {nl} TypeDcl

/**
 * Variable declaration.
 */

rule('declaration.variable')
  .match(
    ':identifier.many', 
    ':punctuation.colon', 
    ':type', 
    passthrough);

/**
 * Function declaration.
 */

rule('declaration.function') //FunDcl ::= FunSig [‘:’ Type]
  .match(
    ':function.signature', 
    ':declaration.function.end?', 
    passthrough);

/**
 * End of function declaration.
 */

rule('declaration.function.end')
  .match(
    ':punctuation.colon', 
    ':type', 
    passthrough);

/**
 * Function signature.
 */

rule('function.signature') //  id [FunTypeParamClause] ParamClauses

/**
 * Type.
 */

rule('type')
  .match(
    ':function.arg.types',
    ':operator.arrow.double',
    ':type',
    passthrough)
  .match(
    ':type.infix',
    ':clause.existential?',
    passthrough);

/**
 * Identifiers.
 */

rule('identifier.many')
  .match(
    ':identifier', 
    ':identifier.rest*', 
    passthrough);

/**
 * Rest of identifiers.
 */

rule('identifier.rest')
  .match(
    ':punctuation.comma', 
    ':identifier', 
    passthrough);

/**
 * Identifier.
 */

rule('identifier')
  // .match('identifier.plain')
  .match(
    ':punctuation.backtick', 
    ':literal.string', 
    ':punctuation.backtick', 
    passthrough);

/**
 * Literal.
 */

rule('literal')
  .match(':punctuation.dash', ':literal.integer', passthrough)
  .match(':punctuation.dash', ':literal.float', passthrough)
  .match(':literal.boolean', passthrough)
  .match(':literal.character', passthrough)
  .match(':literal.string', passthrough)
  .match(':literal.symbol', passthrough)
  .match(':literal.null', passthrough);

/**
 * Keywords.
 */

keyword('package');
keyword('override');
keyword('abstract');
keyword('final');
keyword('sealed');
keyword('implicit');
keyword('lazy');
keyword('private');
keyword('protected');
keyword('this');
keyword('val');
keyword('var');
keyword('def');
keyword('type');

/**
 * Operators.
 */

operator('arrow.double', '=>');

/**
 * Define a keyword.
 *
 * @param {String} name
 * @api private
 */

function keyword(name) {
  return rule('keyword.' + name).match(name, value);
}

/**
 * Define an operator.
 *
 * @param {String} name
 * @param {String} symbol
 * @api private
 */

function operator(name, symbol) {
  return rule('operator.' + name).match(symbol, value);
}