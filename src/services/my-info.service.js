/*
 * @Description:
 * @Author: huyanhai
 * @since: 2019-08-15 10:15:42
 * @lastTime: 2019-08-16 13:40:04
 * @如果有bug，那肯定不是我的锅
 */

import { BaseService } from '@/services/base.service'

let serviceArys = [
  { service: 'helpFaqList', remark: '分页查询常见问题列表' },
  { service: 'helpFaqInfo', remark: '查询常见问题详情' },
  { service: 'userNoticeList', remark: '分页查询用户平台公告' },
  { service: 'platformNoticeInfo', remark: '查询平台公告详情' }
]

export const myInfoService = BaseService.structureService(serviceArys)
