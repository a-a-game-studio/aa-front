import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { mIsClient } from '../Helpers/ContextH';
import { WebSocket } from 'ws';

/**
 * Интерфейс ответа сервера
 */
export interface ResponseI {
    ok: boolean; // статус OK
    e: boolean; // статус ошибки
    n?: number; // номер запроса
    data: { [key: string]: any };
    errors: { [key: string]: string };
    warning: { [key: string]: string };
    notice: { [key: string]: string };
}

/**
 * Контекст запроса
 */
interface RequestI {
    cbAction?: Function; // Сбрасывае функцию обратного вызова
    cbActionOk?: Function; // Сбрасывае функцию обратного вызова - успешного выполнения
    cbActionErr?: Function; // Сбрасывае функцию обратного вызова - выполнения с ошибкой
}

// Конфиг для веб сокетов
interface ConfigWsI {
    baseURL: string;
}

/** Система запросов к серверу */
export class QuerySys {
    private req: RequestI; // Запрос

    private conf: AxiosRequestConfig; // Конфиг http

    private confWs: AxiosRequestConfig; // Конфиг WS

    private bWsConnect = false; // Соединение  WS установленно

    private bWsConnectProcess = false; // Начало установки соединения

    private ixWsQueue: Record<number,any> = {}; // Очередь WS
    private ixWsQueueDel: Record<number, boolean> = {}; // Очередь WS на удаление контекста

    private incQueueCurr = 0; // Текущая позиция в очереди WS

    private incQueueMax = 0; // Последняя позиция в очереди WS

    private webSocket: WebSocket; // Сокеты WS

    private vWsTick: any = null; // TICK WS - отправляющий из очереди запросы

    private wskey: string = null; // Ключ для операции по сокету

    /** init */
    constructor() {
        this.req = {}; // Запрос
    }

    /** Проверка соединения с web сокетом */
    public ifWsConnect(): boolean {
        return this.bWsConnect;
    }

    /**
     * Успешное завершение запроса
     * @param req // Запрос
     * @param aData //
     */
    public cbSuccess(req: RequestI, resp: ResponseI, aData: any) {
        // Если функция обратного вызова указана - успешного выполнения
        if (req.cbActionOk) {
            req.cbActionOk(aData, resp);
        }

        // Если функция обратного вызова указана
        if (req.cbAction) {
            req.cbAction(true, aData, resp);
        }
    }

    /**
     * Ответ с ошибкой
     */
    public cbError(req: RequestI, resp: ResponseI, errors: any) {
        if (mIsClient()) {
            console.error('==>cbError:', errors);
        }

        // Если функция обратного вызова указана с ошибкой указана
        if (req.cbActionErr) {
            req.cbActionErr(errors, resp);
        }

        // Если функция обратного вызова указана
        if (req.cbAction) {
            req.cbAction(false, errors, resp);
        }
    }

    /**
     * Функция обратного вызова после выполнения запроса
     * function(ok:boolean, data:any)
     */
    public fAction(cbAction: Function) {
        this.req.cbAction = cbAction;
    }

    /**
     * Функция обратного вызова после успешного выполнения запроса
     * function(data:any)
     */
    public fActionOk(cbActionOk: Function) {
        this.req.cbActionOk = cbActionOk;
    }

    /**
     * Функция обратного вызова после успешного выполнения запроса
     */
    public fActionErr(cbActionErr: Function) {
        this.req.cbActionErr = cbActionErr;
    }

    /**
     * Инициализация конфигурации http
     */
    public fConfig(conf: AxiosRequestConfig) {
        this.conf = conf;
    }

    /**
     * Инициализация конфигурации WebSocket
     */
    public fConfigWs(conf: { baseURL: string }) {
        this.confWs = conf;
    }

    /**
     * Инициализация запроса
     */
    public fInit() {
        this.req = {
            cbAction: null, // Сбрасывае функцию обратного вызова
            cbActionOk: null, // Сбрасывае функцию обратного вызова - успешного выполнения
            cbActionErr: null, // Сбрасывае функцию обратного вызова - с ошибкой
        };

        return this;
    }

    /**
     * Асинхронный запрос на сервер
     * @param sUrl - Адрес
     * @param data - Данные
     */
    public fSend(sUrl: string, data: { [key: string]: any }) {
        if (this.conf) {
            this.fSendAxios(sUrl, data);
        } else if (this.confWs) {
            this.fSendWebSocket(sUrl, data);
        } else {
            if (mIsClient()) {
                console.error('Конфигурация не указана');
            }
        }
    }

    /**
     * Синхронный запрос на сервер
     * @param sUrl - URL запроса
     * @param data - Данные
     */
    public async faSend(sUrl: string, data: { [key: string]: any }) {
        let vResp = null;
        if (this.conf) {
            vResp = await this.faSendAxios(sUrl, data);
        } else if (this.confWs) {
            vResp = await this.fSendWebSocket(sUrl, data);
        } else {
            if (mIsClient()) {
                console.error('Конфигурация не указана');
            }
        }

        return vResp;
    }

    // =================================================
    // SEND AXIOS
    // =================================================

    /**
     * Асинхронный запрос на сервер
     * @param sUrl - Адрес
     * @param data - Данные
     */
    public fSendAxios(sUrl: string, data: { [key: string]: any }) {
        if (!sUrl && mIsClient()) {
            console.error('==ERROR>', 'URL запроса не определен!');
            return false;
        }

        // Создаем локальную копию req для возможности множественных асинхронных запросов
        const reqQuery = this.req;

        // Создаем соединение
        const vAxios = this.fCreateConnectionAxios();

        const promiseAxios = vAxios
            .post(sUrl, data)
            .then((respAxios) => {
                const resp: ResponseI = respAxios.data;

                if (resp.ok) {
                    this.cbSuccess(reqQuery, resp, resp.data);
                } else {
                    this.cbError(reqQuery, resp, resp.errors);
                }
            })
            .catch((e) => {
                if (mIsClient()) {
                    console.error(sUrl, ' : ', e);
                }

                let errors = {
                    request_failed: 'Ошибка запроса на сервер',
                };

                // Проверяем 500 и другие ошибки, на структурированный ответ
                if (e && e.response && e.response.data) {
                    errors = e.response.data.errors;
                }
                this.cbError(reqQuery, e.response?.data, errors);
            });

        return promiseAxios;
    }

    /**
     * Синхронный запрос на сервер
     * @param sUrl - URL запроса
     * @param data - Данные
     */
    public async faSendAxios(sUrl: string, data: { [key: string]: any }) {
        if (!sUrl && mIsClient()) {
            console.error('==ERROR>', 'URL запроса не определен!');
            return false;
        }

        const reqQuery = this.req;

        // Создаем соединение
        const vAxios = this.fCreateConnectionAxios();

        try {
            const respAxios = await vAxios.post(sUrl, data);

            const resp: ResponseI = respAxios.data;
            if (resp.ok) {
                await this.cbSuccess(reqQuery, resp, resp.data);
            } else {
                await this.cbError(reqQuery, resp, resp.errors);
            }
        } catch (e) {
            if (mIsClient()) {
                console.error(sUrl, ' : ', e);
            }

            let errors = {
                request_failed: 'Ошибка запроса на сервер',
            };

            // Проверяем 500 и другие ошибки, на структурированный ответ
            if (e && e.response && e.response.data) {
                errors = e.response.data.errors;
            }

            this.cbError(reqQuery, e.response?.data, errors);
        }
    }

    // =================================================
    // SEND WEB SOCKET
    // =================================================

    /**
     * Асинхронный запрос на сервер
     * @param sUrl - Адрес
     * @param vData - Данные
     */
    public async fSendWebSocket(sUrl: string, vData: { [key: string]: any }) {
        if (!sUrl && mIsClient()) {
            console.error('==ERROR>', 'URL запроса не определен!');
            return false;
        }

        // Создаем локальную копию req для возможности множественных асинхронных запросов
        const reqQuery = this.req;
        const reqParam = {
            req:reqQuery,
            action: sUrl,
            data: vData,
        };

        if (!this.bWsConnect && !this.webSocket && !this.bWsConnectProcess) {
            this.fCreateConnectionWS('/');
        }

        this.ixWsQueue[this.incQueueMax++] = reqParam;

        return this.webSocket;
    }

    // =================================================
    // CONNEXTION
    // =================================================

    /**
     * Создать соединение по сокету
     */
    private fCreateConnectionWS(sUrl: string): void {
        const reqQuery = this.req;

        if(this.bWsConnectProcess){
            console.log(console.log('Соединение в процессе установленовки'))
            return;
        }

        let vWebSocket: WebSocket = null;
        this.bWsConnectProcess = true;

        
        this.webSocket = new WebSocket(this.confWs.baseURL + sUrl);
        vWebSocket = this.webSocket;

        vWebSocket.onclose = (event: any) => {
            if (event.wasClean) {
                console.warn(
                    `[websocket.close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
                );
            } else {
                // например, сервер убил процесс или сеть недоступна
                // обычно в этом случае event.code 1006
                console.warn('[websocket.close] Соединение прервано');

                setTimeout(() => {
                    this.fCreateConnectionWS(sUrl);
                }, 5000);
                console.log('Повторное переподключение(5s)...');
            }

            this.bWsConnect = false;
            this.bWsConnectProcess = false;
            this.webSocket = null;

            clearInterval(this.vWsTick);

            // Удаление старого контекста
            const akWsContextDel = Object.keys(this.ixWsQueueDel);
            this.ixWsQueueDel = {}
            for (let i = 0; i < akWsContextDel.length; i++) {
                const kWsContextDel = Number(akWsContextDel[i]);
                delete this.ixWsQueue[kWsContextDel];
            }
        };

        vWebSocket.onerror = (e: any) => {
            console.warn('[websocket.event] Ошибка', e);

            if (mIsClient()) {
                console.error(sUrl, ' : ', e);
            }

            let errors = {
                request_failed: 'Ошибка запроса на сервер',
            };

            

            // Проверяем 500 и другие ошибки, на структурированный ответ
            let req = {};
            if (e && e.response && e.response.data) {
                errors = e.response.data.errors;
                req = this.ixWsQueue[e.response.data.n]

                // Очищаем контекст
                delete this.ixWsQueue[e.response.data.n];
                delete this.ixWsQueueDel[e.response.data.n];
            }
            this.cbError(req, e.response?.data, errors);
        };

        vWebSocket.onmessage = (event: any) => {
            const resp: ResponseI = JSON.parse(event.data);

            const req = this.ixWsQueue[resp.n];

            if (resp.ok) {
                this.cbSuccess(req, resp, resp.data);
            } else {
                this.cbError(req, resp, resp.errors);
            }

            // Плановое удаление контекста
            delete this.ixWsQueue[resp.n];
            delete this.ixWsQueueDel[resp.n];

            if (!this.bWsConnect) {
                this.wskey = resp.data.msg;

                this.vWsTick = setInterval(() => {     
                    if (this.bWsConnect && this.webSocket) {
                        if(this.incQueueMax > this.incQueueCurr){
                            const incQueue = this.incQueueCurr++;
                            const vMsg = this.ixWsQueue[incQueue];

                            if (vMsg) {
                                vMsg.n = incQueue; // номер запроса по нему в ответе берется контекст
                                vMsg.wskey = this.wskey;
                                this.webSocket.send(JSON.stringify(vMsg));

                                // Помечаем на удаление
                                this.ixWsQueueDel[incQueue] = true;
                            } else {
                                delete this.ixWsQueue[incQueue];
                            }
                        }
                    }
                }, 1);
                this.bWsConnect = true;

            }
        };

        vWebSocket.onopen = (e: any) => {
            console.log('Соединение открыто');
        };

    }

    /**
     * Создать соединение AXIOS
     */
    private fCreateConnectionAxios(): AxiosInstance {
        let vAxios = null;
        if (this.conf) {
            vAxios = axios.create(this.conf);
        } else {
            console.warn('==WARNING>', 'Отсутствует конфигурация соединения!');
            vAxios = axios.create({
                timeout: 30000,
            });
        }

        return vAxios;
    }
}
