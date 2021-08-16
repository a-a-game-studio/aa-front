

import { VuexSys } from './VuexSys'

/** Базовый контроллер - глобальный объект */
export class BaseCtrl{
    /** ROOT хранилище */
    public store:any;

    /** Хранилище - Индексированных списоков */
    public ix:any;

    /** Хренилище - команд */
    public cmd:any;

    /** Хранилище - моделей */
    public one:any;

    /** Хранилище списоков */
    public list:any;

    /** Хранилище - Статуса */
    public status:any;

    /** Хранилище - деревьев */
    public tree:any;

    /** Хранилище - ошибок */
    public error:any;

    public vuexSys:VuexSys;

    public constructor(vuexSys:VuexSys){
        this.vuexSys = vuexSys;
        this.store = vuexSys.getRootStore();
    }
}