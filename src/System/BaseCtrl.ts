
import { Store }  from 'vuex';
import { VuexSys, RootStateI } from './VuexSys'
import { QuerySys } from './QuerySys';

export class BaseCtrl{
    // Store
    public store:Store<RootStateI>;
    public ix:any;
    public cmd:any;
    public one:any;
    public list:any;
    public status:any;
    public tree:any;
    public error:any;

    public querySys:QuerySys;
    public vuexSys:VuexSys;

    public constructor(vuexSys:VuexSys){
        this.vuexSys = vuexSys;
        this.store = vuexSys.getRootStore();

        if(this.store.state.ix){
            this.ix = this.store.state.ix;
        } else {
            console.warn('Не определен модуль ix');
        }

        if(this.store.state.cmd){
            this.cmd = this.store.state.cmd;
        } else {
            console.warn('Не определен модуль cmd');
        }

        if(this.store.state.one){
            this.one = this.store.state.one;
        } else {
            console.warn('Не определен модуль one');
        }

        if(this.store.state.list){
            this.list = this.store.state.list;
        } else {
            console.warn('Не определен модуль list');
        }

        if(this.store.state.status){
            this.status = this.store.state.status;
        } else {
            console.warn('Не определен модуль status');
        }

        if(this.store.state.tree){
            this.tree = this.store.state.tree;
        } else {
            console.warn('Не определен модуль tree');
        }

        if(this.store.state.error){
            this.error = this.store.state.error;
        } else {
            console.warn('Не определен модуль error');
        }

        // Определяем построитель запросов
        this.querySys = new QuerySys(this);
        
    }
}