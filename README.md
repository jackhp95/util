# JS Utilities

A collection of utility functions to make working with JavaScript easier.

## Install

### jsdelivr
```html
<script src="https://cdn.jsdelivr.net/gh/jackhp95/util@master/index.min.js"></script>
```


## Functions

### `loop(fn) => (xs) => void`

Iterates over an array `xs` and applies function `fn` to each element.

### `log(x) => any`

Prints a value to the console and returns it.

### `extendQuery(filterOrFind) => object`

Extends the `querySelectorAll` and `querySelector` functions with methods to find children and siblings. The parameter `filterOrFind` is either `"filter"` or `"find"` to specify which method should be used to filter the elements.

### `QSA(sel, el = document) => NodeList`

Extends the `querySelectorAll` function with the ability to find children and siblings.

### `QS(sel, el = document) => HTMLElement`

Extends the `querySelector` function with the ability to find children and siblings.

### `asEl(node) => HTMLElement`

If `node` is an HTML element, return it. If it is a child node, return its parent element.

### `invoke(fn, ...args) => any`

Invokes a function `fn` with arguments `args`.

### `noop() => void`

Returns undefined.

### `identity(x) => x`

Returns its argument `x`.

### `kebabToCamel(str) => string`

Converts kebab-case strings to camelCase.

### `camelToKebab(str) => string`

Converts camelCase strings to kebab-case.

### `parseNumber(value, locales) => number`

Parses a number from a string using the provided locales.

### `accessor`
Simple Getters and Setters for Elements.

#### `accessor.Value(prop)(el)(value?) => value | void`

Sets or gets the value of a property `prop` on an HTML element `el`.

#### `accessor.Number(prop)(el)(value?) => number | void`

Sets or gets the numeric value of a property `prop` on an HTML element `el`.

#### `accessor.String(prop)(el)(value?) => string | void`

Sets or gets the string value of a property `prop` on an HTML element `el`.

#### `accessor.Boolean(prop)(el)(value?) => boolean | void`

Sets or gets the boolean value of a property `prop` on an HTML element `el`.

#### `accessor.Object(prop)(el)(value?) => object | void`

Sets or gets the object value of a property `prop` on an HTML element `el`.

#### `accessor.Array(prop)(el)(value?) => array | void`

Sets or gets the array value of a property `prop` on an HTML element `el`.

#### `accessor.ContentEditable(el)(value?) => boolean | void`

Sets or gets the contentEditable property of an HTML element `el`.

#### `accessor.Attributes(el)(value?) => object | void`

Sets or gets the attributes of an HTML element `el`.

### `asBool(any) => boolean`

Converts a value to a boolean. If the value is a string, it is converted using a regular expression.

### `equals(a, b) => boolean`

Tests whether two values are equal. Works for primitive types, objects, and dates.

### `dotOrBox(v) => string`

Converts a property name to a dot notation string or a bracket notation string.

### `flattenObject(obj, c) => object`

Flattens an object by concatenating nested properties with a specified delimiter. The optional `c` parameter can be used to customize the delimiter and the join function.

### `maybe(mapFn, withDefault) => any`

Wraps a function `mapFn` with a try-catch block. If an exception is thrown, the `withDefault` function is called