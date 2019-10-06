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
    /**
     * Получить модель данных
     */
    fOne: (key: string, alias: string) => void;
    /**
     * Получить список моделей данных
     */
    fList: (key: string, alias: string) => void;
    /**
     * Получить команду
     */
    fCmd: (key: string, alias: string) => void;
    /**
     * Получить статус
     */
    fStatus: (key: string, alias: string) => void;
    fSend(sUrl: string, data: {
        [key: string]: any;
    }): false | Promise<void>;
    faSend(sUrl: string, data: {
        [key: string]: any;
    }): Promise<boolean>;
}
