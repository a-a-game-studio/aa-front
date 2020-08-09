

import { BaseCtrl } from "./BaseCtrl";
import axios from 'axios'
import * as VuexSys from "./VuexSys"

interface ResponseI{
    ok:boolean;
    e:boolean;
    data:{[key:string]:any}
    errors:{[key:string]:string};
    warning:{[key:string]:string};
    notice:{[key:string]:string};
}

interface RequestI{
    cmd?:any;
    one?:any,
    list?:any,
    status?:any,
    cbAction?:Function, // Сбрасывае функцию обратного вызова
}

/** Система запросов к серверу */
export class QuerySys{

    private req:RequestI; // Запрос

    private ctrl:BaseCtrl;
    private token:string;

    constructor(ctrl:BaseCtrl){

        this.req = {}; // Запрос

        this.ctrl = ctrl;
    }

    public async cbSuccess(req:RequestI, aData:any){

        console.log('===>Success.aData',aData);

        let vServData = null;
        let aMutation:VuexSys.ServerResponseI = <any>{};

        for(let kKey in req.cmd){
            let vAlias = req.cmd[kKey];

            if(!aMutation.cmd){
                aMutation.cmd = {};
            }
            
            aMutation.cmd[vAlias] = aData[kKey];

        };

        for(let kKey in req.one){
            let vAlias = req.one[kKey];

            if(!aMutation.one){
                aMutation.one = {};
            }
            
            aMutation.one[vAlias] = aData[kKey];
        };
        
        for(let kKey in req.list){
            let vAlias = req.list[kKey];
            
            if(!aMutation.list){
                aMutation.list = {};
            }
            
            aMutation.list[vAlias] = aData[kKey];

        };

        for(let kKey in req.list){
            let vAlias = req.list[kKey];
            
            if(!aMutation.tree){
                aMutation.tree = {};
            }
            
            aMutation.tree[vAlias] = aData[kKey];

        };

        for(let kKey in req.status){
            let vAlias = req.status[kKey];
            
            if(!aMutation.status){
                aMutation.status = {};
            }

            if( this.ctrl.status[vAlias] != aData[kKey] ){
                console.log('update state - ',kKey,vAlias)
                aMutation.status[vAlias] = aData[kKey];
            }
            
        };

        // Если прислан токен нужно его обновить в localstorage
        if(aData['token']){
            this.token = localStorage['token'] = aData['token'];
        }

        console.log('===>aMutation:',aMutation);

        this.ctrl.vuexSys.fServerResponse(aMutation);

        // Если функция обратного вызова указана
        if(req.cbAction){
            req.cbAction(true, aData);
        }
    }

    /**
     * Ответ с ошибкой
     */
    public async cbError(req:RequestI, errors:any){
        console.log('==>cbError:',errors);
        this.ctrl.store.commit('server_error', errors);

        // Если функция обратного вызова указана
        if(req.cbAction){
            req.cbAction(false, errors);
        }
    }

    /**
     * Функция обратного вызова после выполнения запроса
     * function(ok:boolean, data:any)
     */
    public fAction(cbAction:Function){
        this.req.cbAction = cbAction;
    }

    /**
     * Инициализация запроса
     */
    public fInit(){

        this.req = {
            cmd:{},
            one:{},
            list:{},
            status:{},
            cbAction:null, // Сбрасывае функцию обратного вызова
        };

        if(localStorage['token']){
            this.token = localStorage['token'];
        } else {
            this.token = null;
        }

        console.log('===>token:',this.token);


        return this;
    }

    /**
     * Получить модель данных
     */
    public fOne(key:string, alias:string){
        this.req.one[key] = alias;
    }

    /**
     * Получить список моделей данных
     */
    public fList(key:string, alias:string){
        this.req.list[key] = alias;
    }

    /**
     * Получить команду
     */
    public fCmd(key:string, alias:string){
        this.req.cmd[key] = alias;
    };

    /**
     * Получить статус
     */
    public fStatus(key:string, alias:string){
        this.req.status[key] = alias;
    };

    public fSend(sUrl:string, data:{[key:string]:any}){

        if(!sUrl){
            alert('URL - не определен');
            return false;
        }

        // Создаем локальную копию req для возможности множественных асинхронных запросов
        const reqQuery = this.req;

        console.log('===>token:',this.token);
        
        const vAxios = axios.create({
            baseURL: this.ctrl.conf.common.api,
            timeout: 20000,
            headers: {
                'token': this.token
            }
        });

        console.log('==>URL:',this.ctrl.conf.common.api, sUrl);
        console.log('==>Send data:',data);

        let promiseAxios = vAxios.post(sUrl, data).then((respAxios) => {

            console.log('===>respAxios:',respAxios);

            let resp:ResponseI = respAxios.data;
            
            if(resp.ok){
                this.cbSuccess(reqQuery, resp.data);
            } else {
                this.cbError(reqQuery, resp.errors);
            }
        }).catch(() => {
            let errors = {
                'server_no_response':'Сервер недоступен'
            }
            this.cbError(reqQuery, errors);

            // if( aData.access.redirect ){
            //     window.location.replace(this.ctrl.conf.redirect.login);
            // }
        });

        return promiseAxios;
    };

    public async faSend(sUrl:string, data:{[key:string]:any}){

        if(!sUrl){
            alert('URL - не определен');
            return false;
        }

        const reqQuery = this.req;

        console.log('===>token:',this.token);

        const vAxios = axios.create({
            baseURL: this.ctrl.conf.common.api,
            timeout: 20000,
            headers: {
                'token': this.token
            }
        });

        console.log('==>URL:',this.ctrl.conf.common.api, sUrl);
        console.log('==>Send data:',data);

        try{
            let respAxios = await vAxios.post(sUrl, data);

            console.log('===>respAxios:',respAxios);
            
            let resp:ResponseI = respAxios.data;
            if(resp.ok){
                await this.cbSuccess(reqQuery, resp.data);
            } else {
                await this.cbError(reqQuery, resp.errors);
            }
            

        } catch(e){
        
            let errors = {
                'server_no_response':'Сервер недоступен'
            }
            this.cbError(reqQuery, errors);

            // if( aData.access.redirect ){
            //     window.location.replace(this.ctrl.conf.redirect.login);
            // }
        }

    };


};