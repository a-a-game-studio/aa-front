"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vue_1 = tslib_1.__importDefault(require("vue"));
var vue_class_component_1 = tslib_1.__importDefault(require("vue-class-component"));
var ctrl_login_1 = require("../../ctrl_login");
var frm_login = /** @class */ (function (_super) {
    tslib_1.__extends(frm_login, _super);
    function frm_login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sLogin = null;
        _this.sPswd = null;
        return _this;
    }
    frm_login.prototype.created = function () {
        ctrl_login_1.ctrl.fInit();
    };
    /** Логин */
    frm_login.prototype.fLogin = function () {
        var login_data = {
            login: this.sLogin,
            pswd: this.sPswd,
        };
        ctrl_login_1.ctrl.fLogin(login_data);
        console.log(login_data);
    };
    /** Выход пользователя */
    frm_login.prototype.fLogout = function () {
        ctrl_login_1.ctrl.fLogout();
        console.log('logout');
    };
    /** Ввод логина */
    frm_login.prototype.fInputLogin = function (e) {
        this.sLogin = e.target.value;
    };
    /** Ввод пароля */
    frm_login.prototype.fInputPswd = function (e) {
        this.sPswd = e.target.value;
    };
    Object.defineProperty(frm_login.prototype, "status", {
        get: function () { return ctrl_login_1.ctrl.status; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(frm_login.prototype, "one", {
        get: function () { return ctrl_login_1.ctrl.one; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(frm_login.prototype, "list", {
        get: function () { return ctrl_login_1.ctrl.list; },
        enumerable: true,
        configurable: true
    });
    frm_login = tslib_1.__decorate([
        vue_class_component_1.default
    ], frm_login);
    return frm_login;
}(vue_1.default));
exports.default = frm_login;
;
//# sourceMappingURL=frm_login.js.map