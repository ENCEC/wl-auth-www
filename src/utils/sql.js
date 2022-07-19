import parser from 'js-sql-parser';

/**
 * 格式化查询字段
 * @param {String} selectItem 查询字段表达式
 */
export function parseSelect(selectItem) {
  try {
    const sql = 'select ' + selectItem + ' from t'
    const ast = parser.parse(sql)
    return {
      success: true,
      json: ast.value.selectItems.value[0]
    }
  } catch (err) {
    const msg = '【' + err.hash.text + '】附近有错误'
    return {
      success: false,
      msg: msg
    }
  }
}

/**
 * 格式化关联条件
 * @param {String} relation 连接关联条件
 */
export function parseRelation(relation) {
  try {
    const sql = 'select * from t1 join t2 on ' + relation
    const ast = parser.parse(sql)
    return {
      success: true,
      json: ast.value.selectItems.value[0]
    }
  } catch (err) {
    const msg = '【' + err.hash.text + '】附近有错误'
    return {
      success: false,
      msg: msg
    }
  }
}

/**
 * 格式化过滤条件
 * @param {String} filter 过滤条件表达式
 */
export function parseFilter(filter) {
  try {
    const sql = 'select * from t where ' + filter
    const ast = parser.parse(sql)
    return {
      success: true,
      json: ast.value.selectItems.value[0]
    }
  } catch (err) {
    const msg = '【' + err.hash.text + '】附近有错误'
    return {
      success: false,
      msg: msg
    }
  }
}

/**
 * 校验查询表达式
 * @param {String} value 校验值
 * @param {Function} validateCallback 校验回调
 */
export function validateSelectItem(startingModelIdList, value, validateCallback) {
  if (!value) {
    validateCallback()
    return
  }
  const result = parseSelect(value)
  if (result.success) validateCallback()
  else validateCallback(new Error(result.msg))
}

/**
 * 校验连接条件表达式
 * @param {String} value 校验值
 * @param {Function} validateCallback 校验回调
 */
export function validateRelation(startingModelIdList, value, validateCallback) {
  if (!value) {
    validateCallback()
    return
  }
  const result = parseRelation(value)
  if (result.success) validateCallback()
  else validateCallback(new Error(result.msg))
}

/**
 * 校验过滤表达式
 * @param {String} value 校验值
 * @param {Function} validateCallback 校验回调
 */
export function validateFilter(startingModelIdList, value, validateCallback) {
  if (!value) {
    validateCallback()
    return
  }
  const result = parseFilter(value)
  if (result.success) validateCallback()
  else validateCallback(new Error(result.msg))
}

