"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
/** Система запросов к серверу */
class QuerySys {
    constructor(ctrl) {
        this.cbSuccess = function (response) {
            let self = this;
            let aData = response.data;
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
        };
        this.cbError = function (errors) {
            this.ctrl.store.commit('server_error', errors);
        };
        /**
         * Инициализация запроса
         */
        this.fInit = function () {
            this.data.request = {
                cmd: {},
                one: {},
                list: {},
                status: {},
            };
            this.data.ok = true;
            if (localStorage['token']) {
                this.token = localStorage['token'];
            }
            else {
                this.token = null;
            }
            return this;
        };
        this.fOne = function (key, alias) {
            this.request.one[key] = alias;
        };
        this.fList = function (key, alias) {
            this.request.list[key] = alias;
        };
        this.fCmd = function (key, alias) {
            this.data.request.cmd[key] = alias;
        };
        this.request = {}; // Запрос
        this.ctrl = ctrl;
    }
    async fSend(sUrl, data) {
        if (!sUrl) {
            alert('URL - не определен');
            return false;
        }
        const vAxios = axios_1.default.create({
            baseURL: this.ctrl.conf.common.baseURL,
            timeout: 20000,
            headers: {
                'apikey': '9d50ed61df5951973b9e274f043b4ed7'
            }
        });
        try {
            let resp = await vAxios.post(sUrl, data);
            if (resp.ok) {
                this.cbSuccess(resp.data);
            }
            else {
                this.cbError(resp.errors);
            }
        }
        catch (e) {
            let errors = {
                'server_no_response': 'Сервер недоступен'
            };
            this.cbError(errors);
            // if( aData.access.redirect ){
            //     window.location.replace(this.ctrl.conf.redirect.login);
            // }
        }
        ;
    }
    ;
}
exports.QuerySys = QuerySys;
;
//# sourceMappingURL=QuerySys.js.map