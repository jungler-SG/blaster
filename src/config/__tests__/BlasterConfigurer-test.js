"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var chai_1 = require("chai");
require("mocha");
var BlasterConfigurer_1 = require("../BlasterConfigurer");
describe("BlasterConfigurer", function () {
    var path;
    var blasterConfigurer;
    beforeEach(function () {
        path = fs.readFileSync(__dirname + "/test.yml", "utf8");
        blasterConfigurer = BlasterConfigurer_1.default.getInstance(path);
    });
    it("give yml file config should be created", function () {
        chai_1.expect(blasterConfigurer.blasterConfig.replay).to.equal(true);
    });
    it("give matched URI should return relevant Server", function () {
        var server = blasterConfigurer.getTargetServerConfigByUri("/api/test1/unit");
        chai_1.expect(server.hostName).to.equal("test1.com");
    });
    it("give null URI should return undefined", function () {
        var server = blasterConfigurer.getTargetServerConfigByUri(null);
        chai_1.expect(server).to.be.eql({});
    });
    it("give not exist URI should return undefined", function () {
        var server = blasterConfigurer.getTargetServerConfigByUri("/test/not_exist");
        chai_1.expect(server).to.be.eql({});
    });
});
