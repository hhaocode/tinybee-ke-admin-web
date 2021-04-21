import Vue from 'vue'

const secondToTime = (second) => {
  second = second || 0 // 秒
  if (second < 0) {
    second = -second
  }
  if (second === 0 || second === Infinity || second.toString() === 'NaN') {
    return '00:00:00'
  }
  const add0 = (num) => (num < 10 ? '0' + num : '' + num) // 小于10的补0
  const hour = Math.floor(second / 3600) // 小时
  const min = Math.floor((second - hour * 3600) / 60) //  分
  const sec = Math.floor(second - hour * 3600 - min * 60) // 秒
  return [hour, min, sec].map(add0).join(':')
}

const secondToTimeZH = (second) => {
  second = second || 0 // 秒
  if (second < 0) {
    second = -second
  }
  if (second === 0 || second === Infinity || second.toString() === 'NaN') {
    return '0分'
  }
  const concat = (num, unit) => num > 0 ? num + unit : '' // 小于10的补0
  const day = Math.floor(second / (3600 * 24))
  const hour = Math.floor((second - day * 3600 * 24) / 3600) // 小时
  const min = Math.floor((second - (day * 3600 * 24) - (hour * 3600)) / 60) //  分

  return concat(day, '天') + concat(hour, '小时') + concat(min, '分')
}

const numberSign = (num) => {
  num = num || 0
  if (num > 0) {
    return '-'
  }
  return ''
}

// 格式化文件大小 单位：Bytes、KB、MB、GB
const fileSize = (fileSize) => {
  if (fileSize < 1024) {
    return fileSize + 'B'
  } else if (fileSize < (1024 * 1024)) {
    let temp = fileSize / 1024
    temp = temp.toFixed(2)
    return temp + 'KB'
  } else if (fileSize < (1024 * 1024 * 1024)) {
    let temp = fileSize / (1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'MB'
  } else {
    let temp = fileSize / (1024 * 1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'GB'
  }
}

Vue.filter('secondToTime', secondToTime)
Vue.filter('secondToTimeZH', secondToTimeZH)
Vue.filter('numberSign', numberSign)
Vue.filter('fileSize', fileSize)
