import qs from 'qs'
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'

/**
 * 检查用户登录状态
 */
function isLogin(){
    return new Promise(function(resolve,reject){
        let {token,device} = getToken()
        if(token && device){
            axios({
                url:url.isLogin,
                method:'get',
                headers:{
                    'XX-Token':token ? token : '',
                    'XX-Device-Type':device ? device : '',
                }
            }).then(response=>{
                if(response.status == 200 ){
                    if(response.data.code && response.data.code == 10001){
                        resolve(1)          //用户未登录
                    } else {
                        resolve(2)          //登录状态正常
                    }
                } else {
                    resolve(3)              //网络或服务器问题
                }
            }).catch(err=>{
                reject(4)
            })
        } else {
            resolve(5)                      //token等用户信息不存在
        }
    })
}

/**
 * 获取用户token
 * @returns {{"XX-Token": string, "XX-Device-Type": string}}
 */
function getToken(){
    let  token  =  localStorage.getItem('XX-Token')
    let device  = localStorage.getItem('XX-Device-Type')
    let user = localStorage.getItem('user')
    if(token && device && user){
        return {
            token,
            device,
            user,
        }
    } else {
        return false
    }


}



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
 * @param format   ('Y/M/D' 或 'Y年M月D日')
 * @returns {string}
 */
function timestampToTime(timestamp,format = 'Y-M-D h:m:s') {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var datetime  = {};
    datetime.Y = date.getFullYear();
    datetime.M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    datetime.D = date.getDate();
    datetime.h = date.getHours();
    datetime.m = date.getMinutes();
    datetime.s = date.getSeconds();
    return format.replace(/(\w{1})/g,function(){
        var args = arguments;
        return datetime[args[1]];
    });
}

/**
 * axios的data参数格式化
 * @param $postData
 * @returns {*}
 */
function stringify($postData){
    return qs.stringify($postData);
}

/**
 * 处理Axios返回的数据
 */
function getAxiosData(response){
    if(response.status != 200){
        Toast.fail('网络错误，未能请求到数据!')
        return false
    }
    let data = response.data
    if (data.code != 1) {
        if(data.msg) {
            Toast.fail(data.msg)
        } else {
            Toast.fail('服务器错误，未能请求到数据!')
        }
        return false
    }
    return data
}



export default {
    splitStr,
    timestampToTime,
    stringify,
    isLogin,
    getToken,
    getAxiosData,
}