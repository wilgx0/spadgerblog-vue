<template>
    <div class="answer-details">
        <van-nav-bar title="问题详情" left-text="返回" @click-left="$router.go(-1)" left-arrow fixed></van-nav-bar>
        <div class="content">
            <div>
                <h2>{{ArticleData.post_title}}</h2>
            </div>

            <div v-html="ArticleData.post_content"></div>

            <div>
                <van-button type="primary" @click="showAnswer">我来回答</van-button>
            </div>

            <div class="answer-count">
                246条回答
            </div>

            <!--回答列表-->
            <div class="comment-list">
                <ul>
                    <li v-for="(v,i) in commentList" :key="i">
                        <p>{{v.user.user_nickname}}</p>
                        <p>{{v.user.create_time|timestampToTime}}</p>
                        <p>{{v.content}}</p>
                        <p><van-icon name="like-o" /></p>
                    </li>
                </ul>
            </div>

        </div>

        <!--回答问题的界面-->
        <van-popup v-model="answerShow" position="right">
            <van-nav-bar title="回答问题"
                         left-text="返回"
                         @click-left="answerShow = false"
                         left-arrow
                         fixed
                         right-text="提交回答"
                         @click-right="answer"
            ></van-nav-bar>
            <div class="answer-content">
                <div class="loading" v-show="loadingShow">
                    <van-loading type="spinner" color="black" />
                </div>

                <vue-html5-editor :content="content" :height="editHeight"
                                  @change="updateData"></vue-html5-editor>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import Tool from '@/common.js'
    import url from '@/serviceAPI.config.js'
    import initRichText from '@/common/initHTMLEditor'
    initRichText()
    import { Toast } from 'vant'

    export default {
        data(){
            return {
                answerShow:false,
                answerData:'',          //回答的内容
                content: '请填写回答内容',
                editHeight:400,         //编辑器的高度
                loadingShow:false,      //加载图标的显示
                commentList:[],          //评论列表
                ArticleData:{},          //文章详情
            }
        },
        filters:{
            timestampToTime(value){          //日期格式化
                return Tool.timestampToTime(value)
            },
        },
        methods:{
            clearData(){
                this.content = '请填写回答内容'
            },
            updateData(e = ''){
                this.content = e;
            },
            showAnswer(){
              this.answerShow = true
            },
            answer(){                           //添加评论测试
                if(this.content == ''){
                    Toast.fail('回答内容不能为空!');
                    return
                }
                let postData = Tool.stringify({
                    object_id: this.$route.params.id,
                    table_name: 'portal_post',
                    url: '',
                    content: this.content,
                    parent_id:0,
                })
                let userInfo = Tool.getToken()
                this.loadingShow = true
                this.$http({
                    url:url.addComments,
                    method:'post',
                    data:postData,
                    headers:{
                        'XX-Token':userInfo.token ? userInfo.token : '',
                        'XX-Device-Type':userInfo.device ? userInfo.device : '',
                    },
                }).then(response=>{
                    this.loadingShow = false
                    let data = Tool.getAxiosData(response)
                    Toast.success(data.msg)
                    this.clearData()
                }) .catch(err=>{
                    this.loadingShow = false
                    console.log(err)
                })
            },
            /**
             * 获取评论列表
             * @param object_id         评论的文章的id
             * @param currentPage       当前页
             */
            getCommentList(object_id,currentPage = 1){
                return new Promise((resolve,reject)=>{
                    this.$http({
                        url:url.getCommentList,
                        method:'get',
                        params:{
                            page: currentPage + ',5',
                            object_id: object_id,
                            table_name:'portal_post'
                        },
                    }).then(response=>{
                        resolve(response)
                    }) .catch(err=>{
                        reject(err)
                    })
                })

            },
            getArticleById(){               //根据id获取文章
                return new Promise((resolve,reject)=>{
                    this.$http({
                        url:url.getArticleById,
                        method:'get',
                        params:{
                            id :this.$route.params.id
                        }
                    }).then(response=>{
                        //let data = Tool.getAxiosData(response)
                        resolve(response)
                    }).catch(err=>{
                        reject(err)
                    })
                })
            }
        },
        created(){
            let winHeight = document.documentElement.clientHeight
            this.editHeight = winHeight - 38 - 46;
            (async () =>{
                //获取文章的信息
                let ArticleData = await this.getArticleById()
                ArticleData = Tool.getAxiosData(ArticleData)
                this.ArticleData = ArticleData.data
                //获取评论的相关内容
                let commentList = await this.getCommentList(this.$route.params.id)
                commentList = Tool.getAxiosData(commentList)
               // console.log(commentList);
                if(commentList.code == 1){
                    this.commentList = commentList.data[0]
                    console.log(this.commentList);
                }
            })()
        }
    }
</script>

<style lang="less" scoped>
    .answer-details{
        .content{
            margin-top:46px;
            padding:1rem;
            color:#333;
            div:nth-child(1){
                line-height:38px;
                font-size:24px;
                h2{
                    margin:0px;
                }
            }
            div:nth-child(2){
                line-height:38px;
                font-size:18px;
            }
            div:nth-child(4) {
                font-size:16px;
                line-height:44px;
            }
            .answer-count{
                border-bottom:1px solid #e0e0e0;
            }
            .comment-list{
                color:#333;
                ul {

                    li{
                        p{
                            margin: 0.3rem 0;
                        }
                        & > p:nth-child(1){
                            font-size:16px;
                        }
                        & > p:nth-child(2){
                            font-size: 12px;
                            color: #999;
                        }
                        & > p:nth-child(3){
                            font-size: 18px;
                        }
                    }

                }

            }
        }
        .van-popup{
            &--right {
                width: 100%;
                height: 100%;
            }

            .answer-content{
                margin-top:46px;
                position:relative;
                .loading{
                    display: flex;
                    justify-content:center;
                    align-items:center;
                    height: 100%;
                    width:100%;
                    position:absolute;
                }
            }
        }
    }
</style>