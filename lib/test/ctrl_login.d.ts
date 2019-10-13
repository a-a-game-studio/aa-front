import * as aaFront from '../src';
declare class Ctrl extends aaFront.BaseCtrl {
    constructor(store: aaFront.VuexSys);
    fInit(): void;
    /** Авторизоваться */
    fLogin(data: {
        login: string;
        pswd: string;
    }): void;
    /** Выход */
    fLogout(): void;
}
export declare const ctrl: Ctrl;
export {};
