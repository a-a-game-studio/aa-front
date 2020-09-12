import { Store } from 'vuex';
import { VuexSys, RootStateI } from './VuexSys';
import { QuerySys } from './QuerySys';
export declare class BaseCtrl {
    store: Store<RootStateI>;
    cmd: any;
    one: any;
    list: any;
    status: any;
    tree: any;
    error: any;
    querySys: QuerySys;
    vuexSys: VuexSys;
    constructor(vuexSys: VuexSys);
}
