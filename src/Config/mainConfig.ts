
export interface ConfI{
    common:{
        baseURL:string; // Базовый URL
        loginURL:string; // Редирект на логин 
    }
}

export const conf:ConfI = {
    common:{
        baseURL:'//:core.ru',
        loginURL:'/login',
    }
}