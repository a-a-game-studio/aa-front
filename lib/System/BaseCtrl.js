"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VuexSys_1 = require("./VuexSys");
class BaseCtrl {
    constructor() {
        this.vuexSys = new VuexSys_1.VuexSys();
        this.store = this.vuexSys.getRootStore();
    }
}
exports.BaseCtrl = BaseCtrl;
//# sourceMappingURL=BaseCtrl.js.map