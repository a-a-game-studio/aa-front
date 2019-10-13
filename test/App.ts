import { Component, Vue } from 'vue-property-decorator';

import frm_login from './el/frm_login/frm_login.vue';
Vue.component('frm-login', frm_login)

@Component({
})
export default class App extends Vue {}