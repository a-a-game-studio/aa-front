"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var conf = tslib_1.__importStar(require("./config/MainConfig"));
exports.conf = conf;
// ======================
/**
 * URL API для страницы
 */
var APIURL = /** @class */ (function () {
    function APIURL() {
        this.index = '/login'; // Данные получаемые по умолчанию
        this.login = '/login/login'; // Залогиниться
        this.register = '/login/register'; // Регистрация
        this.logout = '/login/logout'; // Разлогиниться
    }
    return APIURL;
}());
;
exports.api = new APIURL();
// ======================
//# sourceMappingURL=conf_login.js.map