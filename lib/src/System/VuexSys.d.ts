import { Store } from 'vuex';
export interface RootStateI {
    cmd: Store<any>;
    one: Store<any>;
    list: Store<any>;
    tree: Store<any>;
    status: Store<any>;
    error: Store<any>;
}
export interface ServerResponseI {
    cmd: {
        [key: string]: any;
    };
    one: {
        [key: string]: any;
    };
    list: {
        [key: string]: any[];
    };
    tree: {
        [key: string]: any;
    };
    status: {
        [key: string]: string | boolean | number;
    };
    error: {
        [key: string]: string;
    };
}
export declare class VuexSys {
    private store;
    constructor();
    /**
     * module: all
     * Мутация ответа сервера
     * @param response
     */
    fServerResponse(response: ServerResponseI): void;
    /**
     * module: one
     * Мутация - изменить модель данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    fSetOne(key: string, value: any): void;
    /**
     * module: one
     * Мутация - изменить поле модели данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    fSetOneField(key: string, name: string, value: any): void;
    /**
     * module: one
     * Мутация - очищает по ключу модель данных
     * @param key
     */
    fClearOne(key: string): void;
    /**
     * module: list
     * Мутация - изменить список моделей данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    fSetList(key: string, value: any): void;
    /**
     * module: list
     * Мутация - очищает по ключу список моделей данных
     * @param key
     */
    fClearList(key: string): void;
    /**
     * module: status
     * Мутация - изменить состояние страницы
     * @param key - ключ модуля
     * @param value - значение
     */
    fSetStatus(key: string, value: boolean | number | string): void;
    /**
     * module: status
     * Мутация - очищает по ключу status
     * @param key
     */
    fClearStatus(key: string): void;
    /**
     * module: tree
     * Мутация - очищает по ключу дерево объектов
     * @param key
     */
    fClearTree(key: string): void;
    /**
     * module: error
     * Мутация - очищает по ключу ошибку
     * @param key
     */
    fClearError(key: string): void;
    /**
     * Регистрация модуля состояния команд
     * @param state
     */
    registerModuleCmd(state: {
        [key: string]: any;
    }): this;
    /**
     * Регистрация модуля состояния модели
     * @param state
     */
    registerModuleOne(state: {
        [key: string]: any;
    }): this;
    /**
     * Регистрация модуля состояния списка модели
     * @param state
     */
    registerModuleList(state: {
        [key: string]: any;
    }): this;
    /**
     * Регистрация модуля состояния деревьев
     * @param state
     */
    registerModuleTree(state: {
        [key: string]: any;
    }): this;
    /**
     * Регистрация модуля состояния списка ошибок
     * @param state
     */
    registerModuleError(state: {
        [key: string]: any;
    }): this;
    /**
     * Регистрация модуля состояния статуса приложения
     * @param state
     */
    registerModuleStatus(state: {
        [key: string]: any;
    }): this;
    /**
     * Получить корневой объект состояния
     */
    getRootStore(): Store<RootStateI>;
    /**
     * Получить объект состояния команд
     */
    getCmdStore(): Store<any>;
    /**
     * Получить объект состояния модели
     */
    getOneStore(): Store<any>;
    /**
     * Получить объект состояния списков моделей
     */
    getListStore(): Store<any>;
    /**
     * Получить объект состояния деревьев
     */
    getTreeStore(): Store<any>;
    /**
     * Получить объект состояния приложения
     */
    getStatusStore(): Store<any>;
    /**
     * Получить объект состояния серверных ошибок
     */
    getErrorStore(): Store<any>;
}
