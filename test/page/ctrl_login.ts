import * as aaFront from '../../src'
import {localStorage, store } from '../../src/System/MockTestEnv'
import { pageConf as conf } from './conf_login'

class Ctrl extends aaFront.BaseCtrl{
    constructor(store:any){
        super(store, conf);
    }

    public fInit(){
        this.querySys.fInit();
        this.querySys.fOne('one_user', 'user');
        this.querySys.fStatus('user_id', 'user_id');
        this.querySys.fSend(conf.api.index, null);
    };

    //=========================================
    /** Авторизоваться */ 
    public fLogin(data:{
        login:string;
        pswd:string;
    }) {
        this.querySys.fInit();
        this.querySys.fCmd('cmd_login', 'login');
        this.querySys.fOne('one_user', 'user');
        this.querySys.fStatus('user_id', 'user_id');

        this.querySys.fSend(conf.api.login, data);
    };

    //=========================================
    /** Выход */ 
    public fLogout(){
        this.querySys.fInit();
        this.querySys.fCmd('cmd_logout', 'logout');
        this.querySys.fSend(conf.api.logout, null);

        store.commit('clear_state', 'user_id');
        store.commit('clear_one', 'login');
        store.commit('clear_one', 'user');

        localStorage['token'] = null;
    };
    
}

export const ctrl = new Ctrl(store);