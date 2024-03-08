import AIoT from '@/moke/data/AIoT'
import BigData from '@/moke/data/BigData'
import { deepClone } from '@/moke/util'
import NodeStatusEnum from '@/moke/entity/NodeStatusEnum'
import AbnormalInfo from '@/moke/data/AbnormalInfo'
import AbnormalTypeEnum from '@/moke/entity/AbnormalTypeEnum'

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

  res.forEach(item => {
    item['nodeStatus']=NodeStatusEnum['1']
    item['category']=NodeStatusEnum.getStatusName(1)
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

function getWarningList(range='all', sort=false) {
  let res=[]
  if (range === 'all'|| range === 'AIoT') {
    const aCopy = deepClone(AbnormalInfo.abnormalAIoT)
    res = res.concat(aCopy)
  }
  if (range === 'all'|| range === 'bigData') {
    const bCopy=deepClone(AbnormalInfo.abnormalSpark)
    res=res.concat(bCopy)
  }

  res.forEach(e=>{
    e.typeEnum=AbnormalTypeEnum[e.type]
  })

  if (sort){
    res.sort((a, b)=>b.abnormalProbability-a.abnormalProbability)
  }

  return res
}


function getStatistics(range='all'){

}

export default {
  getNodeList,getEdgeList,getWarningList,getStatistics
}
