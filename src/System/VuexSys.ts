
import Vuex, { Store, Module }  from 'vuex';

import Vue from 'vue';

Vue.use(Vuex);

export interface RootStateI{
    cmd:Store<any>;
    one:Store<any>;
    list:Store<any>;
    tree:Store<any>;
    status:Store<any>;
    error:Store<any>;
}

export interface ServerResponseI{
    cmd:{[key:string]:any};
    one:{[key:string]:any};
    list:{[key:string]:any[]};
    tree:{[key:string]:any};
    status:{[key:string]:string|boolean|number};
    error:{[key:string]:string};
}


export class VuexSys{
    private store: Store<RootStateI>;

    constructor(){
        this.store = new Vuex.Store({
            mutations: {
                
            }
        });
    }

    // ============================================

    /**
     * module: all
     * Мутация ответа сервера
     * @param response 
     */
    public fServerResponse(response:ServerResponseI){
        this.store.commit('server_response', response);
    }

    // =========================================

    /**
     * module: one
     * Мутация - изменить модель данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    public fSetOne(key:string, value:any){
        this.store.commit('set_one', {key, value});
    }

    /**
     * module: one
     * Мутация - изменить поле модели данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    public fSetOneField(key:string, name:string, value:any){
        this.store.commit('set_one_field', {key, name, value});
    }

    /**
     * module: one
     * Мутация - очищает по ключу модель данных
     * @param key 
     */
    public fClearOne(key:string){
        this.store.commit('clear_one', key);
    }

    // =========================================

    /**
     * module: list
     * Мутация - изменить список моделей данных
     * @param key - ключ модуля
     * @param name - поле модели
     * @param value - значение
     */
    public fSetList(key:string, value:any){
        this.store.commit('set_list', {key, value});
    }

    /**
     * module: list
     * Мутация - очищает по ключу список моделей данных
     * @param key 
     */
    public fClearList(key:string){
        this.store.commit('clear_list', key);
    }

    // =========================================

    /**
     * module: status
     * Мутация - изменить состояние страницы
     * @param key - ключ модуля
     * @param value - значение
     */
    public fSetStatus(key:string, value:boolean|number|string){
        this.store.commit('set_status', {key, value});
    }

    /**
     * module: status
     * Мутация - очищает по ключу status
     * @param key 
     */
    public fClearStatus(key:string){
        this.store.commit('clear_status', key);
    }

    // =========================================

    /**
     * module: tree
     * Мутация - очищает по ключу дерево объектов
     * @param key 
     */
    public fClearTree(key:string){
        this.store.commit('clear_tree', key);
    }

    /**
     * module: error
     * Мутация - очищает по ключу ошибку
     * @param key 
     */
    public fClearError(key:string){
        this.store.commit('clear_error', key);
    }
    

    // ============================================

    /**
     * Регистрация модуля состояния команд
     * @param state 
     */
    public registerModuleCmd(state:{[key:string]:any}){

        this.store.registerModule('cmd', {
            state:state,
            mutations:{
                server_response(state, response){
                    if(response.cmd){
                        for(let k in response.cmd){
                            let v = response.cmd[k];
                            state[k] = v;
                        };
                    }
                },
            }
        });

        return this;
    }

    /**
     * Регистрация модуля состояния модели
     * @param state 
     */
    public registerModuleOne(state:{[key:string]:any}){

        this.store.registerModule('one', {
            state:state,
            mutations: {
                server_response(state, response){
                    console.log('server_response:one', response);
                    if(response.one){
                        for(let k in response.one){
                            let v = response.one[k];
                            state[k] = v;
                        };
                    }
                },
                set_one_field(state, field){
                    if(state[field.key]){
                        state[field.key][field.name] = field.value;
                    }
                },
                set_one(state, one){
                    state[one.key] = one.value;
                },
                clear_one(state, key){
                    if(state[key]){
                        state[key] = null;
                    }
                }
            },
        });

        return this;
    }

    /**
     * Регистрация модуля состояния списка модели
     * @param state 
     */
    public registerModuleList(state:{[key:string]:any}){

        this.store.registerModule('list', {
            state:state,
            mutations: {
                server_response(state, response){
                    console.log('server_response:list', response);
                    if(response.list){
                        for(let k in response.list){
                            let v = response.list[k];
                            state[k] = v;
                        };
                    }
        
                },
                set_list(state, list){
                    if(state[list.key]){
                        state[list.key] = list.value;
                    }
                },
                clear_list(state, key){
                    if(state[key]){
                        state[key] = null;
                    }
                }
            },
        });

        return this;
    }

    /**
     * Регистрация модуля состояния деревьев
     * @param state 
     */
    public registerModuleTree(state:{[key:string]:any}){

        this.store.registerModule('tree', {
            state:state,
            mutations: {
                server_response(state, response){
                    console.log('server_response:tree', response);
                    if(response.tree){
                        for(let k in response.tree){
                            let v = response.tree[k];
                            state[k] = v;
                        };
                    }
        
                },
                clear_tree(state, key){
                    if(state[key]){
                        state[key] = null;
                    }
                }
            },
        });

        return this;
    }

    /**
     * Регистрация модуля состояния списка ошибок
     * @param state 
     */
    public registerModuleError(state:{[key:string]:any}){

        this.store.registerModule('error', {
            state:state,
            mutations: {
                server_error(state, errors){
                    console.log('server_response:error', errors);
                    if(errors){
                        for(let k in errors){
                            let v = errors[k];
                            state[k] = v;
                        };
                    }
        
                },
                clear_error(state, key){
                    if(state[key]){
                        state[key] = null;
                    }
                }
            },
        });

        return this;
    }


    /**
     * Регистрация модуля состояния статуса приложения
     * @param state 
     */
    public registerModuleStatus(state:{[key:string]:number|string|boolean}){

        this.store.registerModule('status', {
            state:state,
            mutations: {
                server_response(state, response){
                    console.log('server_response:status', response);
                    if(response.status){
                        for(let k in response.status){
                            let v = response.status[k];
                            state[k] = v;
                        };
                    }
                },
                set_status(state, field){
                    state[field.key] = field.value;
                },
                clear_status(state, key){
                    if(state[key]){
                        state[key] = 0;
                    }
                }
            },
        });

        return this;
    }

    /**
     * Получить корневой объект состояния
     */
    public getRootStore(){
        return this.store;
    }

    /**
     * Получить объект состояния команд
     */
    public getCmdStore(){
        return this.store.state.cmd;
    }

    /**
     * Получить объект состояния модели
     */
    public getOneStore(){
        return this.store.state.one;
    }

    /**
     * Получить объект состояния списков моделей
     */
    public getListStore(){
        return this.store.state.list;
    }

    /**
     * Получить объект состояния деревьев
     */
    public getTreeStore(){
        return this.store.state.tree;
    }

    /**
     * Получить объект состояния приложения
     */
    public getStatusStore(){
        return this.store.state.status;
    }

    /**
     * Получить объект состояния серверных ошибок
     */
    public getErrorStore(){
        return this.store.state.error;
    }

}