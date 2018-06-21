# css-wrap

> Wrap CSS rules in a namespace

## Install

```shell
npm install grunt-css-wrap --save-dev
```

## Usage

`csswrap(string|file, options)`

```js
var
  css_wrap = require('css-wrap'),
  output = css_wrap('.some-css-selector { background: green; }', {
    selector: '.my-app'
  });
console.log(output)
// .my-app .some-css-selector {
//   background: green;
// }
```

## Options

#### options.selector
Type: `String`
Default value: `.css-wrap`

Provide a namespace selector in which to wrap CSS.

#### options.skip
Type: `Regular expression`
Default value: `null`

Skip css rules by regular expressions

#### options.parent
Type: `Boolean`
Default value: `true`

Causes `options.selector` to be a parent of wrapped selectors

#### options.sibling
Type: `Boolean`
Default value: `false`

Causes `options.selector` to be a sibling of wrapped selectors

## Changelog

v0.0.1 - Initial Release
v0.0.2 - Added options.skip
v0.1.1 - Added options.sibling and options.parent
