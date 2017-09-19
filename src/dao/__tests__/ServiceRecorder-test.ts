import "mocha";
import { expect } from "chai";
import ServiceRecorder from "../ServiceRecorder";

describe("ServiceRecorder Tests", () => {

    const mockResponse = {hearder: "someheader", body: "somebody"};

    before((done) => {
        ServiceRecorder.getInstance();
        done();
    });

    beforeEach((done) => {
        ServiceRecorder.getInstance().clearCollection("GET", null);
        ServiceRecorder.getInstance().clearCollection("POST", done);
    });

    it("should store a new api response", (done) => {
        const tingoDb = ServiceRecorder.getInstance();
        console.log(JSON.stringify(mockResponse));
        tingoDb.storeGet(mockResponse, (error: any, result: any) => {
            console.log("error: ", error);
            console.log("result: ", result);
            done();
        });

    });
});
