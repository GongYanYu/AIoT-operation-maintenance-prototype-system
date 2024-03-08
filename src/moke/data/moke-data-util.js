const {v4} = require('uuid')

const SparkNodeList = [
  { id: '1', name: 'master-node-1', type: 'master', pId: '-1' },
  { id: '1001', name: 'worker-node-1', type: 'worker', pId: '1' },
  { id: '1002', name: 'worker-node-2', type: 'worker', pId: '1' },
  { id: '1003', name: 'worker-node-3', type: 'worker', pId: '1' },
  { id: '1004', name: 'worker-node-4', type: 'worker', pId: '1' },
  { id: '1005', name: 'worker-node-5', type: 'worker', pId: '1' },
  { id: '1006', name: 'worker-node-6', type: 'worker', pId: '1' },
  { id: '1007', name: 'worker-node-7', type: 'worker', pId: '1' },
  { id: '1008', name: 'worker-node-8', type: 'worker', pId: '1' },
  { id: '2', name: 'master-node-2', type: 'master', pId: '-1' },
  { id: '2001', name: 'worker-node-1', type: 'worker', pId: '2' },
  { id: '2002', name: 'worker-node-2', type: 'worker', pId: '2' },
  { id: '2003', name: 'worker-node-3', type: 'worker', pId: '2' },
  { id: '2004', name: 'worker-node-4', type: 'worker', pId: '2' },
  { id: '2005', name: 'worker-node-5', type: 'worker', pId: '2' },
  { id: '2006', name: 'worker-node-6', type: 'worker', pId: '2' },
  { id: '3', name: 'master-node-3', type: 'master', pId: '-1' },
  { id: '3001', name: 'worker-node-1', type: 'worker', pId: '3' },
  { id: '4', name: 'master-node-4', type: 'master', pId: '-1' },
  { id: '4001', name: 'worker-node-1', type: 'worker', pId: '4' },
  { id: '4002', name: 'worker-node-2', type: 'worker', pId: '4' },
  { id: '4003', name: 'worker-node-3', type: 'worker', pId: '4' },
  { id: '5', name: 'master-node-5', type: 'master', pId: '-1' },
  { id: '5001', name: 'worker-node-1', type: 'worker', pId: '5' },
  { id: '5002', name: 'worker-node-2', type: 'worker', pId: '5' },
  { id: '6', name: 'master-node-6', type: 'master', pId: '-1' },
  { id: '6001', name: 'worker-node-1', type: 'worker', pId: '6' },
  { id: '7', name: 'master-node-7', type: 'master', pId: '-1' },
  { id: '7001', name: 'worker-node-1', type: 'worker', pId: '7' },
  { id: '7002', name: 'worker-node-2', type: 'worker', pId: '7' },
  { id: '8', name: 'master-node-8', type: 'master', pId: '-1' },
  { id: '8001', name: 'worker-node-1', type: 'worker', pId: '8' },
  { id: '9', name: 'master-node-9', type: 'master', pId: '-1' },
  { id: '9001', name: 'worker-node-1', type: 'worker', pId: '9' },
  { id: '9002', name: 'worker-node-2', type: 'worker', pId: '9' },
  { id: '9003', name: 'worker-node-3', type: 'worker', pId: '9' },
  { id: '9004', name: 'worker-node-4', type: 'worker', pId: '9' },
  { id: '9005', name: 'worker-node-5', type: 'worker', pId: '9' }
]

const AIoTList = [
  { id: 'GA61511', name: 'GA61511', bigNodeId: '1' },
  { id: 'GA61512', name: 'GA61512', bigNodeId: '1' },
  { id: 'GA61513', name: 'GA61513', bigNodeId: '1' },
  { id: 'GA61514', name: 'GA61514', bigNodeId: '1' },
  { id: 'GA61510011', name: 'GA61510011', bigNodeId: '1001' },
  { id: 'GA61510021', name: 'GA61510021', bigNodeId: '1002' },
  { id: 'GA61510031', name: 'GA61510031', bigNodeId: '1003' },
  { id: 'GA61510032', name: 'GA61510032', bigNodeId: '1003' },
  { id: 'GA61510033', name: 'GA61510033', bigNodeId: '1003' },
  { id: 'GA61510041', name: 'GA61510041', bigNodeId: '1004' },
  { id: 'GA61510042', name: 'GA61510042', bigNodeId: '1004' },
  { id: 'GA61510051', name: 'GA61510051', bigNodeId: '1005' },
  { id: 'GA61510061', name: 'GA61510061', bigNodeId: '1006' },
  { id: 'GA61510071', name: 'GA61510071', bigNodeId: '1007' },
  { id: 'GA61510081', name: 'GA61510081', bigNodeId: '1008' },
  { id: 'GA61521', name: 'GA61521', bigNodeId: '2' },
  { id: 'GA61520011', name: 'GA61520011', bigNodeId: '2001' },
  { id: 'GA61520012', name: 'GA61520012', bigNodeId: '2001' },
  { id: 'GA61520013', name: 'GA61520013', bigNodeId: '2001' },
  { id: 'GA61520021', name: 'GA61520021', bigNodeId: '2002' },
  { id: 'GA61520022', name: 'GA61520022', bigNodeId: '2002' },
  { id: 'GA61520031', name: 'GA61520031', bigNodeId: '2003' },
  { id: 'GA61520032', name: 'GA61520032', bigNodeId: '2003' },
  { id: 'GA61520033', name: 'GA61520033', bigNodeId: '2003' },
  { id: 'GA61520041', name: 'GA61520041', bigNodeId: '2004' },
  { id: 'GA61520042', name: 'GA61520042', bigNodeId: '2004' },
  { id: 'GA61520043', name: 'GA61520043', bigNodeId: '2004' },
  { id: 'GA61520051', name: 'GA61520051', bigNodeId: '2005' },
  { id: 'GA61520061', name: 'GA61520061', bigNodeId: '2006' },
  { id: 'GA61531', name: 'GA61531', bigNodeId: '3' },
  { id: 'GA61532', name: 'GA61532', bigNodeId: '3' },
  { id: 'GA61530011', name: 'GA61530011', bigNodeId: '3001' },
  { id: 'GA61530012', name: 'GA61530012', bigNodeId: '3001' },
  { id: 'GA61530013', name: 'GA61530013', bigNodeId: '3001' },
  { id: 'GA61530014', name: 'GA61530014', bigNodeId: '3001' },
  { id: 'GA61541', name: 'GA61541', bigNodeId: '4' },
  { id: 'GA61540011', name: 'GA61540011', bigNodeId: '4001' },
  { id: 'GA61540012', name: 'GA61540012', bigNodeId: '4001' },
  { id: 'GA61540021', name: 'GA61540021', bigNodeId: '4002' },
  { id: 'GA61540022', name: 'GA61540022', bigNodeId: '4002' },
  { id: 'GA61540031', name: 'GA61540031', bigNodeId: '4003' },
  { id: 'GA61551', name: 'GA61551', bigNodeId: '5' },
  { id: 'GA61552', name: 'GA61552', bigNodeId: '5' },
  { id: 'GA61550011', name: 'GA61550011', bigNodeId: '5001' },
  { id: 'GA61550021', name: 'GA61550021', bigNodeId: '5002' },
  { id: 'GA61561', name: 'GA61561', bigNodeId: '6' },
  { id: 'GA61560011', name: 'GA61560011', bigNodeId: '6001' },
  { id: 'GA61560012', name: 'GA61560012', bigNodeId: '6001' },
  { id: 'GA61560013', name: 'GA61560013', bigNodeId: '6001' },
  { id: 'GA61571', name: 'GA61571', bigNodeId: '7' },
  { id: 'GA61572', name: 'GA61572', bigNodeId: '7' },
  { id: 'GA61570011', name: 'GA61570011', bigNodeId: '7001' },
  { id: 'GA61570021', name: 'GA61570021', bigNodeId: '7002' },
  { id: 'GA61570022', name: 'GA61570022', bigNodeId: '7002' },
  { id: 'GA61570023', name: 'GA61570023', bigNodeId: '7002' },
  { id: 'GA61581', name: 'GA61581', bigNodeId: '8' },
  { id: 'GA61582', name: 'GA61582', bigNodeId: '8' },
  { id: 'GA61583', name: 'GA61583', bigNodeId: '8' },
  { id: 'GA61580011', name: 'GA61580011', bigNodeId: '8001' },
  { id: 'GA61580012', name: 'GA61580012', bigNodeId: '8001' },
  { id: 'GA61580013', name: 'GA61580013', bigNodeId: '8001' },
  { id: 'GA61580014', name: 'GA61580014', bigNodeId: '8001' },
  { id: 'GA61591', name: 'GA61591', bigNodeId: '9' },
  { id: 'GA61592', name: 'GA61592', bigNodeId: '9' },
  { id: 'GA61590011', name: 'GA61590011', bigNodeId: '9001' },
  { id: 'GA61590012', name: 'GA61590012', bigNodeId: '9001' },
  { id: 'GA61590021', name: 'GA61590021', bigNodeId: '9002' },
  { id: 'GA61590031', name: 'GA61590031', bigNodeId: '9003' },
  { id: 'GA61590041', name: 'GA61590041', bigNodeId: '9004' },
  { id: 'GA61590042', name: 'GA61590042', bigNodeId: '9004' },
  { id: 'GA61590043', name: 'GA61590043', bigNodeId: '9004' },
  { id: 'GA61590044', name: 'GA61590044', bigNodeId: '9004' },
  { id: 'GA61590051', name: 'GA61590051', bigNodeId: '9005' }
]

/**
 * 生成AIoT数据
 * @param size 对于每一个大数据节点生成节点数量（1~size）
 */
function generateAIoT(size = 5) {
  const data = [], edges = []
  for (let i = 0; i < SparkNodeList.length; i++) {
    const node = SparkNodeList[i]
    const childSize = (Math.random() * 5)
    for (let j = 1; j <= Math.max(childSize, 1); j++) {
      const cell = {
        id: 'GA615' + node.id + j,
        name: 'GA615' + node.id + j,
        bigNodeId: node.id
      }
      data.push(cell)
      edges.push({
        source: cell.id,
        target: node.id
      })
    }
  }

  console.log(data)
  console.log(edges)
}

/**
 * 生成大数据节点数据
 * @param size 数据节点生成master节点数量（1~size） 每一个master节点生成worker节点数量（1~size）
 */
function generateBigDataNode(size = 9) {
  const data = []
  // {source:id,target:id}
  const edges = []
//{ id: 1, nodeName: '', pId: 1}
  for (let i = 1, before = null; i <= size; i++) {
    const childSize = Math.random() * size
    const master = {
      id: String(i),
      name: 'master-node-' + i,
      type: 'master',
      pId: String(-1)
    }
    data.push(master)

    //添加worker节点
    for (let j = 1; j <= Math.max(childSize, 1); j++) {
      const cell = {
        id: String(i * 1000 + j),
        name: 'worker-node-' + j,
        type: 'worker',
        pId: String(i)
      }
      data.push(cell)
      edges.push({
        source: cell.id,
        target: master.id
      })
    }

    if (i > 1) {
      edges.push({
        source: before.id,
        target: master.id
      })
    }
    before = master
  }

  console.log(data)
  console.log(edges)
}

/**
 * 生成异常数据
 * @param size
 */
function generateSparkAbnormalData() {
  const res = []
  for (let i = 0; i < SparkNodeList.length; i++) {
    if (Math.random()<=0.001)
      continue
    const node = SparkNodeList[i]
    const cell = {
      id: v4(),
      type: '1001',
      content:``,
      isPredicted: Math.random()>=0.5,
      createTime: Date.now(),
      grade: '一级',
      bindId: node.id,
      bindType: node.type,
      abnormalProbability:Math.random() * 100,
      process:Math.floor(Math.random()*3)
    }
    res.push(cell)
  }
  console.log(res)
}

function generateAIoTAbnormalData() {
  const res = []
  for (let i = 0; i < AIoTList.length; i++) {
    if (Math.random()<=0.001)
      continue
    const node = AIoTList[i]
    const cell = {
      id: v4(),
      type: '4001',
      content:``,
      isPredicted: Math.random()>=0.5,
      createTime: Date.now(),
      grade: '一级',
      bindId: node.id,
      bindType: 'AIoT',
      abnormalProbability:Math.random() * 100,
      process:Math.floor(Math.random()*3)
    }
    res.push(cell)
  }
  console.log(res)
}
generateSparkAbnormalData()
