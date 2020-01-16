import { BaseCtrl } from "./BaseCtrl";
interface RequestI {
    cmd?: any;
    one?: any;
    list?: any;
    status?: any;
    cbAction?: Function;
}
/** Система запросов к серверу */
export declare class QuerySys {
    private req;
    private ctrl;
    private token;
    constructor(ctrl: BaseCtrl);
    cbSuccess(req: RequestI, aData: any): Promise<void>;
    /**
     * Ответ с ошибкой
     */
    cbError(req: RequestI, errors: any): Promise<void>;
    /**
     * Функция обратного вызова после выполнения запроса
     * function(ok:boolean, data:any)
     */
    fAction(cbAction: Function): void;
    /**
     * Инициализация запроса
     */
    fInit(): this;
    /**
     * Получить модель данных
     */
    fOne(key: string, alias: string): void;
    /**
     * Получить список моделей данных
     */
    fList(key: string, alias: string): void;
    /**
     * Получить команду
     */
    fCmd(key: string, alias: string): void;
    /**
     * Получить статус
     */
    fStatus(key: string, alias: string): void;
    fSend(sUrl: string, data: {
        [key: string]: any;
    }): false | Promise<void>;
    faSend(sUrl: string, data: {
        [key: string]: any;
    }): Promise<boolean>;
}
export {};
