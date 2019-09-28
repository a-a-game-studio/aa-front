

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

    public fOne = function(key:string, alias:string){
        this.request.one[key] = alias;
    }

    public fList = function(key:string, alias:string){
        this.request.list[key] = alias;
    }

    public fCmd = function(key:string, alias:string){
        this.data.request.cmd[key] = alias;
    };

    public async fSend(sUrl:string, data:{[key:string]:any}){

        if(!sUrl){
            alert('URL - не определен');
            return false;
        }

        const vAxios = axios.create({
            baseURL: this.ctrl.conf.common.baseURL,
            timeout: 20000,
            headers: {
                'apikey': '9d50ed61df5951973b9e274f043b4ed7'
            }
        });

        try{
            let resp:ResponseI = await vAxios.post(sUrl, data);
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

            // if( aData.access.redirect ){
            //     window.location.replace(this.ctrl.conf.redirect.login);
            // }
        };

        

    };


};