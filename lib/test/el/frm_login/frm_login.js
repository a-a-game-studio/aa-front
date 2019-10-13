"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vue_1 = tslib_1.__importDefault(require("vue"));
const vue_class_component_1 = tslib_1.__importDefault(require("vue-class-component"));
const ctrl_login_1 = require("../../ctrl_login");
let frm_login = class frm_login extends vue_1.default {
    constructor() {
        super(...arguments);
        this.sLogin = null;
        this.sPswd = null;
    }
    created() {
        ctrl_login_1.ctrl.fInit();
    }
    /** Логин */
    fLogin() {
        var login_data = {
            login: this.sLogin,
            pswd: this.sPswd,
        };
        ctrl_login_1.ctrl.fLogin(login_data);
        console.log(login_data);
    }
    /** Выход пользователя */
    fLogout() {
        ctrl_login_1.ctrl.fLogout();
        console.log('logout');
    }
    /** Ввод логина */
    fInputLogin(e) {
        this.sLogin = e.target.value;
    }
    /** Ввод пароля */
    fInputPswd(e) {
        this.sPswd = e.target.value;
    }
    get status() { return ctrl_login_1.ctrl.status; }
    get one() { return ctrl_login_1.ctrl.one; }
    get list() { return ctrl_login_1.ctrl.list; }
};
frm_login = tslib_1.__decorate([
    vue_class_component_1.default
], frm_login);
exports.default = frm_login;
;
//# sourceMappingURL=frm_login.js.map