import { assert } from "chai";
import {
  loop,
  log,
  extendQuery,
  parseNumber,
  asEl,
  invoke,
  noop,
  identity,
  kebabToCamel,
  camelToKebab,
} from "./../index.js";

describe("loop", () => {
  test("should call the given function for each item in the array", () => {
    const mockFn = jest.fn();
    const array = [1, 2, 3];

    loop(mockFn)(array);

    expect(mockFn).toHaveBeenCalledTimes(array.length);
    expect(mockFn).toHaveBeenCalledWith(1);
    expect(mockFn).toHaveBeenCalledWith(2);
    expect(mockFn).toHaveBeenCalledWith(3);
  });
});

describe("log", () => {
  test("should log the given value to the console and return the same value", () => {
    const value = "test";
    console.log = jest.fn();

    const result = log(value);

    expect(console.log).toHaveBeenCalledWith(value);
    expect(result).toBe(value);
  });
});

describe("extendQuery", () => {
  test("should return an object with 'children' and 'siblings' properties", () => {
    const result = extendQuery("filter");

    expect(result).toHaveProperty("children");
    expect(result).toHaveProperty("siblings");
  });

  describe("children", () => {
    test("should return an array of child elements that match the given selector", () => {
      const el = document.createElement("div");
      const child1 = document.createElement("span");
      const child2 = document.createElement("div");
      const child3 = document.createElement("p");

      el.appendChild(child1);
      el.appendChild(child2);
      el.appendChild(child3);

      const result = extendQuery("filter").children(el, "div");

      expect(result).toContain(child2);
      expect(result).not.toContain(child1);
      expect(result).not.toContain(child3);
    });

    test("should default to matching all child elements if no selector is given", () => {
      const el = document.createElement("div");
      const child1 = document.createElement("span");
      const child2 = document.createElement("div");
      const child3 = document.createElement("p");

      el.appendChild(child1);
      el.appendChild(child2);
      el.appendChild(child3);

      const result = extendQuery("filter").children(el);

      expect(result).toContain(child1);
      expect(result).toContain(child2);
      expect(result).toContain(child3);
    });
  });

  describe("siblings", () => {
    test("should return an array of sibling elements that match the given selector", () => {
      const parent = document.createElement("div");
      const sibling1 = document.createElement("span");
      const sibling2 = document.createElement("div");
      const sibling3 = document.createElement("p");

      parent.appendChild(sibling1);
      parent.appendChild(sibling2);
      parent.appendChild(sibling3);

      const el = document.createElement("div");
      parent.appendChild(el);

      const result = extendQuery("filter").siblings(el, "div");

      expect(result).toContain(sibling2);
      expect(result).not.toContain(sibling1);
      expect(result).not.toContain(sibling3);
    });

    test("should default to matching all sibling elements if no selector is given", () => {
      const parent = document.createElement("div");
      const sibling1 = document.createElement("span");
      const sibling2 = document.createElement("div");
      const sibling3 = document.createElement("p");

      parent.appendChild(sibling1);
      parent.appendChild(sibling2);
      parent.appendChild(sibling3);

      const el = document.createElement("div");
      parent.appendChild(el);

      const result = extendQuery("filter").siblings(el);

      expect(result).toContain(sibling1);
      expect(result).toContain(sibling2);
      expect(result).toContain(sibling3);
    });
  });
});

describe("parseNumber", () => {
  it("should parse valid numbers", () => {
    expect(parseNumber("123")).toEqual(123);
    expect(parseNumber("123,456.78")).toEqual(123456.78);
    expect(parseNumber("-$12,345,678.90")).toEqual(-12345678.9);
    expect(parseNumber("1.23", ["fr-FR"])).toEqual(1.23);
  });

  it("should return NaN for invalid inputs", () => {
    expect(parseNumber("")).toBeNaN();
    expect(parseNumber("foo")).toBeNaN();
    expect(parseNumber("1.23.45")).toBeNaN();
    expect(parseNumber("1.23%", ["fr-FR"])).toBeNaN();
  });
});

describe("asEl", () => {
  it("returns node if it has a tagName property", () => {
    const node = document.createElement("div");
    expect(asEl(node)).toBe(node);
  });

  it("returns the parent element if node does not have a tagName property", () => {
    const node = document.createTextNode("");
    const parent = document.createElement("div");
    parent.appendChild(node);
    expect(asEl(node)).toBe(parent);
  });
});

describe("invoke", () => {
  it("calls the given function with the given arguments", () => {
    const fn = jest.fn();
    invoke(fn, "arg1", "arg2");
    expect(fn).toHaveBeenCalledWith("arg1", "arg2");
  });
});

describe("noop", () => {
  it("returns undefined", () => {
    expect(noop()).toBeUndefined();
  });
});

describe("identity", () => {
  it("returns the given argument", () => {
    expect(identity("foo")).toBe("foo");
  });
});

describe("kebabToCamel", () => {
  it("converts a kebab-case string to camelCase", () => {
    expect(kebabToCamel("foo-bar-baz")).toBe("fooBarBaz");
  });
});

describe("camelToKebab", () => {
  it("converts a camelCase string to kebab-case", () => {
    expect(camelToKebab("fooBarBaz")).toBe("foo-bar-baz");
  });
});

describe("parseNumber", () => {
  it("parses a number string with decimal point and thousands separator", () => {
    expect(parseNumber("1,234.56")).toBe(1234.56);
  });

  it("parses a number string with decimal point and no thousands separator", () => {
    expect(parseNumber("1234.56")).toBe(1234.56);
  });

  it("parses a number string with comma separator and no decimal point", () => {
    expect(parseNumber("1,234")).toBe(1234);
  });

  it("parses a negative number string with decimal point and thousands separator", () => {
    expect(parseNumber("-1,234.56")).toBe(-1234.56);
  });

  it("parses a number string with non-numeric characters", () => {
    expect(parseNumber("1,234.56 USD")).toBe(1234.56);
  });

  it("uses the navigator.languages property to determine the format", () => {
    const prevValue = navigator.languages;
    navigator.languages = ["de-DE"];
    expect(parseNumber("1.234,56")).toBe(1234.56);
    navigator.languages = prevValue;
  });
});

describe("accessor", () => {
  describe("Value", () => {
    it("sets the value of the given property on the element", () => {
      const el = document.createElement("input");
      const set = accessor.Value("value")(el);
      set("foo");
      expect(el.value).toBe("foo");
    });

    it("gets the value of the given property on the element", () => {
      const el = document.createElement("input");
      el.value = "foo";
      const get = accessor.Value("value")(el);
      expect(get()).toBe("foo");
    });
  });

  describe("Number", () => {
    it("sets the value of the given property on the element as a number", () => {
      const el = document.createElement("input");
      const set = accessor.Number("value")(el);
      set("123");
      expect(el.value).toBe;
    });
  });
});
