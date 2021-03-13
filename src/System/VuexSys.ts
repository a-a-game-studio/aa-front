
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

export class VuexSys{
    private store: RootStateI;

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
    public registerModuleCmd(state:{[key:string]:any}){

        this.store.registerModule('cmd', { state:state });

        return this.getCmdStore();
    }

    /**
     * Регистрация модуля индексированные списки
     * @param state 
     */
    public registerModuleIx(state:{[key:string]:any}){

        this.store.registerModule('ix', { state:state });

        return this.getIxStore();
    }

    /**
     * Регистрация модуля состояния модели
     * @param state 
     */
    public registerModuleOne(state:{[key:string]:any}){

        this.store.registerModule('one', { state:state });

        return this.getOneStore();
    }

    /**
     * Регистрация модуля состояния списка модели
     * @param state 
     */
    public registerModuleList(state:{[key:string]:any}){

        this.store.registerModule('list', { state:state });

        return this.getListStore();
    }

    /**
     * Регистрация модуля состояния деревьев
     * @param state 
     */
    public registerModuleTree(state:{[key:string]:any}){

        this.store.registerModule('tree', { state:state });

        return this.getTreeStore();
    }

    /**
     * Регистрация модуля состояния списка ошибок
     * @param state 
     */
    public registerModuleError(state:{[key:string]:any}){

        this.store.registerModule('error', { state:state });

        return this.getErrorStore();
    }


    /**
     * Регистрация модуля состояния статуса приложения
     * @param state 
     */
    public registerModuleStatus(state:{[key:string]:any}){

        this.store.registerModule('status', { state:state });

        return this.getStatusStore();
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
     * Получить объект состояния серверных ошибок
     */
    public getErrorStore(){
        return this.store.state ? this.store.state.error : null;
    }

}