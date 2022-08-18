<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 17:38:09
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-18 09:52:07
 * @Description:
-->
<!--<template>
  <div>
    <el-image
      v-if="icon"
      style="width: 15px; height: 15px"
      :src="require('@/assets/menu-icon/icon_staff.png')"
      fit="contain"
    />
    <span>{{ title }}</span>
  </div>
</template>-->
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    // console.log('【 context 】-23', context)
    const { icon, title } = context.props
    const vnodes = []
    const iconUrl = require('@/assets/menu-icon/icon_staff.png')
    const icon2 = 'user'
    if (icon) {
      // vnodes.push(<svg-icon icon-class={icon2}/>)
      vnodes.push(<el-image
        class='icon'
        src={iconUrl}
        fit='contain'
      />)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
<style lang="scss" scoped>
.icon{
  /* margin: 0 5px; */
  margin-right:5px;
  width: 16px;
  height: 16px;
  text-align: center;
  display: inline-block;
}
 .el-menu--collapse {
    .icon{
      /* margin: 0 5px; */
      margin-left:15px;
    }
}
</style>
