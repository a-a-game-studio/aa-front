import { Store } from 'vuex';
import { RootStateI } from './VuexSys';
import { QuerySys } from './QuerySys';
import { ConfI } from '../Config/mainConfigI';
export declare class BaseCtrl {
    store: Store<RootStateI>;
    cmd: any;
    one: any;
    list: any;
    status: any;
    tree: any;
    error: any;
    querySys: QuerySys;
    conf: ConfI;
    constructor(store: Store<RootStateI>, conf: ConfI);
}
