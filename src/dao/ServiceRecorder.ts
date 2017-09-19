const Tingo = require("tingodb")();

export default class ServiceRecorder {

    public static getInstance(): ServiceRecorder {
        return ServiceRecorder.getInstanceWithPath("./data_store/tingo");
    }

    public static getInstanceWithPath(path: string): ServiceRecorder {
        return this.instance || (this.instance = new this(path));
    }

    private static instance: ServiceRecorder;

    public db;

    private constructor(path: string) {
        this.db = new Tingo.Db(path, {});
    }

    public clearCollection(collection: string, callback: () => void): void {
        this.db.collection(collection).remove(callback);
    }

    public storeGet(response: any, callBack: (error: any, result: any) => void): void {
        const collection = this.db.collection("GET");
        collection.insert(response, callBack);
    }

}
