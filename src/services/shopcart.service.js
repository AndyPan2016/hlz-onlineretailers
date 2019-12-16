/**
 * @Author: huyanhai
 * @msg: 购物车API
 * @param {type}
 * @return:
 * @LastEditTime: lastTime
 * @since: 2019-10-17 15:22:28
 */

import { BaseService } from '@/services/base.service'

let serviceArys = [
  { service: 'shopCartAdd', remark: '添加购物车' },
  { service: 'shopCartPageQuery', remark: '分页查询购物车' },
  { service: 'shopCartUpdate', remark: '修改购物车' },
  { service: 'shopCartDelete', remark: '购物车删除货物' }
]

export const shopCartService = BaseService.structureService(serviceArys)
