"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vuex_1 = tslib_1.__importDefault(require("vuex"));
const vue_1 = tslib_1.__importDefault(require("vue"));
vue_1.default.use(vuex_1.default);
class VuexSys {
    constructor() {
        this.store = new vuex_1.default.Store({
            mutations: {}
        });
    }
    // ============================================
    /**
     * module: all
     * Мутация ответа сервера
     * @param response
     */
    fServerResponse(response) {
        this.store.commit('server_response', response);
    }
    // =========================================
    /**
     * module: one
     * Мутация - изменить модель данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    fSetOne(key, value) {
        this.store.commit('set_one', { key, value });
    }
    /**
     * module: one
     * Мутация - изменить поле модели данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    fSetOneField(key, name, value) {
        this.store.commit('set_one_field', { key, name, value });
    }
    /**
     * module: one
     * Мутация - очищает по ключу модель данных
     * @param key
     */
    fClearOne(key) {
        this.store.commit('clear_one', key);
    }
    // =========================================
    /**
     * module: list
     * Мутация - изменить список моделей данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    fSetList(key, value) {
        this.store.commit('set_list', { key, value });
    }
    /**
     * module: list
     * Мутация - очищает по ключу список моделей данных
     * @param key
     */
    fClearList(key) {
        this.store.commit('clear_list', key);
    }
    // =========================================
    /**
     * module: status
     * Мутация - изменить состояние страницы
     * @param key - ключ модуля
     * @param value - значение
     */
    fSetStatus(key, value) {
        this.store.commit('set_one_field', { key, value });
    }
    /**
     * module: status
     * Мутация - очищает по ключу status
     * @param key
     */
    fClearStatus(key) {
        this.store.commit('clear_status', key);
    }
    // =========================================
    /**
     * module: tree
     * Мутация - очищает по ключу дерево объектов
     * @param key
     */
    fClearTree(key) {
        this.store.commit('clear_tree', key);
    }
    /**
     * module: error
     * Мутация - очищает по ключу ошибку
     * @param key
     */
    fClearError(key) {
        this.store.commit('clear_error', key);
    }
    // ============================================
    /**
     * Регистрация модуля состояния команд
     * @param state
     */
    registerModuleCmd(state) {
        this.store.registerModule('cmd', {
            state: state,
            mutations: {
                server_response(state, response) {
                    if (response.cmd) {
                        for (let k in response.cmd) {
                            let v = response.cmd[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
            }
        });
        return this;
    }
    /**
     * Регистрация модуля состояния модели
     * @param state
     */
    registerModuleOne(state) {
        this.store.registerModule('one', {
            state: state,
            mutations: {
                server_response(state, response) {
                    console.log('server_response:one', response);
                    if (response.one) {
                        for (let k in response.one) {
                            let v = response.one[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                set_one_field(state, field) {
                    if (state[field.key]) {
                        state[field.key][field.name] = field.value;
                    }
                },
                set_one(state, one) {
                    if (state[one.key]) {
                        state[one.key] = one.value;
                    }
                },
                clear_one(state, key) {
                    if (state[key]) {
                        state[key] = null;
                    }
                }
            },
        });
        return this;
    }
    /**
     * Регистрация модуля состояния списка модели
     * @param state
     */
    registerModuleList(state) {
        this.store.registerModule('list', {
            state: state,
            mutations: {
                server_response(state, response) {
                    console.log('server_response:list', response);
                    if (response.list) {
                        for (let k in response.list) {
                            let v = response.list[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                set_list(state, list) {
                    if (state[list.key]) {
                        state[list.key] = list.value;
                    }
                },
                clear_list(state, key) {
                    if (state[key]) {
                        state[key] = null;
                    }
                }
            },
        });
        return this;
    }
    /**
     * Регистрация модуля состояния деревьев
     * @param state
     */
    registerModuleTree(state) {
        this.store.registerModule('tree', {
            state: state,
            mutations: {
                server_response(state, response) {
                    console.log('server_response:tree', response);
                    if (response.tree) {
                        for (let k in response.tree) {
                            let v = response.tree[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                clear_tree(state, key) {
                    if (state[key]) {
                        state[key] = null;
                    }
                }
            },
        });
        return this;
    }
    /**
     * Регистрация модуля состояния списка ошибок
     * @param state
     */
    registerModuleError(state) {
        this.store.registerModule('error', {
            state: state,
            mutations: {
                server_error(state, errors) {
                    console.log('server_response:error', errors);
                    if (errors) {
                        for (let k in errors) {
                            let v = errors[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                clear_error(state, key) {
                    if (state[key]) {
                        state[key] = null;
                    }
                }
            },
        });
        return this;
    }
    /**
     * Регистрация модуля состояния статуса приложения
     * @param state
     */
    registerModuleStatus(state) {
        this.store.registerModule('status', {
            state: state,
            mutations: {
                server_response(state, response) {
                    console.log('server_response:status', response);
                    if (response.status) {
                        for (let k in response.status) {
                            let v = response.status[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                set_status(state, field) {
                    state[field.key] = field.value;
                },
                clear_status(state, key) {
                    if (state[key]) {
                        state[key] = 0;
                    }
                }
            },
        });
        return this;
    }
    /**
     * Получить корневой объект состояния
     */
    getRootStore() {
        return this.store;
    }
    /**
     * Получить объект состояния команд
     */
    getCmdStore() {
        return this.store.state.cmd;
    }
    /**
     * Получить объект состояния модели
     */
    getOneStore() {
        return this.store.state.one;
    }
    /**
     * Получить объект состояния списков моделей
     */
    getListStore() {
        return this.store.state.list;
    }
    /**
     * Получить объект состояния деревьев
     */
    getTreeStore() {
        return this.store.state.tree;
    }
    /**
     * Получить объект состояния приложения
     */
    getStatusStore() {
        return this.store.state.status;
    }
    /**
     * Получить объект состояния серверных ошибок
     */
    getErrorStore() {
        return this.store.state.error;
    }
}
exports.VuexSys = VuexSys;
//# sourceMappingURL=VuexSys.js.map