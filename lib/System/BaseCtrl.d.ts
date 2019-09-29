import { Store } from 'vuex';
import { RootStateI } from './VuexSys';
import { QuerySys } from './QuerySys';
import { ConfI } from '../Config/mainConfigI';
export declare class BaseCtrl {
    store: Store<RootStateI>;
    cmd: Store<any>;
    one: Store<any>;
    list: Store<any>;
    status: Store<any>;
    tree: Store<any>;
    error: Store<any>;
    querySys: QuerySys;
    conf: ConfI;
    constructor(store: Store<RootStateI>, conf: ConfI);
}
