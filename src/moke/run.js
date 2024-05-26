
export function copyValue(value,isCopy) {
// 要复制的文本
  const textToCopy = JSON.stringify({
    'RECORDS': value
  })

  if (isCopy){
    const clipboardy = require('clipboardy')

// 将文本复制到剪贴板
    clipboardy.writeSync(textToCopy)
  }


  console.log('数据已复制到剪贴板。')
  console.log(textToCopy)
}

const preNodeList={
  status:[1.5,90.1,8,5.5,64,24,8,80.9],

}

