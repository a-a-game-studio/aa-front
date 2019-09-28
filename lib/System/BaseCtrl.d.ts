import { Store } from 'vuex';
import { VuexSys, RootStateI } from './VuexSys';
import { QuerySys } from './QuerySys';
import { ConfI } from '../Config/mainConfigI';
export declare class BaseCtrl {
    protected vuexSys: VuexSys;
    store: Store<RootStateI>;
    cmd: Store<any>;
    one: Store<any>;
    list: Store<any>;
    tree: Store<any>;
    error: Store<any>;
    conf: ConfI;
    querySys: QuerySys;
    constructor();
}
