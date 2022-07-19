
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
