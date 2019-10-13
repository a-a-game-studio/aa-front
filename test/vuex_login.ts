
import {VuexSys} from '../src/System/VuexSys'

export const vuexSys = new VuexSys();
export const store = vuexSys.getRootStore();

vuexSys.registerModuleCmd({
    login:false,
});

vuexSys.registerModuleOne({
    user:null,
});

vuexSys.registerModuleList({
});

vuexSys.registerModuleStatus({
    user_id:0,
    token:null,
});