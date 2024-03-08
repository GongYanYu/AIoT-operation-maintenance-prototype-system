import styles from './global.scss'

export function getAbcColor(){
  // c b  a
  return [styles.colorPrimary, styles.colorWarning, styles.colorDanger]
}

export function getStateColor(){
  //
  return [styles.colorPrimary, styles.colorSuccess,styles.colorWarning, styles.colorDanger]
}

export function getCurrentStateColor(){
  //目前状态:0在建,1竣工2停工3未开工4完工
  //let ans = ['已开工', '竣工', '停工','未开工','完工']
  return [styles.colorSuccess,styles.colorSuccess,styles.colorDanger, '#ffffff46',styles.colorSuccess,]
}

export function get_warning_process_state_color(){
  //['待处理', '已完成', '处理中']
  return [styles.colorPrimary, styles.colorSuccess,styles.colorWarning]
}

export function getProgressStatusColor(){
  // 0:提前  1正常  2滞后
  return [styles.colorSuccess, styles.colorMain, styles.colorDanger]
}
