"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuerySys_1 = require("./QuerySys");
class BaseCtrl {
    constructor(vuexSys) {
        this.vuexSys = vuexSys;
        this.store = vuexSys.getRootStore();
        if (this.store.state.cmd) {
            this.cmd = this.store.state.cmd;
        }
        else {
            console.error('Не определен модуль cmd');
        }
        if (this.store.state.one) {
            this.one = this.store.state.one;
        }
        else {
            console.error('Не определен модуль one');
        }
        if (this.store.state.list) {
            this.list = this.store.state.list;
        }
        else {
            console.error('Не определен модуль one');
        }
        if (this.store.state.status) {
            this.status = this.store.state.status;
        }
        else {
            console.error('Не определен модуль status');
        }
        if (this.store.state.tree) {
            this.tree = this.store.state.tree;
        }
        else {
            console.error('Не определен модуль tree');
        }
        if (this.store.state.error) {
            this.error = this.store.state.error;
        }
        else {
            console.error('Не определен модуль error');
        }
        // Определяем построитель запросов
        this.querySys = new QuerySys_1.QuerySys(this);
    }
}
exports.BaseCtrl = BaseCtrl;
//# sourceMappingURL=BaseCtrl.js.map