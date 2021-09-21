// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// ajax套件
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
// loading套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// 驗證套件
import { extend, ValidationProvider, ValidationObserver, localize, configure } from 'vee-validate';
import { required, email} from 'vee-validate/dist/rules';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

// 自定義套件
import App from './App';
import router from './router';
import currency from './filter/currency'; // filter
import timestampfilter from './filter/timestamp';
import './bus'; // event bus

// 驗證email & required給予客製化訊息 & 手機驗證
extend('email' ,email);
extend('required',{
  ...required,
  message:'此欄為必填',
});
extend('mobile', {
  message: '{_field_}格式有誤',
  validate: value =>{
    const reg = /^09[0-9]{8}$/;
    return reg.test(value);
  },
});
// 匯入規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
})
// 驗證中文化
localize('zh_TW',zhTW);

// 阻止啟動生產訊息
Vue.config.productionTip = false

// 啟動匯入的元件
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.filter('currency', currency);
Vue.filter('timestamp', timestampfilter);

// 替代用於伺服器端驗證的偽類
configure({
  classes:{
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  /* global $ */
  if(to.meta.requiresAuth){
    console.log('此頁面需驗證');
    const url =  `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(url).then((response) =>{
      if(response.data.success){
        next();
      }else{
        next({
          path: '/login',
        });
      };
    });
  }else{
    next();
  }
})

