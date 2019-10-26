import { BaseCtrl } from "./BaseCtrl";
/** Система запросов к серверу */
export declare class QuerySys {
    private request;
    private ctrl;
    private token;
    private cbAction;
    constructor(ctrl: BaseCtrl);
    cbSuccess(aData: any): void;
    /**
     * Ответ с ошибкой
     */
    cbError: (errors: any) => void;
    /**
     * Функция обратного вызова после выполнения запроса
     * function(ok:boolean, data:any)
     */
    fAction(cbAction: Function): void;
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
