#!/usr/bin/env node
const pkg = require(__dirname + "/../package.json");
import * as _ from "lodash";
import * as fs from "fs";
import * as jsyaml from "js-yaml";
import * as minimist from "minimist";

import BlasterServer from "./BlasterServer";

process.on("SIGINT",  () => {
  console.log("Got a sigint bye...");
  process.exit(0);
});

export function blasterInfo(args) {
    const info = [];
    if (args.help) {
        info.push("this is a record & replay tool");
    }
    if (args.version) {
        info.push(pkg.version);
    }
    return info;
}

export function startup(args) {
    try {
        new BlasterServer().start();
        const options = jsyaml.safeLoad(fs.readFileSync(args._[1], "utf8"));
    }catch (e) {
        console.log("Please follow readme to provide correct .yml file.");
    }
}

export default function main(args) {
    _.forEach(blasterInfo(args), (info) => console.log(info));
    startup(args);
}

main(minimist(process.argv.slice(2), {alias: {help: "h", version: "v", extions: "e"}}));
