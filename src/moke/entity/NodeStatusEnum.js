const NodeStatusEnum= {
  '1': {
    name: '正常',
    color: {
      type: "radial",
      x: 0.5,
      y: 0.5,
      r: 0.5,
      colorStops: [
        {
          offset: 0,
          color: "#3dd67a", // 0% 处的颜色
        },
        {
          offset: 0.7,
          color: "#3dd67a", // 0% 处的颜色
        },
        {
          offset: 1,
          color: "#95dcb2", // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
  },
  '2': {
    'name': '异常',
    color: {
      type: "radial",
      x: 0.5,
      y: 0.5,
      r: 0.5,
      colorStops: [
        {
          offset: 0,
          color: '#ff0000', // 0% 处的颜色
        },
        {
          offset: 0.7,
          color: "#ff0000", // 0% 处的颜色
        },
        {
          offset: 1,
          color: "#ff000090", // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
  },
  '3': {
    'name': '疑似异常',
    color: {
      type: "radial",
      x: 0.5,
      y: 0.5,
      r: 0.5,
      colorStops: [
        {
          offset: 0,
          color: '#ffba0c', // 0% 处的颜色
        },
        {
          offset: 0.7,
          color: "#ffba0c", // 0% 处的颜色
        },
        {
          offset: 1,
          color: "#ffba0c90", // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
  },

  getStatusName(status) {
    if (!NodeStatusEnum[String(status)]) {
      return '未知'
    }
    return NodeStatusEnum[String(status)].name
  },
  getStatusColor(status) {
    if (!NodeStatusEnum[String(status)]) {
      return '未知'
    }
    return NodeStatusEnum[String(status)].color
  },

  getCategories(){
    return [
      NodeStatusEnum['1'],
      NodeStatusEnum['2'],
      NodeStatusEnum['3'],
    ]
  }
}

export default NodeStatusEnum
