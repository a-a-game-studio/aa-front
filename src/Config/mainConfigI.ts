
export interface ConfI{
    page?:any;
    api?:any;
    common:{
        api:string; // api URL
        host:string; // Базовый URL
        login:string; // Редирект на логин 
    }
}
