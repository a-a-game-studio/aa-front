"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const aaFront = tslib_1.__importStar(require("../src"));
const conf_login_1 = require("./conf_login");
const vuex_login_1 = require("./vuex_login");
class Ctrl extends aaFront.BaseCtrl {
    constructor(store) {
        super(store, conf_login_1.conf);
    }
    fInit() {
        this.querySys.fInit();
        this.querySys.fOne('one_user_info', 'user');
        this.querySys.fStatus('user_id', 'user_id');
        this.querySys.fSend(conf_login_1.api.index, null);
    }
    ;
    //=========================================
    /** Авторизоваться */
    fLogin(data) {
        this.querySys.fInit();
        this.querySys.fCmd('cmd_login', 'login');
        this.querySys.fOne('one_user', 'user');
        this.querySys.fStatus('token', 'token');
        this.querySys.fSend(conf_login_1.api.login, data);
    }
    ;
    //=========================================
    /** Выход */
    fLogout() {
        this.querySys.fInit();
        this.querySys.fCmd('cmd_logout', 'logout');
        this.querySys.fSend(conf_login_1.api.logout, null);
        this.vuexSys.fClearStatus('token');
        this.vuexSys.fClearStatus('user_id');
        this.vuexSys.fClearOne('user');
        localStorage['token'] = null;
    }
    ;
}
exports.ctrl = new Ctrl(vuex_login_1.vuexSys);
//# sourceMappingURL=ctrl_login.js.map