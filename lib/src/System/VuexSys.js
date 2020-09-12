"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vuex_1 = tslib_1.__importDefault(require("vuex"));
var vue_1 = tslib_1.__importDefault(require("vue"));
vue_1.default.use(vuex_1.default);
var VuexSys = /** @class */ (function () {
    function VuexSys() {
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
    VuexSys.prototype.fServerResponse = function (response) {
        this.store.commit('server_response', response);
    };
    // =========================================
    /**
     * module: one
     * Мутация - изменить модель данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    VuexSys.prototype.fSetOne = function (key, value) {
        this.store.commit('set_one', { key: key, value: value });
    };
    /**
     * module: one
     * Мутация - изменить поле модели данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    VuexSys.prototype.fSetOneField = function (key, name, value) {
        this.store.commit('set_one_field', { key: key, name: name, value: value });
    };
    /**
     * module: one
     * Мутация - очищает по ключу модель данных
     * @param key
     */
    VuexSys.prototype.fClearOne = function (key) {
        this.store.commit('clear_one', key);
    };
    // =========================================
    /**
     * module: list
     * Мутация - изменить список моделей данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    VuexSys.prototype.fSetList = function (key, value) {
        this.store.commit('set_list', { key: key, value: value });
    };
    /**
     * module: list
     * Мутация - очищает по ключу список моделей данных
     * @param key
     */
    VuexSys.prototype.fClearList = function (key) {
        this.store.commit('clear_list', key);
    };
    // =========================================
    /**
     * module: status
     * Мутация - изменить состояние страницы
     * @param key - ключ модуля
     * @param value - значение
     */
    VuexSys.prototype.fSetStatus = function (key, value) {
        this.store.commit('set_status', { key: key, value: value });
    };
    /**
     * module: status
     * Мутация - очищает по ключу status
     * @param key
     */
    VuexSys.prototype.fClearStatus = function (key) {
        this.store.commit('clear_status', key);
    };
    // =========================================
    /**
     * module: tree
     * Мутация - очищает по ключу дерево объектов
     * @param key
     */
    VuexSys.prototype.fClearTree = function (key) {
        this.store.commit('clear_tree', key);
    };
    /**
     * module: error
     * Мутация - очищает по ключу ошибку
     * @param key
     */
    VuexSys.prototype.fClearError = function (key) {
        this.store.commit('clear_error', key);
    };
    // ============================================
    /**
     * Регистрация модуля состояния команд
     * @param state
     */
    VuexSys.prototype.registerModuleCmd = function (state) {
        this.store.registerModule('cmd', {
            state: state,
            mutations: {
                server_response: function (state, response) {
                    if (response.cmd) {
                        for (var k in response.cmd) {
                            var v = response.cmd[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
            }
        });
        return this;
    };
    /**
     * Регистрация модуля состояния модели
     * @param state
     */
    VuexSys.prototype.registerModuleOne = function (state) {
        this.store.registerModule('one', {
            state: state,
            mutations: {
                server_response: function (state, response) {
                    console.log('server_response:one', response);
                    if (response.one) {
                        for (var k in response.one) {
                            var v = response.one[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                set_one_field: function (state, field) {
                    if (state[field.key]) {
                        state[field.key][field.name] = field.value;
                    }
                },
                set_one: function (state, one) {
                    state[one.key] = one.value;
                },
                clear_one: function (state, key) {
                    if (state[key]) {
                        state[key] = null;
                    }
                }
            },
        });
        return this;
    };
    /**
     * Регистрация модуля состояния списка модели
     * @param state
     */
    VuexSys.prototype.registerModuleList = function (state) {
        this.store.registerModule('list', {
            state: state,
            mutations: {
                server_response: function (state, response) {
                    console.log('server_response:list', response);
                    if (response.list) {
                        for (var k in response.list) {
                            var v = response.list[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                set_list: function (state, list) {
                    if (state[list.key]) {
                        state[list.key] = list.value;
                    }
                },
                clear_list: function (state, key) {
                    if (state[key]) {
                        state[key] = null;
                    }
                }
            },
        });
        return this;
    };
    /**
     * Регистрация модуля состояния деревьев
     * @param state
     */
    VuexSys.prototype.registerModuleTree = function (state) {
        this.store.registerModule('tree', {
            state: state,
            mutations: {
                server_response: function (state, response) {
                    console.log('server_response:tree', response);
                    if (response.tree) {
                        for (var k in response.tree) {
                            var v = response.tree[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                clear_tree: function (state, key) {
                    if (state[key]) {
                        state[key] = null;
                    }
                }
            },
        });
        return this;
    };
    /**
     * Регистрация модуля состояния списка ошибок
     * @param state
     */
    VuexSys.prototype.registerModuleError = function (state) {
        this.store.registerModule('error', {
            state: state,
            mutations: {
                server_error: function (state, errors) {
                    console.log('server_response:error', errors);
                    if (errors) {
                        for (var k in errors) {
                            var v = errors[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                clear_error: function (state, key) {
                    if (state[key]) {
                        state[key] = null;
                    }
                }
            },
        });
        return this;
    };
    /**
     * Регистрация модуля состояния статуса приложения
     * @param state
     */
    VuexSys.prototype.registerModuleStatus = function (state) {
        this.store.registerModule('status', {
            state: state,
            mutations: {
                server_response: function (state, response) {
                    console.log('server_response:status', response);
                    if (response.status) {
                        for (var k in response.status) {
                            var v = response.status[k];
                            state[k] = v;
                        }
                        ;
                    }
                },
                set_status: function (state, field) {
                    state[field.key] = field.value;
                },
                clear_status: function (state, key) {
                    if (state[key]) {
                        state[key] = 0;
                    }
                }
            },
        });
        return this;
    };
    /**
     * Получить корневой объект состояния
     */
    VuexSys.prototype.getRootStore = function () {
        return this.store;
    };
    /**
     * Получить объект состояния команд
     */
    VuexSys.prototype.getCmdStore = function () {
        return this.store.state.cmd;
    };
    /**
     * Получить объект состояния модели
     */
    VuexSys.prototype.getOneStore = function () {
        return this.store.state.one;
    };
    /**
     * Получить объект состояния списков моделей
     */
    VuexSys.prototype.getListStore = function () {
        return this.store.state.list;
    };
    /**
     * Получить объект состояния деревьев
     */
    VuexSys.prototype.getTreeStore = function () {
        return this.store.state.tree;
    };
    /**
     * Получить объект состояния приложения
     */
    VuexSys.prototype.getStatusStore = function () {
        return this.store.state.status;
    };
    /**
     * Получить объект состояния серверных ошибок
     */
    VuexSys.prototype.getErrorStore = function () {
        return this.store.state.error;
    };
    return VuexSys;
}());
exports.VuexSys = VuexSys;
//# sourceMappingURL=VuexSys.js.map