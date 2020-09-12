import * as conf from './config/MainConfig';
export { conf };
export interface PageConfI {
    api: APIURL;
}
/**
 * URL API для страницы
 */
declare class APIURL {
    index: string;
    login: string;
    register: string;
    logout: string;
}
export declare const api: APIURL;
