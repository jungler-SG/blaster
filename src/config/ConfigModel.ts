export interface IServer {
    hostName: string;
    port: number;
    endpoint: string;
    key: string;
    cert: string;
    passphrase: string;
    whiteList: string[];
}

export interface IConfigModel {
    port: number;
    proxyType: string;
    replay: boolean;
    connect: string;
}
