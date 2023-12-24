// workaround for eslint not supporting mjs
// ref: https://zenn.dev/teppeis/scraps/c62621db4384d2
module.exports = import('./eslint.config.mjs').then((n) => n.default)
