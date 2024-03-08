export class BigDataNode {
  /**
   *
   * @param id
   * @param name
   * @param type master|worker
   * @param pId
   * @param nodeStatus
   */
  constructor(id, name, type, pId, nodeStatus) {
    this.id = id
    this.name = name
    this.type = type
    this.pId = pId
    this.nodeStatus = nodeStatus
  }
}
