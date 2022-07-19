import Vue from 'vue'
import { TASK_TYPE, TASK_STATUS } from './store/constant'

const filterList = { TASK_TYPE, TASK_STATUS }

for (const key in filterList) {
  Vue.filter(key, (value) => {
    if (!value) return ''
    value = value.toString()
    return filterList[key][value] || ''
  })
}
