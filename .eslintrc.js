module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    "eslint:recommended",
    "plugin:react/recommended",
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'parser': 'babel-eslint',
  'plugins': [
    'react',
  ],
  'rules': {
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "max-len": ["error", { "code": 120 }],
    "no-tabs": ["off"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": false,
        "MethodDefinition": true,
        "ClassDeclaration": false,
        "ArrowFunctionExpression": false,
        "FunctionExpression": false
      }
    }],
    "linebreak-style": ["error", "windows"],
    "object-curly-spacing": ["error", "always"],
  },
};