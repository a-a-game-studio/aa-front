"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
/** Система запросов к серверу */
var QuerySys = /** @class */ (function () {
    function QuerySys(ctrl) {
        this.req = {}; // Запрос
        this.ctrl = ctrl;
    }
    QuerySys.prototype.cbSuccess = function (req, aData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var vServData, aMutation, kKey, vAlias, kKey, vAlias, kKey, vAlias, kKey, vAlias, kKey, vAlias;
            return tslib_1.__generator(this, function (_a) {
                vServData = null;
                aMutation = {};
                for (kKey in req.cmd) {
                    vAlias = req.cmd[kKey];
                    if (!aMutation.cmd) {
                        aMutation.cmd = {};
                    }
                    aMutation.cmd[vAlias] = aData[kKey];
                }
                ;
                for (kKey in req.one) {
                    vAlias = req.one[kKey];
                    if (!aMutation.one) {
                        aMutation.one = {};
                    }
                    aMutation.one[vAlias] = aData[kKey];
                }
                ;
                for (kKey in req.list) {
                    vAlias = req.list[kKey];
                    if (!aMutation.list) {
                        aMutation.list = {};
                    }
                    aMutation.list[vAlias] = aData[kKey];
                }
                ;
                for (kKey in req.list) {
                    vAlias = req.list[kKey];
                    if (!aMutation.tree) {
                        aMutation.tree = {};
                    }
                    aMutation.tree[vAlias] = aData[kKey];
                }
                ;
                for (kKey in req.status) {
                    vAlias = req.status[kKey];
                    if (!aMutation.status) {
                        aMutation.status = {};
                    }
                    if (this.ctrl.status[vAlias] != aData[kKey]) {
                        console.log('update state - ', kKey, vAlias);
                        aMutation.status[vAlias] = aData[kKey];
                    }
                }
                ;
                // Если прислан токен нужно его обновить в localstorage
                if (aData['token']) {
                    this.token = localStorage['token'] = aData['token'];
                }
                // console.log('===>aMutation:',aMutation);
                this.ctrl.vuexSys.fServerResponse(aMutation);
                // Если функция обратного вызова указана
                if (req.cbAction) {
                    req.cbAction(true, aData);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Ответ с ошибкой
     */
    QuerySys.prototype.cbError = function (req, errors) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.error('==>cbError:', errors);
                this.ctrl.store.commit('server_error', errors);
                // Если функция обратного вызова указана
                if (req.cbAction) {
                    req.cbAction(false, errors);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Функция обратного вызова после выполнения запроса
     * function(ok:boolean, data:any)
     */
    QuerySys.prototype.fAction = function (cbAction) {
        this.req.cbAction = cbAction;
    };
    /**
     * Инициализация запроса
     */
    QuerySys.prototype.fConfig = function (conf) {
        this.conf = conf;
    };
    /**
     * Инициализация запроса
     */
    QuerySys.prototype.fInit = function () {
        this.req = {
            cmd: {},
            one: {},
            list: {},
            status: {},
            cbAction: null,
        };
        if (localStorage['token']) {
            this.token = localStorage['token'];
        }
        else {
            this.token = null;
        }
        console.log('===>token:', this.token);
        return this;
    };
    /**
     * Получить модель данных
     */
    QuerySys.prototype.fOne = function (key, alias) {
        this.req.one[key] = alias;
    };
    /**
     * Получить список моделей данных
     */
    QuerySys.prototype.fList = function (key, alias) {
        this.req.list[key] = alias;
    };
    /**
     * Получить команду
     */
    QuerySys.prototype.fCmd = function (key, alias) {
        this.req.cmd[key] = alias;
    };
    ;
    /**
     * Получить статус
     */
    QuerySys.prototype.fStatus = function (key, alias) {
        this.req.status[key] = alias;
    };
    ;
    QuerySys.prototype.fSend = function (sUrl, data) {
        var _this = this;
        if (!sUrl) {
            console.error('==ERROR>', 'URL запроса не определен!');
            return false;
        }
        // Создаем локальную копию req для возможности множественных асинхронных запросов
        var reqQuery = this.req;
        // Создаем соединение
        var vAxios = this.fCreateConnection();
        if (this.conf) {
            console.log('===URL>:', this.conf.baseURL, ' - ', sUrl);
        }
        var promiseAxios = vAxios.post(sUrl, data).then(function (respAxios) {
            var resp = respAxios.data;
            if (resp.ok) {
                _this.cbSuccess(reqQuery, resp.data);
            }
            else {
                _this.cbError(reqQuery, resp.errors);
            }
        }).catch(function () {
            var errors = {
                'server_no_response': 'Сервер недоступен'
            };
            _this.cbError(reqQuery, errors);
        });
        return promiseAxios;
    };
    ;
    QuerySys.prototype.faSend = function (sUrl, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var reqQuery, vAxios, respAxios, resp, e_1, errors;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sUrl) {
                            console.error('==ERROR>', 'URL запроса не определен!');
                            return [2 /*return*/, false];
                        }
                        reqQuery = this.req;
                        vAxios = this.fCreateConnection();
                        if (this.conf) {
                            console.log('===URL>:', this.conf.baseURL, ' - ', sUrl);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, vAxios.post(sUrl, data)];
                    case 2:
                        respAxios = _a.sent();
                        resp = respAxios.data;
                        if (!resp.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cbSuccess(reqQuery, resp.data)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.cbError(reqQuery, resp.errors)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        errors = {
                            'server_no_response': 'Сервер недоступен'
                        };
                        this.cbError(reqQuery, errors);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ;
    /**
     * Создать соединение
     */
    QuerySys.prototype.fCreateConnection = function () {
        var vAxios = null;
        if (this.conf) {
            vAxios = axios_1.default.create(this.conf);
        }
        else {
            console.warn('==WARNING>', 'Отсутствует конфигурация соединения!');
            vAxios = axios_1.default.create({
                timeout: 30000,
            });
        }
        return vAxios;
    };
    return QuerySys;
}());
exports.QuerySys = QuerySys;
;
//# sourceMappingURL=QuerySys.js.map