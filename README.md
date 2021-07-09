# babel-jsx-pragma-module-auto-import
use jsx to create element and auto import the self define module by using self define babel pragma

<p align="center"><a href="https://infernojs.org/" target="_blank"><img width="400" alt="Inferno" title="Inferno" src="https://user-images.githubusercontent.com/2021355/36073166-a47d4a8e-0f34-11e8-959c-860ea836d79d.png"></p>

<p align="center">
  <a href="https://www.npmjs.com/package/babel-jsx-pragma-module-auto-import"><img src="https://img.shields.io/npm/dm/babel-jsx-pragma-module-auto-import.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/babel-jsx-pragma-module-auto-import"><img src="https://img.shields.io/npm/v/babel-jsx-pragma-module-auto-import.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/babel-jsx-pragma-module-auto-import"><img src="https://img.shields.io/npm/l/babel-jsx-pragma-module-auto-import.svg" alt="License"></a>
</p>

# Introduce

> Plugin for babel 7+ to enable JSX for project, and it's a extension for @babel/preset-react to solve the problem module cannot auto import when using pragma.

@babel/preset-react has a pragma option that's used when transforming JSX to function calls instead of the default function React.createElement.

This Babel plugin is a companion to that feature that allows you to dynamically load a module associated with the pragma value.

Example:

Given this file:
```
const jsxComp = () => {
    return <div>anything</div>
}

export default jsxComp;
```
After use the plugin to auto import:
```
import { createElement } from "./lib";

const jsxComp = () => {
  return <div>anything</div>;
};

export default jsxComp;
```

## How to install

```bash
npm i --save-dev babel-jsx-pragma-module-auto-import
```

## How to use

Add the plugin to your `package.json` and update the plugin section in your `.babelrc` file. Or if your Babel settings are located inside the `package.json` - update the plugin section there.

It's important that you also include the `babel-plugin-syntax-jsx`plugin.

Example on a `.babelrc` file that will work:

Make sure plugin is added before babel module transformers

```js
const path = require('path');
module.exports = {
    presets: [
        [
            '@babel/preset-react',
            {
                // 自定义createElement替代React.createElement
                pragma: 'createElement'
            }
        ],
        '@babel/preset-env'
    ],
    plugins: [
        [
            'module:babel-jsx-pragma-module-auto-import',
            {
                path: './lib',
                name: 'createElement'
            }
        ]
    ]
}
```