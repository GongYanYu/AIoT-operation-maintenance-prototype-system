export class AbnormalInfo {
  /**
   *
   * @param type AbnormalTypeEnum
   * @param id
   * @param content AbnormalTypeEnum解析
   * @param isPredicted 是否是预测
   * @param createTime
   * @param grade 等级 '一级' ； '二级' ； '三级'
   * @param bindId 异常对象
   * @param bindType 异常对象类型 大数据节点还是IoT设备 bigData AIoT
   */
  constructor(type, id, content, isPredicted, createTime,grade, bindId, bindType) {
    this.type = type
    this.id = id
    this.content = content
    this.isPredicted = isPredicted
    this.createTime = createTime
    this.grade = grade
    this.bindId = bindId
    this.bindType = bindType
  }
}


