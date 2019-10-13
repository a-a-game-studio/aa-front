
import Vuex, { Store, Module }  from 'vuex';

import Vue from 'vue';

if(Vue){
    Vue.use(Vuex);
}

export interface RootStateI{
    cmd:Store<any>;
    one:Store<any>;
    list:Store<any>;
    tree:Store<any>;
    status:Store<any>;
    error:Store<any>;
}

export class VuexSys{
    private store: Store<RootStateI>;

    constructor(){
        this.store = new Vuex.Store({
            mutations: {
                
            }
        });
    }

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
                    if(response.list){
                        for(let k in response.list){
                            let v = response.list[k];
                            state[k] = v;
                        };
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
                    if(response.state){
                        for(let k in response.status){
                            let v = response.status[k];
                            state[k] = v;
                        };
                    }
                },
                set_state(state, field){
                    state[field.key] = field.value;
                },
                clear_state(state, key){
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

