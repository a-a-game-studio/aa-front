"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var aaFront = tslib_1.__importStar(require("../src"));
var conf_login_1 = require("./conf_login");
var vuex_login_1 = require("./vuex_login");
var Ctrl = /** @class */ (function (_super) {
    tslib_1.__extends(Ctrl, _super);
    function Ctrl(store) {
        return _super.call(this, store) || this;
    }
    Ctrl.prototype.fInit = function () {
        this.querySys.fInit();
        this.querySys.fOne('one_user_info', 'user');
        this.querySys.fStatus('user_id', 'user_id');
        this.querySys.fSend(conf_login_1.api.index, null);
    };
    ;
    //=========================================
    /** Авторизоваться */
    Ctrl.prototype.fLogin = function (data) {
        this.querySys.fInit();
        this.querySys.fCmd('cmd_login', 'login');
        this.querySys.fOne('one_user', 'user');
        this.querySys.fStatus('token', 'token');
        this.querySys.fSend(conf_login_1.api.login, data);
    };
    ;
    //=========================================
    /** Выход */
    Ctrl.prototype.fLogout = function () {
        this.querySys.fInit();
        this.querySys.fCmd('cmd_logout', 'logout');
        this.querySys.fSend(conf_login_1.api.logout, null);
        this.vuexSys.fClearStatus('token');
        this.vuexSys.fClearStatus('user_id');
        this.vuexSys.fClearOne('user');
        localStorage['token'] = null;
    };
    ;
    return Ctrl;
}(aaFront.BaseCtrl));
exports.ctrl = new Ctrl(vuex_login_1.vuexSys);
//# sourceMappingURL=ctrl_login.js.map