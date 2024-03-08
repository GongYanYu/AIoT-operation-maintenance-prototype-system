import { formatDate } from '@/utils/index'

export function getPreviousLastMonths(size=12,formatStr='yyyy-MM') {
  // 获取当前时间
  let currentDate = new Date();
  const res=[]

  for (let i = 0; i < size; i++) {
    res.push(formatDate(currentDate,formatStr))
    if (currentDate.getMonth()>0){
      currentDate.setMonth(currentDate.getMonth() - 1);
    }else {
      currentDate.setFullYear(currentDate.getFullYear() - 1)
      currentDate.setMonth(11);
    }
  }

  return res.reverse();
}


