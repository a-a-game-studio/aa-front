"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vue_property_decorator_1 = require("vue-property-decorator");
const frm_login_vue_1 = tslib_1.__importDefault(require("./el/frm_login/frm_login.vue"));
vue_property_decorator_1.Vue.component('frm-login', frm_login_vue_1.default);
let App = class App extends vue_property_decorator_1.Vue {
};
App = tslib_1.__decorate([
    vue_property_decorator_1.Component({})
], App);
exports.default = App;
//# sourceMappingURL=App.js.map