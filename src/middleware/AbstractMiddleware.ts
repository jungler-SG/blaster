export default abstract class AbstractMiddleware {

    public apply() {
        return async (ctx, next) => {
            next();
        };
    }

}
