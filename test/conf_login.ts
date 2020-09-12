
import * as conf from './config/MainConfig'; export { conf };



// Переопределяем интерфейс конфигурации
export interface PageConfI{
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



