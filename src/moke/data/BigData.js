
const SparkNodeList=[
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




const SparkEdgeList=[
  { source: '1001', target: '1' },
  { source: '1002', target: '1' },
  { source: '1003', target: '1' },
  { source: '1004', target: '1' },
  { source: '1005', target: '1' },
  { source: '1006', target: '1' },
  { source: '1007', target: '1' },
  { source: '1008', target: '1' },
  { source: '2001', target: '2' },
  { source: '2002', target: '2' },
  { source: '2003', target: '2' },
  { source: '2004', target: '2' },
  { source: '2005', target: '2' },
  { source: '2006', target: '2' },
  { source: '1', target: '2' },
  { source: '3001', target: '3' },
  { source: '2', target: '3' },
  { source: '4001', target: '4' },
  { source: '4002', target: '4' },
  { source: '4003', target: '4' },
  { source: '3', target: '4' },
  { source: '5001', target: '5' },
  { source: '5002', target: '5' },
  { source: '4', target: '5' },
  { source: '6001', target: '6' },
  { source: '5', target: '6' },
  { source: '7001', target: '7' },
  { source: '7002', target: '7' },
  { source: '6', target: '7' },
  { source: '8001', target: '8' },
  { source: '7', target: '8' },
  { source: '9001', target: '9' },
  { source: '9002', target: '9' },
  { source: '9003', target: '9' },
  { source: '9004', target: '9' },
  { source: '9005', target: '9' },
  { source: '8', target: '9' }
]






export default {SparkNodeList,SparkEdgeList}
