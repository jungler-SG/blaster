import * as Koa from "koa";
import HttpClient from "./middleware/http-client/HttpClient";
import Record from "./middleware/record/Record";
import Replay from "./middleware/replay/Replay";

export default class BlasterServer {

    public async start() {
        const app = await this.createApp();
        console.log("Blaster started on port 3000...");
        let server;
        if (!module.parent) {
            server = app.listen(3000);
        }
        return Promise.resolve(server);
    }

    private async createApp() {
        const app = new Koa();
        app.use(new Replay().apply());
        app.use(new HttpClient().apply());
        app.use(new Record().apply());
        return Promise.resolve(app);
    }

}
