#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pkg = require(__dirname + "/../package.json");
var _ = require("lodash");
var fs = require("fs");
var jsyaml = require("js-yaml");
var minimist = require("minimist");
var BlasterServer_1 = require("./BlasterServer");
process.on("SIGINT", function () {
    console.log("Got a sigint bye...");
    process.exit(0);
});
function blasterInfo(args) {
    var info = [];
    if (args.help) {
        info.push("this is a record & replay tool");
    }
    if (args.version) {
        info.push(pkg.version);
    }
    return info;
}
exports.blasterInfo = blasterInfo;
function startup(args) {
    try {
        new BlasterServer_1.default().start();
        var options = jsyaml.safeLoad(fs.readFileSync(args._[1], "utf8"));
    }
    catch (e) {
        console.log("Please follow readme to provide correct .yml file.");
    }
}
exports.startup = startup;
function main(args) {
    _.forEach(blasterInfo(args), function (info) { return console.log(info); });
    startup(args);
}
exports.default = main;
main(minimist(process.argv.slice(2), { alias: { help: "h", version: "v", extions: "e" } }));
