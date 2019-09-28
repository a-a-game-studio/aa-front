

import { BaseCtrlSys } from "./BaseCtrlSys";
import axios from 'axios'

interface ResponseI{
    ok:boolean;
    e:boolean;
    data:{[key:string]:any}
    errors:{[key:string]:string};
    warning:{[key:string]:string};
    notice:{[key:string]:string};
}

/** Система запросов к серверу */
export class QuerySys{

    private request:{[key:string]:any}; // Запрос
    private asUpdate:any[]; // Список того что будем обновлять

    private ctrl:BaseCtrlSys;
    private token:string;

    constructor(ctrl:BaseCtrlSys){

        this.request = {}; // Запрос
        this.asUpdate = []; // Список того что будем обновлять

        this.ctrl = ctrl;
    }

    public cbSuccess = function(response){
        let self = this;
        let aData = response.data;
        // console.log(vue_query.data.request);
        let vRequest = null;
        let vServData = null;
        let aMutation:{
            cmd:any;
            one:any;
            list:any;
            tree:any;
            status:any;
        } = <any>{};

        
        vRequest = this.request;
        // vServData = aData[vRequest.cmd][k];

        for(let k in vRequest.cmd){
            let v = vRequest.cmd[k];

            if(!aData.cmd[v.alias]){ return; } //Если данные не пришли мутацию не запускаем
            vServData = aData.cmd[v.alias];

            if(!aMutation.cmd){
                aMutation.cmd = {};
            }
            
            aMutation.cmd[v.alias] = vServData;

        };

        for(let k in vRequest.one){
            let v = vRequest.one[k];

            if(!aData.one[v.alias]){ return; } //Если данные не пришли мутацию не запускаем
            vServData = aData.one[v.alias];

            if(!aMutation.one){
                aMutation.one = {};
            }
            
            aMutation.one[v.alias] = vServData;

        };
        
        for(let k in vRequest.list){
            let v = vRequest.list[k];

            if(!aData.list[v.alias]){ return; } //Если данные не пришли мутацию не запускаем
            vServData = aData.list[v.alias];
            
            if(!aMutation.list){
                aMutation.list = {};
            }
            
            aMutation.list[v.alias] = vServData;

        };

        for(let k in vRequest.tree){
            let v = vRequest.tree[k];

            if(!aData.tree[v.alias]){ return; } //Если данные не пришли мутацию не запускаем
            vServData = aData.tree[v.alias];
            
            if(!aMutation.tree){
                aMutation.tree = {};
            }
            
            aMutation.tree[v.alias] = vServData;

        };

        for(let k in vRequest.status){
            let v = vRequest.status[k];
            
            if(!aMutation.status){
                aMutation.status = {};
            }

            if( this.ctrl.store.state.status[k] != v ){
                console.log('update state - ',k,v)
                aMutation.status[k] = v;
            }
            
        };

        if( aData.access.ok ){
            this.ctrl.store.commit('server_response', aMutation);
        }

        if( aData.access.redirect ){
            window.location.replace(this.ctrl.conf.redirect.login);
        }
    }

    public cbError = function(errors:any){
        this.ctrl.store.commit('server_error', errors);
    }

    public fInit = function(){

        this.data.request = {
            cmd:{},
            one:{},
            list:{},
            status:{},
        };

        this.data.ok = true;

        if(localStorage['token']){
            this.token = localStorage['token'];
        } else {
            this.token = null;
        }


        return this;
    }

    public fOne = function(key, alias){
        this.request.one[key] = alias;
    }

    public fList = function(key, alias){
        this.request.list[key] = alias;
    }

    public fCmd = function(key, alias){
        this.data.request.cmd[key] = alias;
    };

    public async fSend(sUrl:string, data:{[key:string]:any}){

        if(!sUrl){
            alert('URL - не определен');
            return false;
        }

        // if(!this.status.ok){
        //     return false;
        // } else {
        //     this.status.ok = false;
        // }


        // let data = new FormData();
        // data.append( "json", JSON.stringify( aSendData ) );

        try{
            let resp:ResponseI = await axios.post(sUrl, data);
            if(resp.ok){
                this.cbSuccess(resp.data);
            } else {
                this.cbError(resp.errors);
            }
            
        } catch(e){
            let errors = {
                'server_no_response':'Сервер недоступен'
            }
            this.cbError(errors);
        };

    };


};