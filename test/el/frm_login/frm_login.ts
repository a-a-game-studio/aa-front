import Vue from 'vue';
import Component from 'vue-class-component'
import {ctrl} from '../../ctrl_login';

@Component
export default class frm_login extends Vue {
    private sLogin:string = null;
    private sPswd:string = null;

    created(){
        ctrl.fInit();
    }

    /** Логин */
    fLogin(){
        var login_data = {
            login:this.sLogin,
            pswd:this.sPswd,
        };
        ctrl.fLogin(login_data);
        console.log(login_data);
    }

    /** Выход пользователя */
    fLogout(){
        ctrl.fLogout();
        console.log('logout');
    }
    
    /** Ввод логина */
    fInputLogin(e:any){
        this.sLogin = e.target.value;
    }

    /** Ввод пароля */
    fInputPswd(e:any){
        this.sPswd = e.target.value;
    }

    get status(){ return ctrl.status; }
    get one(){ return ctrl.one; }
    get list(){ return ctrl.list; }
};
    
