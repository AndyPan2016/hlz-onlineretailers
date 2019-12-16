/*
 * @Description:index接口
 * @Author: huyanhai
 * @since: 2019-07-25 11:46:51
 * @lastTime: 2019-08-14 17:16:21
 */

import { BaseService } from '@/services/base.service'

let serviceArys = [
  { service: 'mpCatListQuery', remark: '小程序分类列表查询' },
  { service: 'goodsPageQuery', remark: '商品分页查询' },
  { service: 'goodsCategoryPageQuery', remark: '按分类分页查询商品' },
  { service: 'mpGoodsSearchPageQuery', remark: '小程序商品搜索分页查询' },
  { service: 'shopBannerList', remark: '电商banner列表查询' },
  { service: 'themeQuery', remark: '所有上架主题查询' },
  { service: 'themeGoodsQuery', remark: '主题关联商品查询' },
  { service: 'userNotReadNoticeCount', remark: '用户未读平台公告条数' }
]

export const indexService = BaseService.structureService(serviceArys)
