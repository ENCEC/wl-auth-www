<!--
 * @Author: Hongzf
 * @Date: 2022-08-18 10:05:34
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-19 16:07:25
 * @Description:
-->
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
    const { icon, title } = context.props
    // console.log('【 icon 】-36', icon)
    const vnodes = []
    // const iconUrl = require('@/assets/menu-icon/icon_staff.png')
    if (icon) {
      // vnodes.push(<svg-icon icon-class={icon2}/>)
      vnodes.push(<el-image
        class='icon'
        src={icon}
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
