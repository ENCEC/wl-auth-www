import CryptoJS from 'crypto-js'

export function transformPaginationData(data) {
  return {
    pageSize: data.pageSize,
    pageNo: data.pageNum,
    totalCount: data.total,
    totalPage: data.pages,
    data: data.list
  }
}

export function emptyPaginationData() {
  return {
    pageSize: 20,
    pageNo: 1,
    totalCount: 0,
    totalPage: 0,
    data: []
  }
}

export function paginationDataHandler(component, res) {
  if (res.code === 0) {
    return transformPaginationData(res.data)
  } else {
    component.$message.error(res.msg)
    return emptyPaginationData()
  }
}

export function getInputCursorPosition(input) {
  let cursurPosition = -1;
  if (input.selectionStart) {
    cursurPosition = input.selectionStart;
  } else {
    var range = document.selection.createRange();
    range.moveStart('character', -input.value.length);
    cursurPosition = range.text.length;
  }
  return cursurPosition
}
// ase128加密
export function aesEncrypt(content) {
  const key = 'c1953a7wPB234x6l'// 秘钥
  const keyHex = key ? CryptoJS.enc.Utf8.parse(key) : CryptoJS.enc.Utf8.parse('D034FAF5309799E5')
  const message = typeof content === 'string' ? content : JSON.stringify(content)
  const srcs = CryptoJS.enc.Utf8.parse(message);
  const encrypted = CryptoJS.AES.encrypt(srcs, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
