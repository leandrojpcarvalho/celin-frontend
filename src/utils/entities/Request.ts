import Utils from "..";
import { RequestApi } from "../types";

export default class RequestMaker {
    public static requestApi({ endPoints, method, data, headerArray, id, query }: RequestApi): Request {
        const headers = this.myHeader(headerArray);
        return new Request(Utils.internalApiAcess(endPoints, id, query), {
            method: method ? method : 'GET',
            headers,
            body: data? JSON.stringify(data): undefined,
        });
    }

    private static myHeader(data?: [string[]]): Headers {
        const myHeader = new Headers;
        if (data) {
            for (const [key, value] of data) {
                myHeader.append(key, value);
            }
            return myHeader;
        }
        myHeader.append("Content-Type", "application/json")
        return myHeader;
    }
}