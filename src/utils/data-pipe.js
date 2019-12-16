/**
 * 数据管道
 * @author AndyPan
 * @createdate 2019年4月12日10:54:21
 * @lastupdatedate 2019年4月12日10:54:24
 * @remark 数据处理
 */

export const dataPipe = {
    /**
     * 基础数据处理
     * @param {Object} options 参数集合
     */
    basePipe(options, callBack) {
        // 数据
        let data = options.data || options;
        // 布尔转换规则
        let ruleBoolean = options.ruleBoolean || {'YES': true, 'NO': false};
        // 是否转换JSON字符串
        let jsParseJson = options.jsParseJson || true;
        // 回调
        callBack = callBack || options.callBack;
        
        if(data) {
            let eachData = (thisData) => {
                let dataItem, dataType, parseJSON;
                for(let key in thisData) {
                    dataItem = thisData[key];
                    dataType = typeof(dataItem);

                    if(dataType == 'object') {
                        thisData[key] = eachData(dataItem);
                    }
                    else if(dataType == 'string') {
                        try {
                            // 如果是JSON字符串，直接转换成JSON对象
                            parseJSON = JSON.parse(dataItem);
                            if(typeof(parseJSON) == 'object' && jsParseJson){
                                thisData[key] = parseJSON;
                            }
                        }
                        catch(e) {
                            // 将一些关键字转换成Boolean类型
                            thisData[key] = ruleBoolean[dataItem] != undefined ? ruleBoolean[dataItem] : dataItem;
                        }
                    }

                    // 回调
                    if(callBack) {
                        let result = callBack(dataItem, key, thisData);
                        if(result != undefined) {
                            thisData[key] = result;
                        }
                    }
                }
                return thisData;
            };
            return eachData(data);
        }

    }
}