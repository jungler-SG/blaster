#!/usr/bin/env node
const pkg = require(__dirname + "/../package.json");
import * as _ from "lodash";
import * as fs from "fs";
import * as minimist from "minimist";

import BlasterServer from "./BlasterServer";
import BlasterConfigurer from "./config/BlasterConfigurer";

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

export async function startup(args) {
    try {
        BlasterConfigurer.getInstance(fs.readFileSync(args._[0], "utf8"));
        await new BlasterServer().start();
    } catch (e) {
        console.log(e.message);
        console.log("Please follow readme to provide correct .yml file.");
    }
}

function main(args) {
    _.forEach(blasterInfo(args), (info) => console.log(info));
    startup(args);
}

main(minimist(process.argv.slice(2), {alias: {help: "h", version: "v", extions: "e"}}));
