import './ModelGraph';
import './Uploader';
import './DaoServiceClient';
import './TaskMessageNotify';
import daoServiceClientConfig from './DaoServiceClientConfig';
import service from '../utils/request';

/**
 * @namespace ds
 */
const ds = window.ds.noConflict();
const {client, taskMessenger, createUploader} = ds;

// var client = createDaoServiceClient();

function getAutoApiUrl(client, req) {
  return client.serverUrl + client.projectId + '/' + 'auto-api/' +
    req.mainModelName + '/' + req.action + '/' + client.serviceCode + '/' +
    req.tag;
}

function getCustomApiUrl(client, req) {
  return `${client.serverUrl}${client.projectKey}/custom-api/${req.sqlKey}/${client.serviceCode}/${req.sqlKey}`;
}

/**
 * 自动生成标签
 *
 * @param {Object} req 请求参数对象
 * @return {string} tag
 */
function autoTagging(req) {
  return `DS_${req.projectKey}_${req.modelName}_${req.action}`;
}

function base64Encode(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

ds.types.DaoServiceClient.prototype.execute = function(requestBody = {}) {
  if (!requestBody.projectKey) {
    requestBody.projectKey = this.projectKey;
  }
  if (!requestBody.tag) {
    requestBody.tag = autoTagging({
      projectKey: requestBody.projectKey,
      modelName: requestBody.mainModelName,
      action: requestBody.action
    });
  }
  const url = getAutoApiUrl(this, requestBody);
  // console.log(`\r\nPOST ${url}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(requestBody)}`);

  if (!client.restfulPlainCodeArguments) {
    requestBody = base64Encode(JSON.stringify(requestBody));
  }

  return service.post(url, requestBody, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'content-type': 'application/json;charset=utf-8',
    }
  }).then(response => {
    if (response.debugInfo && console.log) {
      console.log(`%c数据服务请求 "${requestBody.tag}" 执行的SQL有: `,
          'color: red; font-style: italic');
      response.debugInfo.forEach(line => {
        console.log(line);
      });
    }
    return response;
  });
};

ds.types.DaoServiceClient.prototype.executeCustom = function(requestBody = {}) {
  if (!requestBody.projectKey) {
    requestBody.projectKey = this.projectKey;
  }
  const url = getCustomApiUrl(this, requestBody);
  return service.post(url, requestBody, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    }
  })
  .then(response => {
    if (response['debugInfo'] && console.log) {
      response['debugInfo'].forEach(line => {
        console.log(`%c数据服务请求 "${requestBody.tag}" 执行的SQL有: ${line}`,
            'color: red; font-style: italic');
      });
    }
    if (requestBody.action === 'get') {
      if (response.data.length > 1) {
        throw new Error('自定义查询单条记录，实际结果有多条');
      }
      response.data = response.data[0];
    }
    return response;
  });
};

ds.types.DaoServiceClient.prototype.promiseResolved = response => Promise.resolve(response);

/**
 * 自动构建 client
 */
(function() {
  if (daoServiceClientConfig.hasOwnProperty('_default')) {
    ds.client.config(daoServiceClientConfig['_default']);
  }
  for (const clientName in daoServiceClientConfig) {
    if (daoServiceClientConfig.hasOwnProperty(clientName) && clientName !== '_default') {
      ds[clientName] = new ds.types.DaoServiceClient();
      ds[clientName].config(daoServiceClientConfig[clientName]);
    }
  }
}());

const SelectCollectCommand = ds.types.SelectCollectCommand;

/**
 * 自动填充表格参数到查询模式
 *
 * @param selectPattern {SelectCollectCommand} 执行模式
 * @param sorter 排序参数
 * @param pagination
 * @param [filterArgs] 查询参数 <b>暂未实现</b>
 * @param [sorter.order]
 * @param [sorter.field]
 */
SelectCollectCommand.fillConditionFromAntdTable = function({ sorter, pagination } = {}) {
  let resultExpression;
  const me = this;
  if (sorter && sorter.field) {
    let order = sorter.field;
    if (sorter.order === 'descend') {
      order += ' DESC';
    }
    me.orders = [order];
  }
  if (pagination) {
    resultExpression = me.paging(pagination.current, pagination.pageSize);
  }
  return resultExpression;
};

// 任务提示消息示例
function onTaskMessage(task) {
  var title = (task.taskType.toUpperCase() === 'IMPORT' ? '导入' : '导出') + '消息提示';
  console.info(title);
}

taskMessenger.config({
  timerInterval: 10000 * 1000,
  onTaskMessage: onTaskMessage
});

function onFileUploadOk(data) {
  console.info(data);
}

function onFileUploadFail(data) {
  console.info(data);
}

function startCallback(data) {
  console.info(data);
}

function progressCallback(data) {
  console.info(data);
}

// 创建新fileUploader
var fileUploader = createUploader();

fileUploader.setOption({
  action: `${window.backend_ctx}/daoService/excelImport/test`, // 上传接口
  filter: '', // 文件类型过滤器
  maxsize: 10, // 文件上传大小限制，单位：M
  params: { test: 'test', id: 123 }, // 请求参数
  startCallback: startCallback, // 开始上传的回调函数
  progressCallback: progressCallback, // 上传进度回调函数
  successCallback: onFileUploadOk, // 上传成功回调函数
  errorCallback: onFileUploadFail // 上传错误的回调函数
});

/**
 * 上传客户端
 */
export const uploader = fileUploader;

/**
 * 数据服务客户端实例
 * @type ds.DaoServiceClient
 */
export const dsc = ds.client;

/**
 * 参数名与字段名一致时的简写
 * @type {SameWithFieldNamedParameter} 与字段名相同的具名参数
 * @private
 */
export const ___ = dsc.___;

export default ds;
