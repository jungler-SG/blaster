import * as Koa from "koa";
import HttpClient from "./middleware/http-client/HttpClient";
import Record from "./middleware/record/Record";
import Replay from "./middleware/replay/Replay";

export default class BlasterServer {

    public async start() {
        const app = await this.createApp();
        let server;
        server = app.listen(2333);
        console.log("Blaster started on port 2333...");
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
