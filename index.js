/**
 * Applies the given function to each element of the given array.
 *
 * @param {function} fn - The function to apply to each element of the array.
 * @returns {function} A function that takes an array and applies the given function to each element.
 */
const loop = (fn) => (xs) => {
  for (const x of xs) fn(x);
};

/**
 * Logs the given value to the console and returns it.
 *
 * @param {*} x - The value to be logged.
 * @returns {*} The input value.
 */
const log = (x) => (console.log(x), x);

/**
 * Factory function to create an object with utility methods to query DOM elements
 * @param {string} filterOrFind - Method used to filter or find elements
 * @returns {Object} - Object with utility methods for querying DOM elements
 */
const extendQuery = (filterOrFind) => ({
  /**
   * Get all children of an element matching a selector
   * @param {Element} el - The parent element
   * @param {string} [sel="*"] - The selector to filter the children by
   * @returns {Array<Element>} - An array of child elements
   */
  children: (el, sel = "*") =>
    [...el.children][filterOrFind]((x) => x.matches(sel)),

  /**
   * Get all sibling elements of an element matching a selector
   * @param {Element} el - The element whose siblings should be returned
   * @param {string} [sel="*"] - The selector to filter the siblings by
   * @returns {Array<Element>} - An array of sibling elements
   */
  siblings: (el, sel = "*") =>
    [...el.parentElement.children][filterOrFind]((x) => x.matches(sel)),
});

/**
 * Get the index of an element relative to its parent, based on the provided selector
 * @param {Element} el - The element to find the index of
 * @param {string} sel - The selector used to find the element's siblings
 * @returns {number} - The index of the element within its parent's list of matching children
 */
extendQuery.index = (el, sel) =>
  extendQuery("filter").children(el.parentElement, sel).indexOf(el);

/**
 * Query for all elements matching a selector within a given parent element
 * @param {string} sel - The selector to match elements against
 * @param {Element} [el=document] - The parent element to search within
 * @returns {NodeList} - A list of matching elements
 */
const QSA = Object.assign(
  (sel, el = document) => el.querySelectorAll(sel),
  extendQuery("filter")
);

/**
 * Query for the first element matching a selector within a given parent element
 * @param {string} sel - The selector to match elements against
 * @param {Element} [el=document] - The parent element to search within
 * @returns {Element} - The first matching element
 */
const QS = Object.assign(
  (sel, el = document) => el.querySelector(sel),
  extendQuery("find")
);

/**
 * Returns the provided node if it is an element, or the parent element if it is not.
 *
 * @param {Node} node - The node to check.
 * @returns {Element} - The provided node if it is an element, or the parent element if it is not.
 */
const asEl = (node) => (node.tagName ? node : node.parentElement);

/**
 * Invokes the provided function with the specified arguments.
 *
 * @param {Function} fn - The function to invoke.
 * @param {...*} args - The arguments to pass to the function.
 * @returns {*} - The result of invoking the function.
 */
const invoke = (fn, ...args) => fn(...args);

/**
 * A function that does nothing and returns undefined.
 */
const noop = () => {};

/**
 * Returns the provided value unchanged.
 *
 * @param {*} x - The value to return.
 * @returns {*} - The provided value.
 */
const identity = (x) => x;

/**
 * Converts a kebab-case string to camelCase.
 *
 * @param {string} str - The kebab-case string to convert.
 * @returns {string} - The camelCase version of the string.
 */
const kebabToCamel = (str) => str.replace(/-./g, (m) => m.toUpperCase()[1]);

/**
 * Converts a camelCase string to kebab-case.
 *
 * @param {string} str - The camelCase string to convert.
 * @returns {string} - The kebab-case version of the string.
 */
const camelToKebab = (str) =>
  str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/**
 * Parses a number from a string, using the specified locales to determine the format.
 *
 * @param {string} value - The string to parse as a number.
 * @param {string|string[]} [locales=navigator.languages] - The locale(s) to use for formatting. Defaults to the user's browser language settings.
 * @returns {number} - The parsed number, or NaN if the string could not be parsed.
 */
const parseNumber = (value, locales = navigator.languages) => {
  const example = Intl.NumberFormat(locales).format("1.1");
  const cleanPattern = new RegExp(`[^-+0-9${example.charAt(1)}]`, "g");
  const cleaned = value.replace(cleanPattern, "");
  const normalized = cleaned.replace(example.charAt(1), ".");

  return parseFloat(normalized);
};

/**
 * Object containing accessor functions to read or write properties of an element
 * @namespace
 * @property {function} Value - Returns or sets the value of a property as a string
 * @property {function} Number - Returns or sets the value of a property as a number
 * @property {function} String - Returns or sets the value of a property as a string
 * @property {function} Boolean - Returns or sets the value of a property as a boolean
 * @property {function} Object - Returns or sets the value of a property as an object
 * @property {function} Array - Returns or sets the value of a property as an array
 * @property {function} ContentEditable - Returns or sets the `contentEditable` property of an element
 * @property {function} Attributes - Returns or sets the attributes of an element
 * @memberof module:accessor
 */
const accessor = {
  Value:
    /**
     * Returns or sets the value of a property as a string
     * @function
     * @param {string} prop - The name of the property
     * @param {Element} el - The element to access the property of
     * @param {...string} a - Optional arguments to set the property value
     * @returns {string} - The current value of the property
     */


      (prop) =>
      (el) =>
      (...a) =>
        a.length ? (el[prop] = a[0]) : el[prop],

  Number:
    /**
     * Returns or sets the value of a property as a number
     * @function
     * @param {string} prop - The name of the property
     * @param {Element} el - The element to access the property of
     * @param {...number} a - Optional arguments to set the property value
     * @returns {number} - The current value of the property
     */


      (prop) =>
      (el) =>
      (...a) =>
        a.length ? (el[prop] = Number(a[0])) : Number(el[prop]),

  String:
    /**
     * Returns or sets the value of a property as a string
     * @function
     * @param {string} prop - The name of the property
     * @param {Element} el - The element to access the property of
     * @param {...string} a - Optional arguments to set the property value
     * @returns {string} - The current value of the property
     */


      (prop) =>
      (el) =>
      (...a) =>
        a.length ? (el[prop] = a[0] || "") : el[prop] || "",

  Boolean:
    /**
     * Returns or sets the value of a property as a boolean
     * @function
     * @param {string} prop - The name of the property
     * @param {Element} el - The element to access the property of
     * @param {...boolean} a - Optional arguments to set the property value
     * @returns {boolean} - The current value of the property
     */


      (prop) =>
      (el) =>
      (...a) =>
        a.length ? (el[prop] = !!a[0]) : !!el[prop],

  Object:
    /**
     * Returns or sets an object property of an HTML element.
     * @function
     * @param {string} prop - The name of the property to get or set.
     * @param {HTMLElement} el - The element whose property to get or set.
     * @param {Object} [a] - The value to set the property to. If absent, the current value of the property is returned.
     * @returns {Object} - The current value of the property, or the element itself if setting the property.
     */


      (prop) =>
      (el) =>
      (...a) =>
        a.length ? Object.assign(el[prop], a[0]) : el[prop],

  Array:
    /**
     * Returns or sets an array property of an HTML element.
     * @function
     * @param {string} prop - The name of the property to get or set.
     * @param {HTMLElement} el - The element whose property to get or set.
     * @param {Array} [a] - The value to set the property to. If absent, a copy of the current value of the property is returned.
     * @returns {Array} - The current value of the property, or the element itself if setting the property.
     */


      (prop) =>
      (el) =>
      (...a) =>
        a.length ? (el[prop] = a[0]) : [...el[prop]],

  ContentEditable:
    /**
     * Returns or sets the contentEditable attribute of an HTML element.
     * @function
     * @param {HTMLElement} el - The element whose contentEditable attribute to get or set.
     * @param {boolean} [a] - The value to set the contentEditable attribute to. If absent, the current value of the attribute is returned.
     * @returns {string|boolean} - The current value of the contentEditable attribute, or the element itself if setting the attribute.
     */


      (el) =>
      (...a) =>
        a.length
          ? (el.contentEditable = a[0] ? "true" : "false")
          : el.isContentEditable,

  Attributes:
    /**
     * Returns or sets the attributes of an HTML element.
     * @function
     * @param {HTMLElement} el - The element whose attributes to get or set.
     * @param {Object} [a] - An object containing attribute names and their values. If absent, an object containing all the element's attributes and their values is returned.
     * @returns {Object} - An object containing the current values of the element's attributes, or the element itself if setting the attributes.
     */


      (el) =>
      (...a) => {
        const set = () =>
          Object.entries(a[0]).reduce((obj, [k, v]) => {
            el.setAttribute(k, v);
            obj[k] = v;
            return obj;
          }, {});
        const get = () =>
          [...el.attributes].reduce((obj, x) => {
            obj[x.name] = x.value;
            return obj;
          }, {});
        return a.length ? set() : get();
      },
};

/**
 * Regular expression to match falsy values, such as "false", "f", "0", and whitespace.
 * @type {RegExp}
 */
const falseRE = /^\s*|false|f|0|\s*$/i;

/**
 * Converts a value to a boolean value. If the input is a string, it is considered falsy if it matches the `falseRE` regular expression.
 * @param {any} any - The value to convert to a boolean.
 * @returns {boolean} - The resulting boolean value.
 */
const asBool = (any) => (typeof any === "string" ? !falseRE.test(any) : !!any);

/**
 * Compares two values for equality. If the values are objects, their properties are compared recursively.
 * @param {any} a - The first value to compare.
 * @param {any} b - The second value to compare.
 * @returns {boolean} - `true` if the values are equal, `false` otherwise.
 */
const equals = (a, b) => {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();

  if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
    return a === b;

  if (a.prototype !== b.prototype) return false;

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;

  return keys.every((k) => equals(a[k], b[k]));
};

/**
 * Regular expression to test if a string has a valid dot notation.
 *
 * @constant
 * @type {RegExp}
 */
const dotNoteRE = /^[\w|\$|\_][\w|\$|\_|0-9]+/;

/**
 * Tests if a string has a valid dot notation.
 *
 * @function
 * @param {string} v - The string to be tested.
 * @returns {string} - A string with either a dot or a bracket notation depending on the test.
 */
const dotOrBox = (v) =>
  dotNoteRE.test(v) ? `${v}.` : `[${v.replaceAll('"', '\\"')}].`;

/**
 * Flattens an object with nested properties into a one-level object with dot or bracket notation keys.
 *
 * @function
 * @param {Object} obj - The object to be flattened.
 * @param {Object} c - An optional object containing the parameters prefix and join, which customize the function behavior.
 * @param {string} c.prefix - An optional string to be used as a prefix for the flattened keys.
 * @param {function} c.join - An optional function that receives a string and returns either a dot or a bracket notation string depending on the value.
 * @returns {Object} - A new object with dot or bracket notation keys.
 */
const flattenObject = (obj, c) => {
  const { prefix, join } = Object.assign({ prefix: "", join: dotOrBox }, c);
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}` : "";
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(
        acc,
        flattenObject(obj[k], { prefix: pre + join(k), join })
      );
    else acc[pre + k] = obj[k];
    return acc;
  }, {});
};

/**
 * Higher-order function that applies a mapping function to its input, and returns the result if successful or the default value if an error occurs.
 *
 * @function
 * @param {function} mapFn - The mapping function to be applied.
 * @param {function} withDefault - An optional function to handle the error and return a default value. Defaults to a function that returns undefined.
 * @returns {function} - A new function that receives the same arguments as the mapping function, applies it and returns either the result or the default value.
 */
const maybe =
  (mapFn, withDefault = noop) =>
  (...args) => {
    try {
      return mapFn(...args);
    } catch (e) {
      return withDefault(e, ...args);
    }
  };

/**
 * Asynchronous higher-order function that measures the performance of an asynchronous function and logs it to the console.
 *
 * @function
 * @async
 * @param {function} fn - The asynchronous function to measure the performance.
 * @param {string} _name - An optional string that defines the name of the performance measurement. Defaults to the name of the passed function.
 * @returns {function} - An asynchronous function that receives the same arguments as the passed function, measures its performance and logs the results to the console.
 */
const perf =
  (fn, _name) =>
  async (...args) => {
    const name = _name || fn.name;
    performance.mark("a");
    const result = await Promise.resolve(fn(...args));
    performance.mark("b");
    performance.measure(name, "a", "b");
    loop(console.log)(performance.getEntriesByName(name, "measure"));
    return result;
  };

/**
 * Comparator function that compares two nodes based on their position in the document tree.
 *
 * @function
 * @param {Node} a - The first node to be compared.
 * @param {Node} b - The second node to be compared.
 * @returns {number} - A number indicating the result of the comparison: -1 if a is before b in the document tree, 1 if a is after b, or 0 if they have the same position.
 */
const documentPositionComparator = (a, b) => {
  if (a === b) {
    return 0;
  }
  var position = a.compareDocumentPosition(b);
  if (
    position & Node.DOCUMENT_POSITION_FOLLOWING ||
    position & Node.DOCUMENT_POSITION_CONTAINED_BY
  ) {
    return -1;
  } else if (
    position & Node.DOCUMENT_POSITION_PRECEDING ||
    position & Node.DOCUMENT_POSITION_CONTAINS
  ) {
    return 1;
  } else {
    return 0;
  }
};

/**
 * Sorts an array-like object of DOM elements or a NodeList by their position in the document tree using the `documentPositionComparator` function.
 *
 * @function
 * @param {Array|NodeList} els - The array-like object of DOM elements or a NodeList to be sorted.
 * @returns {Array} - A new array containing the sorted elements.
 */
const sortEls = (els) =>
  ("sort" in els ? els : [...els]).sort(documentPositionComparator);

/**
 * Object containing methods for retrieving and setting attributes of a DOM element.
 *
 * @constant
 * @type {object}
 * @property {Function} 1 - Returns an object containing all attributes of the given element and their values.
 * @property {Function} 2 - Returns the value of the attribute with the given name for the given element.
 * @property {Function} 3 - Sets the value of the attribute with the given name for the given element.
 */
const attrPatternMatch = {
  1: (el) => {
    const o = {};
    loop((a) => {
      o[a.name] = a.value;
    })(el.attributes);
    return o;
  },
  2: (el, get) => el.getAttribute(get),
  3: (el, get, set) => el.setAttribute(get, set),
};

/**
 * Returns an attribute of a DOM element, or sets a new value for the attribute.
 *
 * @function
 * @param {...*} args - Either the element and no more than one attribute name to retrieve its value, or the element, an attribute name and a new value to set.
 * @returns {*} - The value of the attribute if only the element and attribute name are provided, or nothing if setting a new value.
 */
const attr = (...args) => attrPatternMatch[args.length](args);

/**
 * Object containing methods for retrieving and setting CSS styles of a DOM element.
 *
 * @constant
 * @type {object}
 * @property {Function} 2 - Returns the computed value of the CSS property with the given name for the given element.
 * @property {Function} 3 - Sets the value of the CSS property with the given name for the given element.
 */
const cssPatternMatch = {
  2: (el, key) => getComputedStyle(el).getPropertyValue(key),
  3: (el, key, value) => {
    el.style[key] = value;
  },
};

/**
 * Returns the computed value of a CSS property for a DOM element, or sets a new value for the property.
 *
 * @function
 * @param {...*} args - Either the element and a CSS property name to retrieve its value, or the element, a CSS property name and a new value to set.
 * @returns {*} - The computed value of the CSS property if only the element and property name are provided, or nothing if setting a new value.
 */
const css = (...args) => cssPatternMatch[args.length](...args);

export {
  loop,
  log,
  QSA,
  QS,
  asEl,
  sortEls,
  css,
  invoke,
  equals,
  flattenObject,
  perf,
  attr,
  maybe,
  noop,
  identity,
  asBool,
  kebabToCamel,
  camelToKebab,
  accessor,
  parseNumber,
};
