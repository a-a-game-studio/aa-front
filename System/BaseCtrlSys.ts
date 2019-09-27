
import { Store }  from 'vuex';
import { VuexSys, RootStateI } from './VuexSys'

export class BaseCtrlSys{
    protected vuexSys:VuexSys;
    public store:Store<RootStateI>;
    public conf:any;

    constructor(){
        this.vuexSys = new VuexSys();
        this.store = this.vuexSys.getRootStore();
    }


}