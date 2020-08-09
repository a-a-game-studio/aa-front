
import * as conf from '../src/Config/mainConfig'; export { conf };
import { ConfI } from '../src/Config/mainConfigI'


// Переопределяем интерфейс конфигурации
export interface PageConfI extends ConfI{
    api:APIURL;
}

// ======================

/**
 * URL API для страницы
 */
class APIURL{
    index = '/login' // Данные получаемые по умолчанию
    login = '/login/login'; // Залогиниться
    register = '/login/register'; // Регистрация
    logout = '/login/logout'; // Разлогиниться
}; 

export const api = new APIURL();

// ======================



