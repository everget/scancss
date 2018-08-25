module.exports = {
	env: {
		es6: true,
		node: true,
		'jest/globals': true,
	},

	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},

	'plugins': [
		'import',
		'jest',
		'unicorn',
	],

	rules: {
		// eslint-plugin-import
		// ---------------------------------------------------------------------

		// Forbid `require()` calls with expressions
		'import/no-dynamic-require': 'error',

		// Forbid a module from importing a module with a dependency path back to itself
		'import/no-cycle': ['error', { maxDepth: 2 }],

		// Prevent unnecessary path segments in import and require statements
		'import/no-useless-path-segments': 'error',

		// Forbid the use of mutable exports with `var` or `let`
		'import/no-mutable-exports': 'error',

		// Report any invalid exports, i.e. re-export of the same name
		'import/export': 'error',

		// Report CommonJS require calls and module.exports or exports.*
		'import/no-commonjs': 'error',

		// Report AMD require and define calls
		'import/no-amd': 'error',

		// Ensure all imports appear before other statements
		'import/first': 'error',

		// Report repeated import of the same module in multiple places
		'import/no-duplicates': 'error',

		// Report namespace imports
		'import/no-namespace': 'error',

		// Ensure consistent use of file extension within the import path
		'import/extensions': ['error', 'never'],

		// Enforce a newline after import statements
		'import/newline-after-import': 'error',

		// Forbid unassigned imports
		'import/no-unassigned-import': 'error',

		// Prefer named exports to be grouped together in a single export declaration
		'import/group-exports': 'error',

		// eslint-plugin-jest
		// ---------------------------------------------------------------------

		// Enforce consistent test or it keyword
		'jest/consistent-test-it': ['error', {'fn': 'it'}],

		// Disallow disabled tests
		'jest/no-disabled-tests': 'error',

		// Disallow focused tests
		'jest/no-focused-tests': 'error',

		// Disallow identical titles
		'jest/no-identical-title': 'error',

		// Disallow importing `jest`
		'jest/no-jest-import': 'error',

		// Enforce valid `describe()` callback
		'jest/valid-describe': 'error',

		// Enforce valid `expect()` usage
		'jest/valid-expect': 'error',

		// Disallow Jasmine globals
		'jest/no-jasmine-globals': 'error',

		// Disallow explicitly returning from tests
		'jest/no-test-return-statement': 'error',

		// Suggest using `.toStrictEqual()`
		'jest/prefer-strict-equal': 'error',

		// Enforce assertion to be made in a test body
		'jest/expect-expect': 'error',

		// eslint-plugin-unicorn
		// ---------------------------------------------------------------------

		// Enforce explicitly comparing the length property of a value
		'unicorn/explicit-length-check': 'error',

		// Enforce specifying rules to disable in eslint-disable comments
		'unicorn/no-abusive-eslint-disable': 'error',

		// Require `new` when throwing an error
		'unicorn/throw-new-error': 'error',

		// Require `Array.isArray()` instead of `instanceof Array`
		'unicorn/no-array-instanceof': 'error',

		// Prefer `String#startsWith` and `String#endsWith` over more complex alternatives
		'unicorn/prefer-starts-ends-with': 'error',

		// Enforce importing index files with `.`
		'unicorn/import-index': 'error',

		// Strict Mode
		// ---------------------------------------------------------------------

		// Babel inserts `'use strict';` for us
		strict: 'off',

		// Variables
		// ---------------------------------------------------------------------

		// Enforce or disallow variable initializations at definition
		'init-declarations': 'off',

		// Disallow deletion of variables
		'no-delete-var': 'error',

		// Disallow var and named functions in global scope
		'no-implicit-globals': 'error',

		// Disallow labels that share a name with a variable
		'no-label-var': 'error',

		// Disallow self assignment
		// http://eslint.org/docs/rules/no-self-assign
		'no-self-assign': 'error',

		// Disallow declaration of variables already declared in the outer scope
		'no-shadow': 'error',

		// Disallow identifiers from shadowing restricted names
		// https://eslint.org/docs/rules/no-shadow-restricted-names
		'no-shadow-restricted-names': 'error',

		// Disallow use of undeclared variables unless mentioned in a /* global */ block
		'no-undef': 'error',

		// Disallow use of undefined when initializing variables
		'no-undef-init': 'error',

		// Disallow use of undefined variable
		'no-undefined': 'off',

		// Disallow declaration of variables that are not used in the code
		'no-unused-vars': 'error',

		// Disallow use of variables before they are defined
		'no-use-before-define': 'error',

		// Best Practices
		// ---------------------------------------------------------------------

		// Enforces return statements in callbacks of array's methods
		// http://eslint.org/docs/rules/array-callback-return
		'array-callback-return': 'error',

		// Specify the maximum cyclomatic complexity allowed in a program
		complexity: ['error', 14],

		// Require return statements to either always or never specify values
		'consistent-return': 'error',

		// Specify curly brace conventions for all control statements
		curly: ['error', 'all'],

		// Require default case in switch statements
		'default-case': 'error',

		// Encourages use of dot notation whenever possible
		'dot-notation': ['error', { allowKeywords: true }],

		// Enforces consistent newlines before or after dots
		'dot-location': 'off',

		// Require the use of === and !==
		eqeqeq: 'error',

		// Make sure for-in loops have an if statement
		'guard-for-in': 'off',

		// Disallow the use of alert, confirm, and prompt
		'no-alert': 'error',

		// Disallow use of arguments.caller or arguments.callee
		'no-caller': 'error',

		// Disallow lexical declarations in case/default clauses
		// http://eslint.org/docs/rules/no-case-declarations.html
		'no-case-declarations': 'error',

		// Disallow division operators explicitly at beginning of regular expression
		'no-div-regex': 'error',

		// Disallow else after a return in an if
		'no-else-return': 'error',

		// Disallow unnecessary labels
		'no-extra-label': 'error',

		// Disallow comparisons to null without a type-checking operator
		'no-eq-null': 'error',

		// Disallow use of eval()
		'no-eval': 'error',

		// Disallow adding to native types
		'no-extend-native': 'error',

		// Disallow unnecessary function binding
		'no-extra-bind': 'error',

		// Disallow fallthrough of case statements
		'no-fallthrough': 'error',

		// Disallow the use of leading or trailing decimal points in numeric literals
		'no-floating-decimal': 'error',

		// Disallow the type conversions with shorter notations
		'no-implicit-coercion': 'error',

		// Disallow use of eval()-like methods
		'no-implied-eval': 'error',

		// Disallow this keywords outside of classes or class-like objects
		'no-invalid-this': 'error',

		// Disallow usage of __iterator__ property
		'no-iterator': 'error',

		// Disallow use of labels for anything other then loops and switches
		'no-labels': ['error', { allowLoop: false, allowSwitch: false }],

		// Disallow unnecessary nested blocks
		'no-lone-blocks': 'error',

		// Disallow creation of functions within loops
		'no-loop-func': 'error',

		// Disallow use of multiple spaces
		'no-multi-spaces': 'error',

		// Disallow use of multiline strings
		'no-multi-str': 'error',

		// Disallow reassignments of native objects
		'no-global-assign': 'error',

		// Disallow use of new operator when not part of the assignment or comparison
		'no-new': 'error',

		// Disallow use of new operator for Function object
		'no-new-func': 'error',

		// Disallows creating new instances of String, Number, and Boolean
		'no-new-wrappers': 'error',

		// Disallow use of (old style) octal literals
		'no-octal': 'error',

		// Disallow use of octal escape sequences in string literals, such as
		// var foo = 'Copyright \251';
		'no-octal-escape': 'error',

		// Disallow reassignment of function parameters
		// Disallow parameter object manipulation
		// rule: http://eslint.org/docs/rules/no-param-reassign.html
		'no-param-reassign': 'error',

		// Disallow usage of __proto__ property
		'no-proto': 'error',

		// Disallow declaring the same variable more then once
		'no-redeclare': 'error',

		// Disallow use of assignment in return statement
		'no-return-assign': 'error',

		// Disallow use of `javascript:` urls.
		'no-script-url': 'error',

		// Disallow comparisons where both sides are exactly the same
		'no-self-compare': 'error',

		// Disallow use of comma operator
		'no-sequences': 'error',

		// restrict what can be thrown as an exception
		'no-throw-literal': 'error',

		// Disallow unmodified conditions of loops
		// http://eslint.org/docs/rules/no-unmodified-loop-condition
		'no-unmodified-loop-condition': 'off',

		// Disallow usage of expressions in statement position
		'no-unused-expressions': 'error',

		// Disallow unused labels
		// http://eslint.org/docs/rules/no-unused-labels
		'no-unused-labels': 'error',

		// Disallow unnecessary .call() and .apply()
		'no-useless-call': 'error',

		// Disallow use of void operator
		'no-void': 'error',

		// Disallow usage of configurable warning terms in comments: e.g. todo
		'no-warning-comments': ['off',
			{
				terms: ['todo', 'fixme', 'xxx'],
				location: 'start',
			},
		],

		// Disallow use of the with statement
		'no-with': 'error',

		// Require use of the second argument for parseInt()
		radix: 'error',

		// Require immediate function invocation to be wrapped in parentheses
		// http://eslint.org/docs/rules/wrap-iife.html
		'wrap-iife': ['error', 'inside'],

		// Require or disallow Yoda conditions
		yoda: 'error',

		// Disallow assignment in conditional expressions
		'no-cond-assign': ['error', 'always'],

		// Disallow use of console
		'no-console': 'error',

		// Disallow use of constant expressions in conditions
		'no-constant-condition': 'error',

		// Disallow control characters in regular expressions
		'no-control-regex': 'error',

		// Disallow use of debugger
		'no-debugger': 'error',

		// Disallow duplicate arguments in functions
		'no-dupe-args': 'error',

		// Disallow duplicate keys when creating object literals
		'no-dupe-keys': 'error',

		// Disallow a duplicate case label.
		'no-duplicate-case': 'error',

		// Disallow the use of empty character classes in regular expressions
		'no-empty-character-class': 'error',

		// Disallow empty statements
		'no-empty': 'error',

		// Disallow assigning to the exception in a catch block
		'no-ex-assign': 'error',

		// Disallow double-negation boolean casts in a boolean context
		'no-extra-boolean-cast': 'error',

		// Disallow unnecessary parentheses
		'no-extra-parens': ['error', 'functions'],

		// Disallow unnecessary semicolons
		'no-extra-semi': 'error',

		// Disallow overwriting functions written as function declarations
		'no-func-assign': 'error',

		// Disallow function or variable declarations in nested blocks
		'no-inner-declarations': 'error',

		// Disallow invalid regular expression strings in the RegExp constructor
		'no-invalid-regexp': 'error',

		// Disallow irregular whitespace outside of strings and comments
		'no-irregular-whitespace': 'error',

		// Disallow negation of the left operand of an in expression
		'no-unsafe-negation': 'error',

		// Disallow the use of object properties of the global object (Math and JSON) as functions
		'no-obj-calls': 'error',

		// Disallow multiple spaces in a regular expression literal
		'no-regex-spaces': 'error',

		// Disallow sparse arrays
		'no-sparse-arrays': 'error',

		// Disallow unreachable statements after a return, throw, continue, or break statement
		'no-unreachable': 'error',

		// Disallow comparisons with the value NaN
		'use-isnan': 'error',

		// Ensure that the results of typeof are compared against a valid string
		'valid-typeof': 'error',

		// Avoid code that looks like two expressions but is actually one
		'no-unexpected-multiline': 'error',

		// Specify the maximum depth that blocks can be nested
		'max-depth': ['error', 3], // 2

		// Limits the number of parameters that can be used in the function declaration.
		'max-params': ['error', 5],

		// Disallow use of unary operators, ++ and --
		'no-plusplus': 'off',

		// Stylistic Issues
		// ---------------------------------------------------------------------

		// Enforce spacing inside array brackets
		'array-bracket-spacing': ['error', 'never'],

		// Enforce one true brace style
		'brace-style': ['error', '1tbs', { allowSingleLine: true }],

		// Require camel case names
		'camelcase': ['error', { 'properties': 'never' }],

		// Enforce spacing before and after comma
		'comma-spacing': ['error', { before: false, after: true }],

		// Enforce one true comma style
		'comma-style': ['error', 'last'],

		// Disallow padding inside computed properties
		'computed-property-spacing': ['error', 'never'],

		// Enforces consistent naming when capturing the current execution context
		'consistent-this': ['error', 'that'],

		// Enforce newline at the end of file, with no multiple empty lines
		'eol-last': 'error',

		// Require function expressions to have a name
		'func-names': 'error',

		// Enforces use of function declarations or expressions
		'func-style': ['error', 'declaration'],

		// Sets a specific tab width for your code
		// https://github.com/eslint/eslint/blob/master/docs/rules/indent.md
		indent: ['error', 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],

		// Specify whether double or single quotes should be used in JSX attributes
		// http://eslint.org/docs/rules/jsx-quotes
		'jsx-quotes': ['error', 'prefer-double'],

		// Enforces spacing between keys and values in object literal properties
		'key-spacing': ['error', { beforeColon: false, afterColon: true }],

		// Require a space before & after certain keywords
		'keyword-spacing': ['error', {
			before: true,
			after: true,
			overrides: {
				return: { after: true },
				throw: { after: true },
				case: { after: true }
			}
		}],

		// Require a capital letter for constructors
		'new-cap': ['error', { newIsCap: true, capIsNew: false }],

		// Disallow the omission of parentheses when invoking a constructor with no arguments
		'new-parens': 'error',

		// Enforces new line after each method call in the chain to make it
		// more readable and easy to maintain
		// http://eslint.org/docs/rules/newline-per-chained-call
		'newline-per-chained-call': ['off', { ignoreChainWithDepth: 3 }],

		// Disallow use of the Array constructor
		'no-array-constructor': 'error',

		// Disallow comments inline after code
		'no-inline-comments': 'error',

		// Disallow if as the only statement in an else block
		'no-lonely-if': 'error',

		// Disallow mixed spaces and tabs for indentation
		'no-mixed-spaces-and-tabs': 'error',

		// Disallow multiple empty lines and only one newline at the end
		'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],

		// Disallow nested ternary expressions
		'no-nested-ternary': 'error',

		// Disallow use of the Object constructor
		'no-new-object': 'error',

		// Disallow space between function identifier and application
		'func-call-spacing': 'error',

		// Disallow the use of ternary operators
		'no-ternary': 'off',

		// Disallow trailing whitespace at the end of lines
		'no-trailing-spaces': 'error',

		// Disallow dangling underscores in identifiers
		'no-underscore-dangle': 'error',

		// Disallow the use of Boolean literals in conditional expressions
		// also, prefer `a || b` over `a ? a : b`
		// http://eslint.org/docs/rules/no-unneeded-ternary
		'no-unneeded-ternary': ['error', { defaultAssignment: false }],

		// Disallow whitespace before properties
		// http://eslint.org/docs/rules/no-whitespace-before-property
		'no-whitespace-before-property': 'error',

		// Require padding inside curly braces
		'object-curly-spacing': ['error', 'always'],

		// Allow just one var statement per function
		'one-var': ['error', 'never'],

		// Require a newline around variable declaration
		// http://eslint.org/docs/rules/one-var-declaration-per-line
		'one-var-declaration-per-line': ['error', 'always'],

		// Require assignment operator shorthand where possible or prohibit it entirely
		'operator-assignment': 'error',

		// Enforce operators to be placed before or after line breaks
		'operator-linebreak': 'off',

		// Enforce padding within blocks
		'padded-blocks': ['error', 'never'],

		// Require quotes around object literal property names
		// http://eslint.org/docs/rules/quote-props.html
		'quote-props': ['error', 'as-needed',
			{
				keywords: false,
				unnecessary: true,
				numbers: false,
			},
		],

		// Specify whether double or single quotes should be used
		quotes: ['error', 'single', 'avoid-escape'],

		// Enforce spacing before and after semicolons
		'semi-spacing': ['error', { before: false, after: true }],

		// Require or disallow use of semicolons instead of ASI
		semi: ['error', 'always'],

		// Require or disallow space before blocks
		'space-before-blocks': 'error',

		// Require or disallow space before function opening parenthesis
		// https://github.com/eslint/eslint/blob/master/docs/rules/space-before-function-paren.md
		'space-before-function-paren': ['error',
			{
				anonymous: 'never',
				named: 'never',
			},
		],

		// Require or disallow spaces inside parentheses
		'space-in-parens': ['error', 'never'],

		// Require spaces around operators
		'space-infix-ops': 'error',

		// Require or disallow spaces before/after unary operators
		'space-unary-ops': 'error',

		// Require or disallow a space immediately following the // or /* in a comment
		'spaced-comment': ['error', 'always'],

		// ECMAScript 6
		// ---------------------------------------------------------------------

		// Enforces no braces where they can be omitted
		// http://eslint.org/docs/rules/arrow-body-style
		'arrow-body-style': ['error', 'as-needed'],

		// Require parens in arrow function arguments
		'arrow-parens': 'error',

		// Require space before/after arrow function's arrow
		// https://github.com/eslint/eslint/blob/master/docs/rules/arrow-spacing.md
		'arrow-spacing': ['error', { before: true, after: true }],

		// Require trailing commas in multiline object literals
		'comma-dangle': ['error', 'always-multiline'],

		// verify super() callings in constructors
		'constructor-super': 'error',

		// Enforce the spacing around the * in generator functions
		'generator-star-spacing': ['error', { 'before': false, 'after': true }],

		// Disallow modifying variables of class declarations
		'no-class-assign': 'error',

		// Disallow arrow functions where they could be confused with comparisons
		// http://eslint.org/docs/rules/no-confusing-arrow
		'no-confusing-arrow': 'error',

		// Disallow modifying variables that are declared using const
		'no-const-assign': 'error',

		// Disallow duplicate class members
		'no-dupe-class-members': 'error',

		// Disallow duplicate module imports
		'no-duplicate-imports': 'error',

		// Disallow symbol constructor
		'no-new-symbol': 'error',

		// Disallow specific globals
		'no-restricted-globals': 'error',

		// Disallow to use this/super before super() calling in constructors.
		'no-this-before-super': 'error',

		// Disallow unnecessary computed property keys in object literals
		'no-useless-computed-key': 'error',

		// Disallow unnecessary constructor
		// http://eslint.org/docs/rules/no-useless-constructor
		'no-useless-constructor': 'error',

		// Disallow renaming import, export, and destructured assignments to the same name
		'no-useless-rename': 'error',

		// Require let or const instead of var
		'no-var': 'error',

		// Require method and property shorthand syntax for object literals
		// https://github.com/eslint/eslint/blob/master/docs/rules/object-shorthand.md
		'object-shorthand': 'error',

		// Suggest using arrow functions as callbacks
		'prefer-arrow-callback': 'error',

		// Suggest using of const declaration for variables that are never modified after declared
		'prefer-const': 'error',

		// Use rest parameters instead of arguments
		// http://eslint.org/docs/rules/prefer-rest-params
		'prefer-rest-params': 'error',

		// Suggest using the spread operator instead of .apply()
		'prefer-spread': 'error',

		// Disallow generator functions that do not have yield
		'require-yield': 'error',

		// Enforce spacing between rest and spread operators and their expressions
		'rest-spread-spacing': 'error',

		// Enforce sorted import declarations within modules
		'sort-imports': 'off',

		// Enforce usage of spacing in template strings
		// http://eslint.org/docs/rules/template-curly-spacing
		'template-curly-spacing': ['error', 'never'], // 'always'

		// Enforce spacing around the * in yield* expressions
		// http://eslint.org/docs/rules/yield-star-spacing
		'yield-star-spacing': ['error', 'after'],
	},
}
