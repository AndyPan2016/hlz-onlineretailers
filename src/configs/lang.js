/**
 * 语言配置
 * @author AndyPan
 * @createdate 2019年3月31日11:02:06
 * @lastupdatedate 2019年3月31日11:02:11
 * @remark 包含所有语言文本信息配置（如：提示、名称等）
 */

// 语言配置
let langConfigs = {
    zh: {
        // 空字段文本
        placeholderText: '无',
        // APP名称
        AppName: '喜事宝',
        // 授权失败
        AuthorizeFaile: '授权失败',
        // 卡券类型
        couponType: {
            'baobao': { text: '宝宝宴', value: '宝宝' },
            'birthday': { text: '生日宴', value: '生日' },
            'marry': { text: '婚宴', value: '婚宴' },
            'wedding': { text: '婚庆', value: '婚庆' },
            'manyue': { text: '满月宴', value: '满月' },
            'bairi': { text: '百日宴', value: '百日' },
            'zhousui': { text: '周岁宴', value: '周岁' }
        },
        // 卡券消费类型
        couponConsumeType: {
            'full_reduction': { text: '满减券' },
            'reach': { text: '抵用券' },
            'discount': { text: '折扣券' },
            'business': { text: '业务类' }
        },
        // 活动状态
        activeStatus: {
            'ended': { key: 'ended', text: '已结束' },
            'in-progress': { key: 'in-progress', text: '进行中' },
            'ENABLE': { key: 'enable', text: '进行中' },
            'PAUSE': { key: 'pause', text: '未开始' },
            'DISABLE': { key: 'disable', text: '已结束' }
        },
        // 酒店星级
        hotelStar: {
            'one': '一星级酒店', 'two': '二星级酒店', 'three': '三星级酒店', 'four': '四星级酒店', 'five': '五星级酒店'
        },
        // 预约单状态
        appointmentStatus: {
            'RESERVATIN_PROCESSING': { text: '预约中', type: 'appointment' },
            'RESERVATIN_ACCEPTED': { text: '已受理', type: 'acceptance' }
        },
        // 卡券按钮类型
        couponButtonType: {
            'NOT_USED': { status: 'unuse', text: '立即使用' },
            'ALREADY_USED': { status: 'used', text: '已使用' },
            'ALREADY_OVERDUE': { status: 'overdue', text: '已过期' }
        },
        // 卡券状态
        couponStatus: [
            { key: 'NOT_USED', title: '未使用' },
            { key: 'ALREADY_USED', title: '已使用' },
            { key: 'ALREADY_OVERDUE', title: '已过期' }
        ],
        // 活动游戏类型
        activeGameType: {
            'RED_PACK': { key: 'RED_PACK', text: '抢红包', icon: 'red-pack' },
            'SHAKE': { key: 'SHAKE', text: '摇一摇', icon: 'shake' },
            'BIG_WHEEL': { key: 'BIG_WHEEL', text: '转盘', icon: 'big-wheel' }
        },
        // 出席状态
        attendStatus: [
            { key: 'ATTEND', text: '赴宴' },
            { key: 'UNDETERMINED', text: '待定' },
            { key: 'BUSY', text: '有事' }
        ],
        weddingOpusStatus: [
            { key: '', title: '全部作品' },
            { key: 'CHINESE', title: '中式婚礼' },
            { key: 'WEST', title: '西式婚礼' }
        ],
        // 作品类型
        opusType: {
            'OUTDOOR': { text: '户外' },
            'INDOOR': { text: '室内' }
        },
        // 游戏状态
        gameStatus: {
            'INIT': {text: '未开始'},
            'UNDERWAY': {text: '进行中'},
            'COUNT': {text: '统计中'},
            'END': {text: '结束'}
        }
    },
    ch: {
        // APP Name
        AppName: 'APP Name'
    }
};
// 语言类型
let langType = 'zh';

export const Lang = langConfigs[langType];
