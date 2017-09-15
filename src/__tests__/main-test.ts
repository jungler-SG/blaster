const pkg = require(__dirname + "/../../package.json");
import { expect } from "chai";
import "mocha";
import { blasterInfo } from "../main";

describe("blasterInfo", () => {
  it("give help command then help information should be returned", () => {
    const result = blasterInfo({help: "h"});
    expect(result[0]).to.equal("this is a record & replay tool");
  });
  it("give version command then blaster version should be returned", () => {
    const result = blasterInfo({version: "v"});
    expect(result[0]).to.equal(pkg.version);
  });
});
