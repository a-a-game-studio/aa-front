"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VuexSys_1 = require("../src/System/VuexSys");
exports.vuexSys = new VuexSys_1.VuexSys();
exports.store = exports.vuexSys.getRootStore();
exports.vuexSys.registerModuleCmd({
    login: false,
});
exports.vuexSys.registerModuleOne({
    user: null,
});
exports.vuexSys.registerModuleList({});
exports.vuexSys.registerModuleStatus({
    user_id: 0,
    token: null,
});
//# sourceMappingURL=vuex_login.js.map