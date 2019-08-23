/**
 * Babel ^7.x config file
 * Created by SherrY on 2019-8-23
 */

const presets = [
    [
        '@babel/env',
        {
            targets: {
                edge: '17',
                firefox: '60',
                chrome: '67',
                safari: '11.1',
            },
            useBuiltIns: 'usage',
            corejs: { version: 3, proposals: true }
        },
    ],
    '@babel/preset-react',
];

const plugins = [
    '@babel/plugin-proposal-class-properties',
    'transform-es5-property-mutators'
];

module.exports = { presets, plugins };