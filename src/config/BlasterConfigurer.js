"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var jsyaml = require("js-yaml");
var BlasterConfigurer = (function () {
    function BlasterConfigurer(configPath) {
        var options = jsyaml.safeLoad(configPath);
        this.blasterConfig = this.getConfigFromOptions(options.server);
        this.serverList = this.getServerListFromTargets(options.targets);
    }
    BlasterConfigurer.getInstance = function (configPath) {
        if (configPath === void 0) { configPath = ""; }
        return this.instance || (this.instance = new this(configPath));
    };
    BlasterConfigurer.prototype.getTargetServerConfigByUri = function (uri) {
        uri = uri || "";
        var targetServer = _.findLast(this.serverList, function (server) {
            return uri.indexOf(server.endpoint) !== -1;
        });
        return targetServer || {};
    };
    BlasterConfigurer.prototype.getConfigFromOptions = function (server) {
        return server;
    };
    BlasterConfigurer.prototype.getServerListFromTargets = function (targets) {
        return targets;
    };
    return BlasterConfigurer;
}());
exports.default = BlasterConfigurer;
