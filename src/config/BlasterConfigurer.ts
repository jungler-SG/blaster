import * as _ from "lodash";
import * as jsyaml from "js-yaml";
import {IConfigModel, IServer} from "./ConfigModel";

export default class BlasterConfigurer {

    public static getInstance(configPath = ""): BlasterConfigurer {
        return this.instance || (this.instance = new this(configPath));
    }

    private static instance: BlasterConfigurer;

    public blasterConfig: IConfigModel;
    public serverList: IServer[];

    private constructor(configPath: string) {
        const options = jsyaml.safeLoad(configPath);
        this.blasterConfig = this.getConfigFromOptions(options.server);
        this.serverList = this.getServerListFromTargets(options.targets);
    }

    public getTargetServerConfigByUri(uri: string): IServer {
        uri = uri || "";
        const targetServer = _.findLast(this.serverList, (server: IServer) => {
            return uri.indexOf(server.endpoint) !== -1;
        });
        return targetServer || {} as IServer;
    }

    private getConfigFromOptions(server: any): IConfigModel {
        return server;
    }

    private getServerListFromTargets(targets: any): IServer[] {
        return targets;
    }
}
