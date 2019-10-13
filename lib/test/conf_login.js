"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainConfig_1 = require("../src/Config/mainConfig");
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
const apiurl = new APIURL();
// ======================
mainConfig_1.conf.api = apiurl;
exports.pageConf = mainConfig_1.conf;
//# sourceMappingURL=conf_login.js.map