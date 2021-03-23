

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

        if(!this.ix){
            console.warn('Не определен модуль ix');
        }

        if(!this.cmd){
            console.warn('Не определен модуль cmd');
        }

        if(!this.one){
            console.warn('Не определен модуль one');
        }

        if(!this.list){
            console.warn('Не определен модуль list');
        }

        if(!this.status){
            console.warn('Не определен модуль status');
        }

        if(!this.tree){
            console.warn('Не определен модуль tree');
        }

        if(!this.error){
            console.warn('Не определен модуль error');
        }
        
    }
}