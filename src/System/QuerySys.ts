

import { BaseCtrl } from "./BaseCtrl";
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

/**
 * Интерфейс ответа сервера
 */
interface ResponseI{
    ok:boolean;
    e:boolean;
    data:{[key:string]:any}
    errors:{[key:string]:string};
    warning:{[key:string]:string};
    notice:{[key:string]:string};
}

/**
 * Контекст запроса
 */
interface RequestI{
    cbAction?:Function, // Сбрасывае функцию обратного вызова
    cbActionOk?:Function, // Сбрасывае функцию обратного вызова - успешного выполнения
    cbActionErr?:Function, // Сбрасывае функцию обратного вызова - выполнения с ошибкой
}

/** Система запросов к серверу */
export class QuerySys{

    private req:RequestI; // Запрос
    private token:string;
    private conf:AxiosRequestConfig;

    constructor(){

        this.req = {}; // Запрос
    }

    /**
     * Успешное завершение запроса
     * @param req // Запрос
     * @param aData //
     */
    public cbSuccess(req:RequestI, aData:any){

        // Если функция обратного вызова указана
        if(req.cbAction){
            req.cbAction(true, aData);
        }

        // Если функция обратного вызова указана - успешного выполнения
        if(req.cbActionOk){
            req.cbActionOk(aData);
        }
    }

    /**
     * Ответ с ошибкой
     */
    public cbError(req:RequestI, errors:any){
        console.error('==>cbError:',errors);

        // Если функция обратного вызова указана
        if(req.cbAction){
            req.cbAction(false, errors);
        }

        // Если функция обратного вызова указана с ошибкой указана
        if(req.cbActionErr){
            req.cbActionErr(errors);
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
     * Функция обратного вызова после успешного выполнения запроса
     * function(data:any)
     */
    public fActionOk(cbActionOk:Function){
        this.req.cbActionOk = cbActionOk;
    }

    /**
     * Функция обратного вызова после успешного выполнения запроса
     * function(errors:any)
     */
    public fActionErr(cbActionErr:Function){
        this.req.cbActionErr = cbActionErr;
    }

    /**
     * Инициализация запроса
     */
    public fConfig(conf:AxiosRequestConfig){
        this.conf = conf;
    }

    /**
     * Инициализация запроса
     */
    public fInit(){

        this.req = {
            cbAction:null, // Сбрасывае функцию обратного вызова
            cbActionOk:null, // Сбрасывае функцию обратного вызова - успешного выполнения
            cbActionErr:null, // Сбрасывае функцию обратного вызова - с ошибкой
        };

        return this;
    }

    /**
     * Асинхронный запрос на сервер
     * @param sUrl - Адрес
     * @param data - Данные
     */
    public fSend(sUrl:string, data:{[key:string]:any}){

        if(!sUrl){
            console.error('==ERROR>', 'URL запроса не определен!');
            return false;
        }

        // Создаем локальную копию req для возможности множественных асинхронных запросов
        const reqQuery = this.req;

        // Создаем соединение
        let vAxios = this.fCreateConnection();

        let promiseAxios = vAxios.post(sUrl, data).then((respAxios) => {

            let resp:ResponseI = respAxios.data;

            if(resp.ok){
                this.cbSuccess(reqQuery, resp.data);
            } else {
                this.cbError(reqQuery, resp.errors);
            }
        }).catch((e) => {
            console.error(sUrl,' : ',e);
            let errors = {};

            // Проверяем 500 и другие ошибки, на структурированный ответ
            if(e && e.response && e.response.data){
                errors = e.response.data.errors;
            }
            this.cbError(reqQuery, errors);
        });

        return promiseAxios;
    };

    /**
     * Синхронный запрос на сервер
     * @param sUrl - URL запроса
     * @param data - Данные
     */
    public async faSend(sUrl:string, data:{[key:string]:any}){

        if(!sUrl){
            console.error('==ERROR>', 'URL запроса не определен!');
            return false;
        }

        const reqQuery = this.req;

        // Создаем соединение
        let vAxios = this.fCreateConnection();

        try{
            let respAxios = await vAxios.post(sUrl, data);

            let resp:ResponseI = respAxios.data;
            if(resp.ok){
                await this.cbSuccess(reqQuery, resp.data);
            } else {
                await this.cbError(reqQuery, resp.errors);
            }


        } catch(e){
            console.error(sUrl,' : ',e);
            let errors = {};

            // Проверяем 500 и другие ошибки, на структурированный ответ
            if(e && e.response && e.response.data){
                errors = e.response.data.errors;
            }
            
            this.cbError(reqQuery, errors);
        }

    };


    /**
     * Создать соединение
     */
    private fCreateConnection():AxiosInstance{
        let vAxios = null;
        if(this.conf){
            vAxios = axios.create(this.conf);
        } else {
            console.warn('==WARNING>', 'Отсутствует конфигурация соединения!');
            vAxios = axios.create({
                timeout: 30000,
            });
        }

        return vAxios;
    }


};