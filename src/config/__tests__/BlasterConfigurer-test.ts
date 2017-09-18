import * as fs from "fs";
import {expect} from "chai";
import "mocha";
import BlasterConfigurer from "../BlasterConfigurer";

describe("BlasterConfigurer", () => {

    let path;
    beforeEach(() => {
        path = fs.readFileSync(__dirname + "/test.yml", "utf8");
    });

    it("give yml file config should be created", () => {
        const blasterConfigurer = BlasterConfigurer.getInstance(path);
        expect(blasterConfigurer.blasterConfig.replay).to.equal(true);
    });

    it("give matched URI should return relevant Server", () => {
        const blasterConfigurer = BlasterConfigurer.getInstance(path);
        const server = blasterConfigurer.getTargetServerConfigByUri("/api/test1/unit");
        expect(server.hostName).to.equal("test1.com");
    });
});
