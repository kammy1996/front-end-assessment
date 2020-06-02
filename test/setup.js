// require("jsdom-global")();
// require("regenerator-runtime/runtime");
const fetch = require("node-fetch");

if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}