import "mocha";
import { expect, assert } from "chai";
import ServiceRecorder from "../ServiceRecorder";

describe("ServiceRecorder Tests", () => {

    const mockTransaction = {
        request: {
            method: "GET",
            url: "https://dpb-apac-uat.credit-suisse.com/onecms/en/copyright.json",
            queryParam: {rand: "1505809975938"},
            header: {
                "Host": "dpb-apac-uat.credit-suisse.com",
                "Connection": "keep-alive",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                "transaction_id": "100",
                "RM_TXN_ID": "87e43687-7f70-4e4c-9ede-bd6190278590-1505809973035",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                "Accept": "*/*",
                "X-Requested-With": "XMLHttpRequest",
                "withCredentials": true,
                "X-request-ID": "87e43687-7f70-4e4c-9ede-bd6190278590-1505809973035@@15058099759380.6415208419212035",
                "Referer": "https://dpb-apac-uat.credit-suisse.com/rwd/",
                "Accept-Encoding": "gzip, deflate, sdch, br",
                "Accept-Language": "en-US,en;q=0.8",
                "Cookie": "WT_FPC=id=2c6f41d057ca784d94c1445365282667:lv=1447198435812:ss=1447198113394; SMSESSION=LOGGEDOFF; Navajo="
            }
        },
        response: {
            status: "200",
            header: {
                "Accept-Ranges": "bytes",
                "Connection": "close",
                "Content-Length": "192",
                "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' ; style-src 'self' 'unsafe-inline'",
                "Content-Type": "application/json",
                "Date": "Tue, 19 Sep 2017 08:31:31 GMT",
                "Last-Modified": "Wed, 07 Jun 2017 10:49:06 GMT",
                "Server": "Apache",
                "Set-Cookie": "Navajo=sqDW8uMS5XIMRoc8HqJ7osd7WGBG+wzHeckXm9DCuNKR6yeT7EJEA0jFyJkYLpj5n9LpBV1MatU-; Path=/; Secure; Version=1; HttpOnly",
                "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
                "X-Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' ; style-src 'self' 'unsafe-inline'",
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "SAMEORIGIN",
                "X-XSS-Protection": "1; mode=block"
            },
            body: {
                COPYRIGHT: {
                    title: "Copyright",
                    description: "<p>Copyright &copy; 1997 - 2017 CREDIT SUISSE GROUP AG and/or its affiliates. All rights reserved.&nbsp;<\/p>"
                }
            }
        }
    };

    before((done) => {
        ServiceRecorder.getInstanceWithPath(__dirname + "/tingo");
        done();
    });

    beforeEach((done) => {
        ServiceRecorder.getInstance().clearCollection("GET", () => {
            ServiceRecorder.getInstance().clearCollection("POST", done);
        });

    });

    it("should store a new api response", (done) => {
        const tingoDb = ServiceRecorder.getInstance();
        console.log(JSON.stringify(mockTransaction));
        tingoDb.storeGet(mockTransaction, (error: any, result: any) => {
            assert(!error);
            assert(mockTransaction.request.header === result[0].request.header);
            assert(mockTransaction.request.url === result[0].request.url);
            assert(mockTransaction.request.queryParam === result[0].request.queryParam);
            assert(mockTransaction.request.method === result[0].request.method);

            assert(mockTransaction.response.status === result[0].response.status);
            assert(mockTransaction.response.header === result[0].response.header);
            assert(mockTransaction.response.body === result[0].response.body);
            console.log("result: ", JSON.stringify(result));
            done();
        });

    });
});
