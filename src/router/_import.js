module.exports = file => {
  try {
    return require('@/views/' + file + '.vue').default
  } catch (err) {
    console.error(err)// 当组件不存在时，不抛出异常阻塞网站
  }
} // vue-loader at least v13.0.0+
// module.exports = file => () => import('@/views/' + file + '.vue')
