"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const conf = tslib_1.__importStar(require("./config/MainConfig"));
exports.conf = conf;
// ======================
/**
 * URL API для страницы
 */
class APIURL {
    constructor() {
        this.index = '/login'; // Данные получаемые по умолчанию
        this.login = '/login/login'; // Залогиниться
        this.register = '/login/register'; // Регистрация
        this.logout = '/login/logout'; // Разлогиниться
    }
}
;
exports.api = new APIURL();
// ======================
//# sourceMappingURL=conf_login.js.map