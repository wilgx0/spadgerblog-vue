const LOCALURL = '/apis'

const URL = {
    getShareList:LOCALURL + '/api/spadger/public/get_share_list', //获取分享列表的数据
    getArticleById:LOCALURL + '/api/portal/Articles',             //根据ID获取文章信息
    isLogin:LOCALURL + '/api/user/public/getUserId',              //判断用户是否登录
    login:LOCALURL + '/api/user/public/login',                      //用户登录
    addAtricles:LOCALURL + '/api/portal/Articles',                 //添加文章
}

module.exports = URL