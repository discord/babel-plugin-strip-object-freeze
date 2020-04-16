# babel-plugin-strip-object-freeze

> Replace all instances of `Object.freeze(value)` with `value`

If you use `Object.freeze()` a lot in development to enforce constraints, you
may want to use this plugin to strip those `Object.freeze()` calls in production
for performance if they are not important.

## Install

```sh
npm install --save-dev babel-plugin-strip-object-freeze
```

## Usage

It's recommended that you only use this plugin in a production build.

```js
// babel.config.js
let presets = [ ... ]
let plugins = [ ... ]

if (process.env.NODE_ENV === "production") {
  plugins.push("babel-plugin-strip-object-freeze")
}

module.exports = { presets, plugins }
```

## Example

**Input:**

```js
Object.freeze(value)
```

**Output:**

```js
value
```
