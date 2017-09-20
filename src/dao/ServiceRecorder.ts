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
            this.db.collection(collection).remove((result) => resolve(result));
        });
    }
    public storeGet = (getTransaction: any, callBack: (error: any, result: any) => any) => {
        const requestHash = hash(getTransaction.request);
        const getRequestWithHash = {hash: requestHash, request: getTransaction.request, response: getTransaction.response};
        const collection = this.db.collection("GET");
        collection.insert(getRequestWithHash, callBack);
    }

    public hasGetRequest = (request: any, callBack: (error: any, result: any) => any) => {
        const requestHash = hash(request);
        const collection = this.db.collection("GET");
        collection.findOne({hash: requestHash}, callBack);
    }

}
