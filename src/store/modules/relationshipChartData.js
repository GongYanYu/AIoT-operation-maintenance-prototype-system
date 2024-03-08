const state = {
  nodeList: [],
  edgeList: []
}

const actions = {
  updateNodeList({ state }, v) {
    state.nodeList=v||[]
  },
  updateEdgeList({ state }, v) {
    state.edgeList=v||[]
  },
}

export default {
  namespaced: true,
  state,
  actions
}
