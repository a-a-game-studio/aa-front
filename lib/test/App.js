"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vue_property_decorator_1 = require("vue-property-decorator");
var frm_login_vue_1 = tslib_1.__importDefault(require("./el/frm_login/frm_login.vue"));
vue_property_decorator_1.Vue.component('frm-login', frm_login_vue_1.default);
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App = tslib_1.__decorate([
        vue_property_decorator_1.Component({})
    ], App);
    return App;
}(vue_property_decorator_1.Vue));
exports.default = App;
//# sourceMappingURL=App.js.map