import LOG from '@/utils/self-log'

const ElementUiUtil={
  /**
   * 加上 提示
   * @param titleName
   */
  addElDialogTitle(titleName){
    const className='el-dialog__title'
    const element=document.getElementsByClassName(className)
    if (element==null||element.length===0){
      LOG.warn(['无'+className])
      return
    }
    LOG.warn([element.length])
    for (let i = 0; i < element.length; i++) {
      element[i].setAttribute('title',titleName)
    }
  }
}

export default ElementUiUtil
