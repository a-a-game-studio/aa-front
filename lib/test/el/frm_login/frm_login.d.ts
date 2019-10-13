import Vue from 'vue';
export default class frm_login extends Vue {
    private sLogin;
    private sPswd;
    created(): void;
    /** Логин */
    fLogin(): void;
    /** Выход пользователя */
    fLogout(): void;
    /** Ввод логина */
    fInputLogin(e: any): void;
    /** Ввод пароля */
    fInputPswd(e: any): void;
    readonly status: any;
    readonly one: any;
    readonly list: any;
}
