"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
/** Система запросов к серверу */
class QuerySys {
    constructor(ctrl) {
        this.cbSuccess = function (response) {
            let self = this;
            let aData = response.data;
            console.log('===>Success.aData', aData);
            let vRequest = null;
            let vServData = null;
            let aMutation = {};
            vRequest = this.request;
            for (let kKey in vRequest.cmd) {
                let vAlias = vRequest.cmd[kKey];
                if (!aMutation.cmd) {
                    aMutation.cmd = {};
                }
                aMutation.cmd[vAlias] = aData[kKey];
            }
            ;
            for (let kKey in vRequest.one) {
                let vAlias = vRequest.one[kKey];
                if (!aMutation.one) {
                    aMutation.one = {};
                }
                aMutation.one[vAlias] = aData[kKey];
            }
            ;
            for (let kKey in vRequest.list) {
                let vAlias = vRequest.list[kKey];
                if (!aMutation.list) {
                    aMutation.list = {};
                }
                aMutation.list[vAlias] = aData[kKey];
            }
            ;
            for (let kKey in vRequest.list) {
                let vAlias = vRequest.list[kKey];
                if (!aMutation.tree) {
                    aMutation.tree = {};
                }
                aMutation.tree[vAlias] = aData[kKey];
            }
            ;
            for (let kKey in vRequest.status) {
                let vAlias = vRequest.status[kKey];
                if (!aMutation.status) {
                    aMutation.status = {};
                }
                if (this.ctrl.store.state.status[vAlias] != aData[kKey]) {
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
        };
        this.cbError = function (errors) {
            this.ctrl.store.commit('server_error', errors);
        };
        /**
         * Инициализация запроса
         */
        this.fInit = function () {
            this.request = {
                cmd: {},
                one: {},
                list: {},
                status: {},
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
        this.fOne = function (key, alias) {
            this.request.one[key] = alias;
        };
        /**
         * Получить список моделей данных
         */
        this.fList = function (key, alias) {
            this.request.list[key] = alias;
        };
        /**
         * Получить команду
         */
        this.fCmd = function (key, alias) {
            this.request.cmd[key] = alias;
        };
        /**
         * Получить статус
         */
        this.fStatus = function (key, alias) {
            this.request.status[key] = alias;
        };
        this.request = {}; // Запрос
        this.ctrl = ctrl;
    }
    fSend(sUrl, data) {
        if (!sUrl) {
            alert('URL - не определен');
            return false;
        }
        console.log('===>token:', this.token);
        const vAxios = axios_1.default.create({
            baseURL: this.ctrl.conf.common.apiURL,
            timeout: 20000,
            headers: {
                'token': this.token
            }
        });
        console.log('==>URL:', this.ctrl.conf.common.apiURL, sUrl);
        console.log('==>Send data:', data);
        let promiseAxios = vAxios.post(sUrl, data).then((respAxios) => {
            let resp = respAxios.data;
            if (resp.ok) {
                this.cbSuccess(resp.data);
            }
            else {
                this.cbError(resp.errors);
            }
        }).catch(() => {
            let errors = {
                'server_no_response': 'Сервер недоступен'
            };
            this.cbError(errors);
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
        console.log('===>token:', this.token);
        const vAxios = axios_1.default.create({
            baseURL: this.ctrl.conf.common.apiURL,
            timeout: 20000,
            headers: {
                'token': this.token
            }
        });
        console.log('==>URL:', this.ctrl.conf.common.apiURL, sUrl);
        console.log('==>Send data:', data);
        try {
            let respAxios = await vAxios.post(sUrl, data);
            let resp = respAxios.data;
            if (resp.ok) {
                this.cbSuccess(resp.data);
            }
            else {
                this.cbError(resp.errors);
            }
        }
        catch (e) {
            console.log();
            let errors = {
                'server_no_response': 'Сервер недоступен'
            };
            this.cbError(errors);
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