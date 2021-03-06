

import { VuexSys } from './VuexSys'
import { QuerySys } from './QuerySys';

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

        if(vuexSys.getIxStore()){
            this.ix = vuexSys.getIxStore();
        } else {
            console.warn('Не определен модуль ix');
        }

        if(vuexSys.getCmdStore()){
            this.cmd = vuexSys.getCmdStore();
        } else {
            console.warn('Не определен модуль cmd');
        }

        if(vuexSys.getOneStore()){
            this.one = vuexSys.getOneStore();
        } else {
            console.warn('Не определен модуль one');
        }

        if(vuexSys.getListStore()){
            this.list = vuexSys.getListStore();
        } else {
            console.warn('Не определен модуль list');
        }

        if(vuexSys.getStatusStore()){
            this.status = vuexSys.getStatusStore();
        } else {
            console.warn('Не определен модуль status');
        }

        if(vuexSys.getTreeStore()){
            this.tree = vuexSys.getTreeStore();
        } else {
            console.warn('Не определен модуль tree');
        }

        if(vuexSys.getErrorStore()){
            this.error = vuexSys.getErrorStore();
        } else {
            console.warn('Не определен модуль error');
        }
        
    }
}