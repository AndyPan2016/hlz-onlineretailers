/**
 * （所有）接口服务
 * @author AndyPan
 * @createdate 2019年5月8日11:15:04
 * @lastupdatedate 2019年4月23日13:54:22
 * @remark
 */

// 公共服务
import { commonsService } from './commons.service'
import { indexService } from './index.service'
import { goodsDetailService } from './goods-detail.service'
import { addressService } from './address.service'
import { myOrderService } from './my-order.service'
import { myInfoService } from './my-info.service'
import { shopCartService } from './shopcart.service'

export const CommonsService = commonsService
export const IndexService = indexService
export const GoodsDetailService = goodsDetailService
export const AddressService = addressService
export const MyOrderService = myOrderService
export const MyInfoService = myInfoService
export const ShopCartService = shopCartService
