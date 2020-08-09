"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
/** Система запросов к серверу */
class QuerySys {
    constructor(ctrl) {
        this.req = {}; // Запрос
        this.ctrl = ctrl;
    }
    async cbSuccess(req, aData) {
        console.log('===>Success.aData', aData);
        let vServData = null;
        let aMutation = {};
        for (let kKey in req.cmd) {
            let vAlias = req.cmd[kKey];
            if (!aMutation.cmd) {
                aMutation.cmd = {};
            }
            aMutation.cmd[vAlias] = aData[kKey];
        }
        ;
        for (let kKey in req.one) {
            let vAlias = req.one[kKey];
            if (!aMutation.one) {
                aMutation.one = {};
            }
            aMutation.one[vAlias] = aData[kKey];
        }
        ;
        for (let kKey in req.list) {
            let vAlias = req.list[kKey];
            if (!aMutation.list) {
                aMutation.list = {};
            }
            aMutation.list[vAlias] = aData[kKey];
        }
        ;
        for (let kKey in req.list) {
            let vAlias = req.list[kKey];
            if (!aMutation.tree) {
                aMutation.tree = {};
            }
            aMutation.tree[vAlias] = aData[kKey];
        }
        ;
        for (let kKey in req.status) {
            let vAlias = req.status[kKey];
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
        console.log('===>aMutation:', aMutation);
        this.ctrl.vuexSys.fServerResponse(aMutation);
        // Если функция обратного вызова указана
        if (req.cbAction) {
            req.cbAction(true, aData);
        }
    }
    /**
     * Ответ с ошибкой
     */
    async cbError(req, errors) {
        console.log('==>cbError:', errors);
        this.ctrl.store.commit('server_error', errors);
        // Если функция обратного вызова указана
        if (req.cbAction) {
            req.cbAction(false, errors);
        }
    }
    /**
     * Функция обратного вызова после выполнения запроса
     * function(ok:boolean, data:any)
     */
    fAction(cbAction) {
        this.req.cbAction = cbAction;
    }
    /**
     * Инициализация запроса
     */
    fInit() {
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
    }
    /**
     * Получить модель данных
     */
    fOne(key, alias) {
        this.req.one[key] = alias;
    }
    /**
     * Получить список моделей данных
     */
    fList(key, alias) {
        this.req.list[key] = alias;
    }
    /**
     * Получить команду
     */
    fCmd(key, alias) {
        this.req.cmd[key] = alias;
    }
    ;
    /**
     * Получить статус
     */
    fStatus(key, alias) {
        this.req.status[key] = alias;
    }
    ;
    fSend(sUrl, data) {
        if (!sUrl) {
            alert('URL - не определен');
            return false;
        }
        // Создаем локальную копию req для возможности множественных асинхронных запросов
        const reqQuery = this.req;
        console.log('===>token:', this.token);
        const vAxios = axios_1.default.create({
            baseURL: this.ctrl.conf.common.api,
            timeout: 20000,
            headers: {
                'token': this.token
            }
        });
        console.log('==>URL:', this.ctrl.conf.common.api, sUrl);
        console.log('==>Send data:', data);
        let promiseAxios = vAxios.post(sUrl, data).then((respAxios) => {
            console.log('===>respAxios:', respAxios);
            let resp = respAxios.data;
            if (resp.ok) {
                this.cbSuccess(reqQuery, resp.data);
            }
            else {
                this.cbError(reqQuery, resp.errors);
            }
        }).catch(() => {
            let errors = {
                'server_no_response': 'Сервер недоступен'
            };
            this.cbError(reqQuery, errors);
            // if( aData.access.redirect ){
            //     window.location.replace(this.ctrl.conf.redirect.login);
            // }
        });
        return promiseAxios;
    }
    ;
    async faSend(sUrl, data) {
        if (!sUrl) {
            alert('URL - не определен');
            return false;
        }
        const reqQuery = this.req;
        console.log('===>token:', this.token);
        const vAxios = axios_1.default.create({
            baseURL: this.ctrl.conf.common.api,
            timeout: 20000,
            headers: {
                'token': this.token
            }
        });
        console.log('==>URL:', this.ctrl.conf.common.api, sUrl);
        console.log('==>Send data:', data);
        try {
            let respAxios = await vAxios.post(sUrl, data);
            console.log('===>respAxios:', respAxios);
            let resp = respAxios.data;
            if (resp.ok) {
                await this.cbSuccess(reqQuery, resp.data);
            }
            else {
                await this.cbError(reqQuery, resp.errors);
            }
        }
        catch (e) {
            let errors = {
                'server_no_response': 'Сервер недоступен'
            };
            this.cbError(reqQuery, errors);
            // if( aData.access.redirect ){
            //     window.location.replace(this.ctrl.conf.redirect.login);
            // }
        }
    }
    ;
}
exports.QuerySys = QuerySys;
;
//# sourceMappingURL=QuerySys.js.map