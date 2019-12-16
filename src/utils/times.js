/*
 * @Description: 日期处理工具集
 * @Author: huyanhai
 * @since: 2019-05-29 16:30:27
 * @lastTime: 2019-05-30 10:15:13
 */

export const timesFormate = {
  str2Stamp(time) {
    var date = time.substr(0, 10)
    var hour = time.substr(11, 2) === '00' ? 0 : time.substr(11, 2).replace(/\b(0+)/gi, '')
    var minute = time.substr(14, 2) === '00' ? 0 : time.substr(14, 2).replace(/\b(0+)/gi, '')
    var second = time.substr(17, 2) === '00' ? 0 : time.substr(17, 2).replace(/\b(0+)/gi, '')
    var timestamp = parseInt(new Date(date).getTime() / 1000) + parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second) - 28800
    return new Date(timestamp * 1000)
  },
  phoneFormate(val) {
    val = val || ''
    return val.substr(0, 3) + '****' + val.substr(7)
  }
}
