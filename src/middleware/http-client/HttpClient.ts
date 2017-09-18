import * as requestPromise from "request-promise";
import AbstractMiddleware from "../AbstractMiddleware";

export default class HttpClient extends AbstractMiddleware {
    public apply() {
        return async (ctx, next) => {
            const response = await requestPromise("http://www.google.com");
            console.log(response);
            next();
        };
    }
}
