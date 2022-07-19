export default {
  _default: {
    serverUrl: 'http://localhost:8083/dao/',
    projectKey: 'abu_edi',
    serviceCode: 'QS',
    restfulPlainCodeArguments: true,
    excelImportConfig: {
      filter: 'csv,xls,xlsx', // 文件类型过滤器
      maxsize: 10, // 文件上传大小限制，单位：M
    },
  },
};
