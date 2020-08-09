import * as conf from '../src/Config/mainConfig';
export { conf };
import { ConfI } from '../src/Config/mainConfigI';
export interface PageConfI extends ConfI {
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
