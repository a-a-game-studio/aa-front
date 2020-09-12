import * as aaFront from '../src'
import { conf, api } from './conf_login'
import { store, vuexSys } from './vuex_login'

class Ctrl extends aaFront.BaseCtrl{
    constructor(store:aaFront.VuexSys){
        super(store);
    }

    public fInit(){
        this.querySys.fInit();
        this.querySys.fOne('one_user_info', 'user');
        this.querySys.fStatus('user_id', 'user_id');
        this.querySys.fSend(api.index, null);
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
        this.querySys.fStatus('token', 'token');

        this.querySys.fSend(api.login, data);
    };

    //=========================================
    /** Выход */ 
    public fLogout(){
        this.querySys.fInit();
        this.querySys.fCmd('cmd_logout', 'logout');
        this.querySys.fSend(api.logout, null);


        this.vuexSys.fClearStatus('token');
        this.vuexSys.fClearStatus('user_id');
        this.vuexSys.fClearOne('user');

        localStorage['token'] = null;
    };
    
}

export const ctrl = new Ctrl(vuexSys);