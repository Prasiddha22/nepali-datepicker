const postcss = require('rollup-plugin-postcss');

module.exports = {
    rollup(config) {
        config.output = { dir: './dist', format: 'cjs' };
        config.build = { dir: './dist', format: 'cjs' };
        config.plugins.push(postcss());
        return config;
    },
};