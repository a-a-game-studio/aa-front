
export interface RootStateI{
    ix?:Record<string, any>;
    cmd?:Record<string, any>;
    one?:Record<string, any>;
    list?:Record<string, any[]>;
    tree?:Record<string, any>;
    status?:Record<string, any>;
    error?:Record<string, any>;

    // VUEX Хранилище
    state?:any;

    registerModule:Function;
}

/** Интерфейс по опция vuex для регистрации хранилища */
export interface VuexOption{
    preserveState?:boolean; // сохранить предыдущее состояние
}

export class VuexSys{
    private store: RootStateI;

    /** Инкрементор для кастомных сторов */
    private incrStore = 0;

    public ix?:Record<string, any>;
    public cmd?:Record<string, any>;
    public one?:Record<string, any>;
    public list?:Record<string, any[]>;
    public tree?:Record<string, any>;
    public status?:Record<string, any>;
    public error?:Record<string, any>;

    /**
     * Создать хранилище
     * @param store 
     */
    constructor(store:RootStateI|any){
        this.store = store;
    }

    // ============================================

    /**
     * Регистрация модуля состояния команд
     * @param state 
     */
    public registerModuleCmd(state:{[key:string]:any}, option?:VuexOption){

        if(option){ // Учитывать опции при создании хранилища
            this.store.registerModule('cmd', { state:state }, option);
        } else {
            this.store.registerModule('cmd', { state:state });
        }
        this.cmd = this.getCmdStore();

        return this.getCmdStore();
    }

    /**
     * Регистрация модуля индексированные списки
     * @param state 
     */
    public registerModuleIx(state:{[key:string]:any}, option?:VuexOption){

        if(option){ // Учитывать опции при создании хранилища
            this.store.registerModule('ix', { state:state }, option);
        } else {
            this.store.registerModule('ix', { state:state });
        }
        this.ix = this.getIxStore();

        return this.getIxStore();
    }

    /**
     * Регистрация модуля состояния модели
     * @param state 
     */
    public registerModuleOne(state:{[key:string]:any}, option?:VuexOption){

        if(option){ // Учитывать опции при создании хранилища
            this.store.registerModule('one', { state:state }, option);
        } else {
            this.store.registerModule('one', { state:state });
        }
        this.one = this.getOneStore();

        return this.getOneStore();
    }

    /**
     * Регистрация модуля состояния списка модели
     * @param state 
     */
    public registerModuleList(state:{[key:string]:any}, option?:VuexOption){

        if(option){ // Учитывать опции при создании хранилища
            this.store.registerModule('list', { state:state }, option);
        } else {
            this.store.registerModule('list', { state:state });
        }
        this.list = this.getListStore();

        return this.getListStore();
    }

    /**
     * Регистрация модуля состояния деревьев
     * @param state 
     */
    public registerModuleTree(state:{[key:string]:any}, option?:VuexOption){

        if(option){ // Учитывать опции при создании хранилища
            this.store.registerModule('tree', { state:state }, option);
        } else {
            this.store.registerModule('tree', { state:state });
        }
        this.tree = this.getTreeStore();

        return this.getTreeStore();
    }

    /**
     * Регистрация модуля состояния списка ошибок
     * @param state 
     */
    public registerModuleError(state:{[key:string]:any}, option?:VuexOption){

        if(option){ // Учитывать опции при создании хранилища
            this.store.registerModule('error', { state:state }, option);
        } else {
            this.store.registerModule('error', { state:state });
        }
        this.error = this.getErrorStore();

        return this.getErrorStore();
    }


    /**
     * Регистрация модуля состояния статуса приложения
     * @param state 
     */
    public registerModuleStatus(state:{[key:string]:any}, option?:VuexOption){

        if(option){ // Учитывать опции при создании хранилища
            this.store.registerModule('status', { state:state }, option);
        } else {
            this.store.registerModule('status', { state:state });
        }
        this.status = this.getStatusStore();

        return this.getStatusStore();
    }

    /**
     * Регистрация специального хранилища по ключу
     * @param state 
     */
    public registerModuleCustom(state:{[key:string]:any}, option?:VuexOption){
        const kStore = 'custom_'+this.incrStore++;

        if(option){ // Учитывать опции при создании хранилища
            this.store.registerModule(kStore, { state:state }, option);
        } else {
            this.store.registerModule(kStore, { state:state });
        }

        return this.getCustomStore(kStore);
    }

    /**
     * Регистрация специального хранилища по ключу
     * @param state 
     */
    public registerModuleCustomKey(state:{[key:string]:any}, key:string, option?:VuexOption){

        if(option){ // Учитывать опции при создании хранилища
            this.store.registerModule(key, { state:state }, option);
        } else {
            this.store.registerModule(key, { state:state });
        }

        return this.getCustomStore(key);
    }

    /**
     * Получить корневой объект состояния
     */
    public getRootStore(){
        return this.store;
    }
    
    /**
     * Получить объект состояния индексы
     */
    public getIxStore(){
        return this.store.state ? this.store.state.ix : null;
    }

    /**
     * Получить объект состояния команд
     */
    public getCmdStore(){
        return this.store.state ? this.store.state.cmd : null;
    }

    /**
     * Получить объект состояния модели
     */
    public getOneStore(){
        return this.store.state ? this.store.state.one : null;
    }

    /**
     * Получить объект состояния списков моделей
     */
    public getListStore(){
        return this.store.state ? this.store.state.list : null;
    }

    /**
     * Получить объект состояния деревьев
     */
    public getTreeStore(){
        return this.store.state ? this.store.state.tree : null;
    }

    /**
     * Получить объект состояния приложения
     */
    public getStatusStore(){
        return this.store.state ? this.store.state.status : null;
    }

    /**
     * Получить кастомное состояние приложения
     */
     public getCustomStore(kStore:string){
        return this.store.state[kStore];
    }

    /**
     * Получить объект состояния серверных ошибок
     */
    public getErrorStore(){
        return this.store.state ? this.store.state.error : null;
    }

}