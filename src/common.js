import qs from 'qs'


/**
 * 字符串截取
 * @param str
 * @param num
 */
function splitStr(str,length){
    if(str == undefined) {
        return '';
    }
    if(str.length > length){
        return str.substring(0,length)+'..';
    } else {
        return str;
    }

}

/**
 * 时间戳装换日期格式
 * @param timestamp
 * @returns {*}
 */
function timestampToTime(timestamp) {
    var Y,M,D,h,m,s;
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}

/**
 * axios的参数格式化
 * @param $postData
 * @returns {*}
 */
function stringify($postData){
    return qs.stringify($postData);
}

export default {
    splitStr,
    timestampToTime,
    stringify,
}