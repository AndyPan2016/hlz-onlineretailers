/**
 * 基础服务
 * @author AndyPan
 * @createdate 2019年3月31日13:53:50
 * @lastupdatedate 2019年3月31日13:53:53
 * @remark 
 */

import wepy from 'wepy'
import {
    API_PARTNER_ID, API_ACCESS_KEY, API_SECRET_KEY, API_HOST, API_GATEWAY,
    API_PROTOCOL, API_VERSION, API_APP_CLIENT, API_SIGN_TYPE, API_CONTENT_TYPE,
    STATUS
} from '@/configs';
import { Utils, Tips, MD5 } from '@/utils';
import CryptoJS from 'crypto-js';

const genSign = function(data, secretKey) {
    let str = JSON.stringify(data) + secretKey
    let sign = CryptoJS.MD5(str).toString();
    return sign;
}

export const BaseService = {
    /**
     * 网络请求
     * @param {Object} params 参数对象
     * @param {String} url 请求路径
     */
    async request(params = {}, url = (API_HOST + API_GATEWAY)) {
        var promise = new Promise((resolve, reject) => {
            let partnerId = params.partnerId || API_PARTNER_ID;
            let accessKey = params.accessKey || API_ACCESS_KEY;
            let secretKey = params.secretKey || API_SECRET_KEY;

            if (url === '') {
                throw { message:'url cannot be null' };
            }
            if (partnerId === '') {
                throw { message:'partnerId cannot be null' };
            }
            if (accessKey === '') {
                throw { message:'accessKey cannot be null' };
            }
            if (secretKey === '') {
                throw { message:'secretKey cannot be null' };
            }

            let paramsData = params.data || {};
            let requestNo = Utils.timeStamp();
            let method =  params.method || 'post';
            // 扩展公共参数
            paramsData = Utils.merge({
                'partnerId': partnerId,
                // 'protocol': API_PROTOCOL,
                'version': API_VERSION,
                // 'appClient': API_APP_CLIENT,
                'requestNo': requestNo
            }, paramsData);
            // 签名
            let sign = genSign(paramsData, secretKey);
            // 请求网络
            Tips.loading()
            try{
                wx.request({
                    url: url,
                    method: method,
                    data: paramsData,
                    header: {
                        'x-api-signType': API_SIGN_TYPE,
                        'x-api-sign': sign,
                        'x-api-accessKey': accessKey,
                        'content-type': API_CONTENT_TYPE
                    },
                    complete() {
                        Tips.loaded()
                    },
                    success(res) {
                        let statusCode = (res && res.statusCode) || 0;
                        if (statusCode !== 200) {
                            reject({message: '服务器错误, 请联系管理员', status: statusCode})
                        }
                        else {
                            let success = (res && res.data && res.data['success']) || false;
                            if (success) {
                                resolve(res)
                            }
                            else {
                                reject({message: res.data.message, code: res.data.code})
                            }
                        }
                    },
                    fail(error) {
                        reject(error)
                    }
                });
            }
            catch(e){
            }
        })

        return promise
    },
    async userRequest(params, url) {
        let userInfo = await wepy.getStorageSync(STATUS.USER_SPECIAL_INFO);
        let partnerId;
        let accessKey;
        let secretKey;
        if (userInfo) {
            partnerId = userInfo.partnerId;
            accessKey = userInfo.accessKey;
            secretKey = userInfo.secretKey;
        }
        params = Utils.merge({
            partnerId,
            accessKey,
            secretKey
        }, params);
        return this.request(params, url)
    },
    myServiceRequest(params = {}, serviceName) {
        params.data = Utils.merge(params.data, {
            'service': serviceName
        })
        return this.userRequest(params)
    },
    structureService(serviceArys) {
        let serviceObjs = {}
        let serviceItem
        for (let key in serviceArys) {
            serviceItem = serviceArys[key]
            serviceObjs[serviceItem.service] = ((item) => {
                return (params = {}) => {
                    return BaseService.myServiceRequest(params, item.service)
                }
            })(serviceItem)
        }

        return serviceObjs
    }
};
