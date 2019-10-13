"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuerySys_1 = require("./QuerySys");
class BaseCtrl {
    constructor(vuexSys, conf) {
        this.vuexSys = vuexSys;
        this.store = vuexSys.getRootStore();
        this.conf = conf;
        if (this.store.state.cmd) {
            this.cmd = this.store.state.cmd;
        }
        else {
            console.log('Не определен модуль cmd');
        }
        if (this.store.state.one) {
            this.one = this.store.state.one;
        }
        else {
            console.log('Не определен модуль one');
        }
        if (this.store.state.list) {
            this.list = this.store.state.list;
        }
        else {
            console.log('Не определен модуль one');
        }
        if (this.store.state.status) {
            this.status = this.store.state.status;
        }
        else {
            console.log('Не определен модуль status');
        }
        if (this.store.state.tree) {
            this.tree = this.store.state.tree;
        }
        else {
            console.log('Не определен модуль tree');
        }
        if (this.store.state.error) {
            this.error = this.store.state.error;
        }
        else {
            console.log('Не определен модуль error');
        }
        // Определяем построитель запросов
        this.querySys = new QuerySys_1.QuerySys(this);
    }
}
exports.BaseCtrl = BaseCtrl;
//# sourceMappingURL=BaseCtrl.js.map