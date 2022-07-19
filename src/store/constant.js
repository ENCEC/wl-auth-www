export const TASK_TYPE = {
  custom: '自定义',
  schedule: '定时',
  error: '错误'
}

export const TASK_STATUS = {
  '100': '未开始',
  '110': '进行中',
  '130': '成功',
  '80': '失败',
  '90': '取消'
}

export const DS_FORMAT = {
  'yyyyMMdd': 'yyyyMMdd',
  'yyyyMM': 'yyyyMM',
  'yyyy': 'yyyy',
  'yyyyMMddHH': 'yyyyMMddHH',
  'yyyyMMddHHmm': 'yyyyMMddHHmm'
}

export function getOptions(key) {
  const result = []
  for (const k in exports[key]) {
    result.push({ text: exports[key][k], value: k })
  }
  return result
}
