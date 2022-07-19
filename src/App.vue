<template>
  <div id="app">
    <router-view />
<!--    <my-vue/>-->
  </div>
</template>

<script>
import MyVue from "@/views/myVue";
window.backend_ctx = 'http://localhost:8081/ec-demo/'
export default {
  name: 'App',
  components: {MyVue},
  created() {
    const config = {}
    this.$tabIndex.registerGlobal(config)

    this.$hotKey.registerGlobal({
      ctrl: true,
      shift: false,
      alt: true,
      key: 'd' // KeyCode键值
    }, () => {
      this.$message.success('触发全局快捷键事件')
    })
  }
}
</script>
<style>
.handsontable th, .handsontable td {
  font-size: 12px;
}
</style>
