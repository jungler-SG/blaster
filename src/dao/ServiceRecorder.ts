const Tingo = require("tingodb")();
const hash = require("object-hash");

export default class ServiceRecorder {

    public static getInstance(): ServiceRecorder {
        return this.instance || ServiceRecorder.getInstanceWithPath("./data_store/tingo");
    }

    public static getInstanceWithPath(path: string): ServiceRecorder {
        return this.instance || (this.instance = new this(path));
    }

    private static instance: ServiceRecorder;

    public db;

    private constructor(path: string) {
        this.db = new Tingo.Db(path, {});
    }

    public clearCollection = (collection: string) => {
        return new Promise((resolve) => {
            this.db.collection(collection).remove((error, result) => resolve(result));
        });
    }

    public storeGet = (getTransaction) => {
        const requestHash = hash(getTransaction.request);
        const getRequestWithHash = {hash: requestHash, request: getTransaction.request, response: getTransaction.response};
        return new Promise((resolve) => {
            this.db.collection("GET").insert(getRequestWithHash, (error, result) => resolve(result));
        });
    }

    public fetchGetRequest = (request: any) => {
        const requestHash = hash(request);
        return new Promise((resolve) => {
            this.db.collection("GET").findOne({hash: requestHash}, (error, result) => resolve(result));
        });
    }

    public hasGetRequest = async (request: any) => {
        const getTxn = await this.fetchGetRequest(request);
        return getTxn !== null;
    }

}
