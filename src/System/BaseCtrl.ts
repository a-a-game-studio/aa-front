
import { Store }  from 'vuex';
import { VuexSys, RootStateI } from './VuexSys'
import { QuerySys } from './QuerySys';
import { ConfI } from '../Config/mainConfigI'

export class BaseCtrl{
    protected vuexSys:VuexSys;
    public store:Store<RootStateI>;
    public cmd:Store<any>;
    public one:Store<any>;
    public list:Store<any>;
    public tree:Store<any>;
    public error:Store<any>;

    public conf:ConfI;
    public querySys:QuerySys;


    constructor(){
        this.vuexSys = new VuexSys();
        this.store = this.vuexSys.getRootStore();
    }


}