
/**
 * 数组元素的组合
 * @param {Int} m 自然数，且小于等于当前数组的长度
 * @param {Function} handle 操作函数，将返回每次组合所产生的元素
 * @return {Array} 从(当前)数组中，取出m个元素的所有组合
 */


/**
 * (指定范围)随机数生成
 * @param  {Int} form 范围开始(包括)
 * @param  {Int} to   范围结束(包括)
 * @return {Int} 生成的随机数
 */
var R = function (form, to){
    return Math.floor(Math.random()*(to-form))+form;
}

/**
 * 阶乘(factorial:F(n)，0的阶乘为1，F = n*(n-1)*(n-2)*...*1)
 * 一个正整数的阶乘（英语：factorial）是所有小于及等于该数的正整数的积，并且有0的阶乘为1
 * @param {Int} n 正整数
 * @remark 170的阶乘为：7.257415615307994e+306 大于170的阶乘计算机将输出：Infinity，表示无穷大
 */
var F = function(n){
    return n ? n == 1 ? n : n* F(n-1) : 1;
};

/**
 * 排列(array:A(n, m) [(m<=n)])
 * 从n个不同元素中，任取m个元素按照一定的顺序排成一列，叫做从n个不同元素中取出m个元素的一个排列。
 * 从n个不同元素中，取出m个元素的所有排列的个数，叫做从n个不同元素中取出m个元素的排列数。
 * @param {Int} n 自然数
 * @param {Int} m 自然数，且小于等于n
 */
var A = function(n, m){
    return m > n ? 0 : F(n) / F(n-m);
};

/**
 * 组合(combination:C(n, m) [(m<=n)])
 * 从n个不同元素中，任取m个元素并成一组，叫做从n个不同元素中取出m个元素的一个组合。
 * 从n个不同元素中，取出m个元素的所有组合的个数，叫做从n个不同元素中取出m个元素的组合数。
 * @param {Int} n 自然数
 * @param {Int} m 自然数，且小于等于n
 */
var C = function(n, m){
    return A(n, m) / F(m);
};

export const compose = {
    C(group, m, handle) {
        var arys = group,
            result = [],
            count = 0,
            customThen = [],
            customThenEnd = [],
            timer = 0;

        //排列总记录数
        var myC = C(arys.length, m);

        (function selfRun(group, ary, m){
            var n = ary.length;
            if (m<=0){
                var resultGroup;
                var per = ((((count+1) / myC) * 100)).toFixed(2);
                if(handle){
                    resultGroup = handle.call(arys, group, count, myC, per);
                    group = resultGroup || group;
                }
                var i=0, len = customThen.length, thenItem;
                for(;i<len;i++){
                    thenItem = customThen[i];
                    if(thenItem && typeof(thenItem) == 'function')
                        thenItem.call(arys, group, count, myC, per);
                }

                count++;
                result.push(group);
                if(count == myC){
                    i=0, len = customThenEnd.length, thenItem;
                    for(;i<len;i++){
                        thenItem = customThenEnd[i];
                        if(thenItem && typeof(thenItem) == 'function')
                            thenItem.call(arys, result);
                    }
                }
                return;
            }

            (function selfFor(i){
                setTimeout(function(){
                    selfRun(group.concat(ary[i]), ary.slice(i+1), m-1);
                    i++;
                    if(i<=n-m){
                        selfFor(i);
                    }
                }, timer);
            })(0);
            /*for (var i=0; i<=n-m; i++){
                selfRun(group.concat(ary[i]), ary.slice(i+1), m-1);
            }*/
        })([], arys, m);

        return {
            then: function(fun){
                if(fun)
                    customThen.push(fun);
                return this;
            },
            thenend: function(fun){
                if(fun)
                    customThenEnd.push(fun);
                return this;
            }
        };
    }
}
