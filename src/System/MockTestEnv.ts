export var localStorage:any = {};
export var window:any = {};

export var store:any = {
    state:{
        cmd:{},
        one:{},
        list:{},
        tree:{},
        status:{},
        error:{},
    }
};

store.registerModule = (key:string, option:any) => {
    store.state[key] = option;
}

store.commit = (key:string, data:any) => {
    for(let k in store.state){
        let v = store.state[k];

        if(v[key]){
            v[key](data);
        }
    }
}