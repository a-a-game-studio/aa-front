import { BaseCtrl } from "./BaseCtrl";
/** Система запросов к серверу */
export declare class QuerySys {
    private request;
    private ctrl;
    private token;
    constructor(ctrl: BaseCtrl);
    cbSuccess: (response: any) => void;
    cbError: (errors: any) => void;
    /**
     * Инициализация запроса
     */
    fInit: () => any;
    fOne: (key: string, alias: string) => void;
    fList: (key: string, alias: string) => void;
    fCmd: (key: string, alias: string) => void;
    fSend(sUrl: string, data: {
        [key: string]: any;
    }): Promise<boolean>;
}
