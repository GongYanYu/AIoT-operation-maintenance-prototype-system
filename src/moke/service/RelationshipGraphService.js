import AIoT from '@/moke/data/AIoT'
import BigData from '@/moke/data/BigData'
import { deepClone } from '@/moke/util'
import NodeStatusEnum from '@/moke/entity/NodeStatusEnum'
import abnormalInfo from '@/moke/data/AbnormalInfo'

/**
 * 获取节点列表
 * @param range all bigData AIoT
 * @return {*[]}
 */
function getNodeList(range='all') {
  let res=[]
  if (range === 'all'|| range === 'AIoT') {
    const aCopy = deepClone(AIoT.AIoTList)
    res = res.concat(aCopy)
  }
  if (range === 'all'|| range === 'bigData') {
    const bCopy=deepClone(BigData.SparkNodeList)
    bCopy.forEach(e=>e.symbol='roundRect')
    res=res.concat(bCopy)
  }

  const allAbnormalData=abnormalInfo.abnormalAIoT.concat(abnormalInfo.abnormalSpark)

  res.forEach(item => {
    const abnormalData= allAbnormalData.find(e=>e.bindId===item.id)
    if (abnormalData) {
      const nodeStatus=NodeStatusEnum[abnormalData.isPredicted?3:2]
      item['nodeStatus']=nodeStatus
      item['category']=nodeStatus.name
    }else {
      item['nodeStatus']=NodeStatusEnum['1']
      item['category']=NodeStatusEnum.getStatusName(1)
    }
    item['symbolSize']=30
  })



  return res
}

/**
 * 获取边列表
 * @param range all bigData AIoT
 * @return {*[]}
 */
function getEdgeList(range='all') {
  let res=[]
  if (range === 'all'|| range === 'AIoT') {
    const aCopy = deepClone(AIoT.AIoTSparkEdgeList)
    res = res.concat(aCopy)
  }
  if (range === 'all'|| range === 'bigData') {
    const bCopy=deepClone(BigData.SparkEdgeList)
    bCopy.forEach(e=>e.symbol='roundRect')
    res=res.concat(bCopy)
  }

  return res
}

export default {
  getNodeList,getEdgeList
}
