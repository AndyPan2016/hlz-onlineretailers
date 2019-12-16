/**
 * 我的订单接口服务
 * @author AndyPan
 * @createdate 2019年5月21日18:13:49
 * @lastupdatedate 2019年4月30日17:46:06
 * @remark
 */

import { BaseService } from '@/services/base.service'

let serviceArys = [
    {service: 'orderPageQuery', remark: '订单分页查询'},
    {service: 'createOrderPay', remark: '创建订单支付'},
    {service: 'orderPay', remark: '订单支付'},
    {service: 'orderCancle', remark: '取消订单'},
    {service: 'orderReceive', remark: '订单确认收货'},
    {service: 'orderCanclePay', remark: '订单取消支付'},
    {service: 'orderInfoQuery', remark: '订单详情查询'},
    {service: 'reminder', remark: '催单'},
    {service: 'orderLogisticsInfoQuery', remark: '订单物流信息查询'}

]

export const myOrderService = BaseService.structureService(serviceArys)
