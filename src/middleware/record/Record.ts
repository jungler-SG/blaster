import AbstractMiddleware from "../AbstractMiddleware";

export default class Record extends AbstractMiddleware {
    public apply() {
        return async (ctx, next) => {
            next();
        };
    }
}
