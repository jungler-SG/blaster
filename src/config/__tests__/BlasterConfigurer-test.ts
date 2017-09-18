import * as fs from "fs";
import {expect} from "chai";
import "mocha";
import BlasterConfigurer from "../BlasterConfigurer";

describe("BlasterConfigurer", () => {

    let path;
    let blasterConfigurer;

    beforeEach(() => {
        path = fs.readFileSync(__dirname + "/test.yml", "utf8");
        blasterConfigurer = BlasterConfigurer.getInstance(path);
    });

    it("give yml file config should be created", () => {
        expect(blasterConfigurer.blasterConfig.replay).to.equal(true);
    });

    it("give matched URI should return relevant Server", () => {
        const server = blasterConfigurer.getTargetServerConfigByUri("/api/test1/unit");
        expect(server.hostName).to.equal("test1.com");
    });

    it("give null URI should return undefined", () => {
        const server = blasterConfigurer.getTargetServerConfigByUri(null);
        expect(server).to.be.equal(undefined);
    });

    it("give not exist URI should return undefined", () => {
        const server = blasterConfigurer.getTargetServerConfigByUri("/test/not_exist");
        expect(server).to.be.equal(undefined);
    });

});
