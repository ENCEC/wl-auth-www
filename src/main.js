import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import * as ElementUi from 'ec-light-vue'

import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/styles/common.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import './dictionary'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import { getDict } from '@/api/demo'
import dictionary from './utils/dictionary'
Vue.prototype.$dict = dictionary;

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUi, {
  config: {
    uploader: {
      ctx: '/ec-demo',
      urls: {
        uploadPrefix: '/cloud/filesystem/uploadFile/',
        downloadPrefix: '/cloud/filesystem/downloadFile/',
        deletePrefix: '/cloud/filesystem/deleteFile/',
        getStrategyPrefix: '/cloud/filesystem/getStrategy/',
        getFileInfosByStrategyId: '/cloud/filesystem/getFileInfos/',
        getSnapshotUploadPrefix: '/cloud/filesystem/uploadSnapshot/'
      }
    }
  },
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
  loadPermitionMethod,
  getDictionary(keyList) {
    return new Promise((resolve, reject) => {
      getDict(keyList).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/** 模拟获取权限 */
async function loadPermitionMethod(path) {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = {
        noPermits: [
          '/hello/world'
        ],
        permits: [
          '/hello/world2'
        ]
      };
      if ((path || '').indexOf('permit-test') >= 0) {
        result.redirectUrl = '/examples/no-permit';
      }
      resolve(result);
    }, 500);
  });
}

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)

})
