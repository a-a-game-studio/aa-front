
import { localStorage, store } from '../../src/System/MockTestEnv'
import { conf } from '../../src/Config/mainConfig'
import { ConfI } from '../../src/Config/mainConfigI'


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
}; const apiurl = new APIURL();

// ======================

conf.api = apiurl;
export const pageConf:PageConfI = conf;

