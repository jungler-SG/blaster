const Tingo = require("tingodb")();
const hash = require("object-hash");
import {DataCollectionType} from "./../model/Constants";

export default class ServiceRecorder {

    public static getInstance(): ServiceRecorder {
        return this.instance || ServiceRecorder.getInstanceWithPath("./data_store/tingo");
    }

    public static getInstanceWithPath(path: string): ServiceRecorder {
        return this.instance || (this.instance = new this(path));
    }

    private static instance: ServiceRecorder;
    private static SERVICE_RECORDS = DataCollectionType[DataCollectionType.SERVICE_RECORDS];

    public db;

    private constructor(path: string) {
        this.db = new Tingo.Db(path, {});
    }

    public clearCollection = (collection: string) => {
        return new Promise((resolve) => {
            this.db.collection(collection).remove((error, result) => resolve(result));
        });
    }

    public insertServiceRecord = (getTnx) => {
        const requestHash = hash(getTnx.request);
        const getRequestWithHash = {hash: requestHash, request: getTnx.request, response: getTnx.response};
        return new Promise((resolve) => {
            this.db.collection(ServiceRecorder.SERVICE_RECORDS).insert(getRequestWithHash, (error, result) => resolve(result));
        });
    }

    public updateExistingRecord = (getTnx) => {
        const requestHash = hash(getTnx.request);
        const getTxnWithHash = {hash: requestHash, request: getTnx.request, response: getTnx.response};
        return new Promise((resolve) => {
            this.db.collection(ServiceRecorder.SERVICE_RECORDS).update({hash: requestHash}, getTxnWithHash, (error, result) => resolve(result));
        });
    }

    public updateOrInsertRecord = async (getTnx) => {
        const has = await this.hasRequest(getTnx.request);
        if (has) {
            return this.updateExistingRecord(getTnx);
        } else {
            return this.insertServiceRecord(getTnx);
        }
    }

    public fetchServiceRecord = (request: any) => {
        const requestHash = hash(request);
        return new Promise((resolve) => {
            this.db.collection(ServiceRecorder.SERVICE_RECORDS).findOne({hash: requestHash}, (error, result) => resolve(result));
        });
    }

    public hasRequest = async (request: any) => {
        const getTxn = await this.fetchServiceRecord(request);
        return getTxn !== null;
    }

}
