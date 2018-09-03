<template>
    <div class="answer-details">
        <van-nav-bar title="问题详情" left-text="返回" @click-left="$router.go(-1)" left-arrow fixed></van-nav-bar>
        <div class="content">
            <h1>
                标题
            </h1>
            <div class="describe">
                描述
            </div>
            <van-button type="primary" @click="showAnswer">我来回答</van-button>
        </div>
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
                content: '选填，请详细描述您的问题',
                editHeight:400,         //编辑器的高度
                loadingShow:false,      //加载图标的显示
                commentList:[],          //评论列表
            }
        },
        methods:{
            clearData(){
                this.content = '选填，请详细描述您的问题'
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
                            page: currentPage + ',10',
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
            getCommentById(){               //根据文章id获取评论

            }
        },
        created(){
            let winHeight = document.documentElement.clientHeight
            this.editHeight = winHeight - 38 - 46;
            //获取评论的相关内容
            (async () =>{
                let response = await this.getCommentList(this.$route.params.id)
                if(response.status != 200){
                    Toast.fail('网络错误，未能请求到数据!')
                    return
                }
                let data = response.data
                if (data.code != 1) {
                    if(data.msg){
                        Toast.fail(data.msg)
                    } else {
                        Toast.fail('服务器错误，未能请求到数据!')
                    }
                    return
                }
                this.commentList = data.data[0]
                console.log(this.commentList)
            })()
        }
    }
</script>

<style lang="less" scoped>
    .answer-details{
        .content{
            margin-top:46px;
            padding:1rem;

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