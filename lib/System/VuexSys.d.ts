import { Store } from 'vuex';
export interface RootStateI {
    cmd: Store<any>;
    one: Store<any>;
    list: Store<any>;
    tree: Store<any>;
    status: Store<any>;
    error: Store<any>;
}
export declare class VuexSys {
    private store;
    constructor();
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
        [key: string]: number | string | boolean;
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
