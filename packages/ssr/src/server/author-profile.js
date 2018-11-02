const authorProfile = require("../component/author-profile");
const runServer = require("../lib/run-server");

module.exports = async (slug, page) => await runServer(authorProfile, slug, page);
