"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vuex_1 = require("vuex");
const vue_1 = require("vue");
vue_1.default.use(vuex_1.default);
class VuexSys {
    constructor() {
        this.store = new vuex_1.default.Store({
            mutations: {}
        });
    }
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
                    if (response.list) {
                        for (let k in response.list) {
                            let v = response.list[k];
                            state[k] = v;
                        }
                        ;
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
                    if (response.state) {
                        for (let k in response.status) {
                            let v = response.status[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                set_state(state, field) {
                    state[field.key] = field.value;
                },
                clear_state(state, key) {
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