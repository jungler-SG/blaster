import AbstractMiddleware from "../AbstractMiddleware";

export default class Replay extends AbstractMiddleware {
    public apply() {
        return async (ctx, next) => {
            next();
        };
    }
}
