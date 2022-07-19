import { getExpressionFunction, getDwTableList, getDwTableRelationList } from '@/api/cleaning'
import md5 from 'js-md5'

const state = {
  functionList: [],
  dwTableList: {},
  dwTableRelationList: [],
  dwTableMap: {},
  dwTableNameMap: {},
  dwTableRelationMap: {},
  dwTableRelationNameMap: {},
  domainInfo: {}
}

const mutations = {
  SET_FUNCTION_LIST: (state, payload) => {
    state.functionList = payload
  },
  SET_DW_TABLE_LIST: (state, payload) => {
    state.dwTableList = payload
    state.dwTableList.forEach(dwTable => {
      if (dwTable['fieldsJson']) dwTable['fields'] = JSON.parse(dwTable['fieldsJson'])
      state.dwTableMap[dwTable.id] = dwTable
      state.dwTableNameMap[dwTable.tableNameCn] = dwTable
    })
  },
  SET_DW_TABLE_RELATION_LIST: (state, payload) => {
    state.dwTableRelationList = payload
    state.dwTableRelationList.forEach(dwTableRelation => {
      if (!state.dwTableRelationMap[dwTableRelation.sourceModelId]) state.dwTableRelationMap[dwTableRelation.sourceModelId] = []
      state.dwTableRelationMap[dwTableRelation.sourceModelId].push(dwTableRelation)
      state.dwTableRelationNameMap[dwTableRelation.name] = dwTableRelation
    })
  }
}

const actions = {
  getExpressionFunction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getExpressionFunction(payload).then(response => {
        commit('SET_FUNCTION_LIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDwTableList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getDwTableList(payload).then(response => {
        commit('SET_DW_TABLE_LIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDwTableRelationList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getDwTableRelationList(payload).then(response => {
        commit('SET_DW_TABLE_RELATION_LIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const getters = {
  getDomainTreeNode: (state) => (modelId, root) => {
    return new Promise((resolve) => {
      const data = []
      if (root) {
        data.push({
          id: md5(modelId + '_' + state.dwTableMap[modelId].tableNameCn),
          name: state.dwTableMap[modelId].tableNameCn,
          modelId: modelId
        })
        resolve(data)
        return
      }
      const fields = state.dwTableMap[modelId].fields
      fields.forEach(t => {
        data.push({
          id: md5(modelId + '_f_' + t.fieldCn),
          leaf: true,
          name: t.fieldCn
        })
      })

      const relations = state.dwTableRelationMap[modelId]
      if (relations) {
        relations.forEach(relation => {
          data.push({
            id: md5(relation.id + '_' + relation.name),
            leaf: false,
            name: relation.name,
            modelId: relation.targetModelId
          })
        })
      }
      resolve(data)
    })
  },
  getFieldNodeId: (state) => (field) => {
    const ary = field.split('.')
    let dwTable;
    if (ary.length === 2) {
      dwTable = state.dwTableNameMap[ary[0]]
    } else {
      const dwTableRelation = state.dwTableRelationNameMap[ary[ary.length - 2]]
      dwTable = state.dwTableMap[dwTableRelation['targetModelId']]
    }
    return md5(dwTable['id'] + '_f_' + ary[ary.length - 1])
  },
  getDomainInfo: (state) => (modelId) => {
    if (state.domainInfo[modelId]) return state.domainInfo[modelId]
    if (!state.dwTableMap[modelId]) return []
    const list = []
    iteratioFieldInfo(state, list, state.dwTableMap[modelId].tableNameCn, modelId)

    state.domainInfo[modelId] = list
    return state.domainInfo[modelId]
  }
}

const iteratioFieldInfo = (state, list, prefix, modelId) => {
  const model = state.dwTableMap[modelId]
  model.fields.forEach(field => {
    list.push(prefix + '.' + field.fieldCn)
  })

  const relations = state.dwTableRelationMap[modelId]
  if (relations) {
    relations.forEach(relation => {
      iteratioFieldInfo(state, list, prefix + '.' + state.dwTableMap[relation.targetModelId].tableNameCn, relation.targetModelId)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
