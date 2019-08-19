module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'es'
    ],
    'rules': {
        'indent': [
            'warn',
            'tab'
        ],
        'linebreak-style': [
            'off',
            'windows'
        ],
        'no-mixed-spaces-and-tabs': ["off", "smart-tabs"],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        "es/no-async-iteration": "error",
        "es/no-malformed-template-literals": "error",
        "es/no-regexp-lookbehind-assertions": "error",
        "es/no-regexp-named-capture-groups": "error",
        "es/no-regexp-s-flag": "error",
        "es/no-regexp-unicode-property-escapes": "error"
    }
};