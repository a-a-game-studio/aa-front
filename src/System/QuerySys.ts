

import { BaseCtrl } from "./BaseCtrl";
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

    private ctrl:BaseCtrl;
    private token:string;

    constructor(ctrl:BaseCtrl){

        this.request = {}; // Запрос

        this.ctrl = ctrl;
    }

    public cbSuccess = function(response:any){
        let self = this;
        let aData = response.data;

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

        for(let kKey in vRequest.cmd){
            let vAlias = vRequest.cmd[kKey];

            if(!aMutation.cmd){
                aMutation.cmd = {};
            }
            
            aMutation.cmd[vAlias] = aData[kKey];

        };

        for(let kKey in vRequest.one){
            let vAlias = vRequest.one[kKey];

            if(!aMutation.one){
                aMutation.one = {};
            }
            
            aMutation.one[vAlias] = aData[kKey];
        };
        
        for(let kKey in vRequest.list){
            let vAlias = vRequest.list[kKey];
            
            if(!aMutation.list){
                aMutation.list = {};
            }
            
            aMutation.list[vAlias] = aData[kKey];

        };

        for(let kKey in vRequest.list){
            let vAlias = vRequest.list[kKey];
            
            if(!aMutation.tree){
                aMutation.tree = {};
            }
            
            aMutation.tree[vAlias] = aData[kKey];

        };

        for(let kKey in vRequest.status){
            let vAlias = vRequest.status[kKey];
            
            if(!aMutation.status){
                aMutation.status = {};
            }

            if( this.ctrl.store.state.status[vAlias] != aData[kKey] ){
                console.log('update state - ',kKey,vAlias)
                aMutation.status[vAlias] = aData[kKey];
            }
            
        };

    }

    public cbError = function(errors:any){
        this.ctrl.store.commit('server_error', errors);
    }

    /**
     * Инициализация запроса
     */
    public fInit = function(){

        this.request = {
            cmd:{},
            one:{},
            list:{},
            status:{},
        };


        if(localStorage['token']){
            this.token = localStorage['token'];
        } else {
            this.token = null;
        }


        return this;
    }

    /**
     * Получить модель данных
     */
    public fOne = function(key:string, alias:string){
        this.request.one[key] = alias;
    }

    /**
     * Получить список моделей данных
     */
    public fList = function(key:string, alias:string){
        this.request.list[key] = alias;
    }

    /**
     * Получить команду
     */
    public fCmd = function(key:string, alias:string){
        this.request.cmd[key] = alias;
    };

    /**
     * Получить статус
     */
    public fStatus = function(key:string, alias:string){
        this.request.status[key] = alias;
    };

    public fSend(sUrl:string, data:{[key:string]:any}){

        if(!sUrl){
            alert('URL - не определен');
            return false;
        }

        const vAxios = axios.create({
            baseURL: this.ctrl.conf.common.baseURL,
            timeout: 20000,
            headers: {
                'apikey': this.token
            }
        });

        console.log('==>Send data:',data);

        let promiseAxios = vAxios.post(sUrl, data).then((respAxios) => {
            let resp:ResponseI = respAxios.data;
            if(resp.ok){
                this.cbSuccess(resp.data);
            } else {
                this.cbError(resp.errors);
            }
        }).catch(() => {
            let errors = {
                'server_no_response':'Сервер недоступен'
            }
            this.cbError(errors);

            // if( aData.access.redirect ){
            //     window.location.replace(this.ctrl.conf.redirect.login);
            // }
        });

        return promiseAxios;
    };


};