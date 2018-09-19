const LOCALURL = '/apis'

const URL = {
    getShareList:LOCALURL + '/api/spadger/public/get_share_list', //获取分享列表的数据
    getArticleById:LOCALURL + '/api/portal/Articles',             //根据ID获取文章信息
    isLogin:LOCALURL + '/api/user/public/getUserId',              //判断用户是否登录
    login:LOCALURL + '/api/user/public/login',                      //用户登录
    addAtricles:LOCALURL + '/api/portal/Articles',                 //添加文章
    addComments:LOCALURL + '/api/user/comments',                  //添加评论
    getCommentList:LOCALURL + '/api/user/comments',                //获取评论列表
    zan:LOCALURL + '/api/user/comments/zan',                       //点赞
}

module.exports = URL