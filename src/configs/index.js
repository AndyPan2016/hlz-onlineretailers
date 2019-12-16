/*
 * @Description:基础配置
 * @Author: huyanhai
 * @since: 2019-08-12 16:14:38
 * @lastTime: 2019-10-10 16:29:02
 * @如果有bug，那肯定不是我的锅
 */
import { Lang } from './lang'
import { Status } from './status'

// 当前环境
let environment = 'develop'
// 环境配置
let configs = {
  // 开发环境
  develop: {
    // 入口路径
    portalPath: 'https://app.amyglzx.com/',
    // API Host
    // apiHost: 'http://shop.test.ihunlizhe.com/',
    // apiHost: 'http://xishibao.test.ihunlizhe.com/',
    apiHost: 'http://192.168.55.43:8087/',
    // apiHost: 'http://shop.ihunlizhe.net/',
    // apiHost: 'http://192.168.55.45:8088/',
    // API GateWay
    apiGateWay: 'gateway.do',
    apiPartnerId: '19092411295781100001',
    apiAccessKey: 'test',
    apiSecretKey: '06f7aab08aa2431e6dae6a156fc9e0b4',
    apiProtocol: 'HTTP_FORM_JSON',
    apiVersion: '1.0',
    apiAppClient: true,
    apiSignType: 'MD5',
    apiContentType: 'application/json;charset=UTF-8',
    defaultPartnerId: '19092411295781100001',
    defaultAccessKey: 'test',
    defaultSecretKey: '06f7aab08aa2431e6dae6a156fc9e0b4',
    resourcePath: 'https://media.ihunlizhe.com/market/',
    uploadFileConfigs: {
      accessKey: 'test',
      secretKey: '06f7aab08aa2431e6dae6a156fc9e0b4'
    }
  },
  // 测试环境
  test: {
    // 入口路径
    portalPath: 'https://app.amyglzx.com/',
    // API Host
    // apiHost: 'https://market.ihunlizhe.com/',
    apiHost: 'http://192.168.66.29:8088/',
    // apiHost: 'http://127.0.0.1:8088/',
    // API GateWay
    apiGateWay: 'gateway.do',
    apiPartnerId: '19041710345418390103',
    apiAccessKey: '19041710345418390103',
    apiSecretKey: '81b6f46052bbfec2e2786fc475bb7477',
    apiProtocol: 'HTTP_FORM_JSON',
    apiVersion: '1.0',
    apiAppClient: true,
    apiSignType: 'MD5',
    apiContentType: 'application/json;charset=UTF-8',
    defaultPartnerId: '19041710345418390103',
    defaultAccessKey: '19041710345418390103',
    defaultSecretKey: '81b6f46052bbfec2e2786fc475bb7477',
    resourcePath: 'https://media.ihunlizhe.com/market/',
    uploadFileConfigs: {
      accessKey: 'test',
      secretKey: '06f7aab08aa2431e6dae6a156fc9e0b4'
    }
  },
  // 生产环境
  build: {
    // 入口路径
    portalPath: 'https://app.amyglzx.com/',
    // API Host
    apiHost: 'https://shop.ihunlizhe.com/',
    // API GateWay
    apiGateWay: 'gateway.do',
    apiPartnerId: '19073111545225770018',
    apiAccessKey: '19073111545225770018',
    apiSecretKey: '3fb5953ca1535c13bc0b3a2cb8744f8a',
    apiProtocol: 'HTTP_FORM_JSON',
    apiVersion: '1.0',
    apiAppClient: true,
    apiSignType: 'MD5',
    apiContentType: 'application/json;charset=UTF-8',
    defaultPartnerId: '19073111545225770018',
    defaultAccessKey: '19073111545225770018',
    defaultSecretKey: '3fb5953ca1535c13bc0b3a2cb8744f8a',
    resourcePath: 'https://media.ihunlizhe.com/market/'
  }
}

// 当前配置
let environmentConfigs = configs[environment]

// 入口路径
export const PORTAL_PATH = environmentConfigs.portalPath
// API Host
export const API_HOST = environmentConfigs.apiHost
// API GateWay
export const API_GATEWAY = environmentConfigs.apiGateWay
export const API_PARTNER_ID = environmentConfigs.apiPartnerId
export const API_ACCESS_KEY = environmentConfigs.apiAccessKey
export const API_SECRET_KEY = environmentConfigs.apiSecretKey
export const API_PROTOCOL = environmentConfigs.apiProtocol
export const API_VERSION = environmentConfigs.apiVersion
export const API_APP_CLIENT = environmentConfigs.apiAppClient
export const API_SIGN_TYPE = environmentConfigs.apiSignType
export const API_CONTENT_TYPE = environmentConfigs.apiContentType
export const RESOURCE_PATCH = environmentConfigs.resourcePath
export const UPLOAD_FILE_CONFIGS = environmentConfigs.uploadFileConfigs
export const ENVIRONMENT = environment

// 语言配置
export const LANG = Lang
let thisStatus = {}
for (let key in Status) {
  thisStatus[key] = environment + '_' + Status[key]
}
// 状态配置
export const STATUS = thisStatus
