<template>
    <div class="sharepage">
        <van-nav-bar
                title="文章分享"
                left-text="返回"
                right-text="发布"
                fixed
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <div class="content">
            <van-cell-group>
                <van-field v-model="title" placeholder="请输入文章标题" />
            </van-cell-group>
            <van-cell-group>
                <van-field
                        v-model="excerpt"
                        type="textarea"
                        placeholder="请输入摘要"
                        rows="3"
                        autosize
                />
            </van-cell-group>
            <vue-html5-editor :content="content" :height="editHeight"
                @change="updateData"></vue-html5-editor>
        </div>
    </div>
</template>

<script>
    import initRichText from '@/common/initHTMLEditor'
    initRichText()
    import { Toast } from 'vant'
    import Tool from '@/common.js'
    import url from '@/serviceAPI.config.js'

    export default {
        data() {
            return {
                title:'',               //标题
                content: '请输入文章内容',
                excerpt:'',             //摘要
                editHeight:400,
            }
        },
        methods:{
            clearData(){
                this.title= ''
                this.content = '请输入文章内容'
                this.excerpt = ''
            },
            onClickLeft(){          //返回上一页
                this.$router.go(-1)
            },
            updateData(e = ''){
                this.content = e;
                //console.info(e);
            },
            onClickRight(){                     //发布文章
                if(this.content == '' || this.title == ''){
                    Toast.fail('文章标记及内容不能为空')
                    return
                }
                let postData = Tool.stringify({
                    categories:1,
                    post_title:this.title,
                    post_content:this.content,
                    post_excerpt:this.excerpt,
                })
                let userInfo = Tool.getToken()
                if(userInfo){
                    this.$http({
                        url:url.addAtricles,
                        method:'post',
                        data:postData,
                        headers:{
                            'XX-Token':userInfo.token,
                            'XX-Device-Type':userInfo.device,
                        },
                    }).then(response=>{
                        console.log(response)
                        if(response.status != 200){
                            Toast.fail('网络错误，未能请求到数据!');
                            return;
                        }
                        let data = response.data
                        if (data.code != 1) {
                            Toast.fail('服务器错误，未能请求到数据!');
                            return;
                        }
                        Toast.success(data.msg)
                        this.clearData()
                    }) .catch(err=>{
                        console.log(err)
                    })
                }

            },
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            this.editHeight = winHeight - 46 - 38 - 44 - 92;
        }
    }
</script>

<style lang="less" scoped>
    .sharepage{
        .content{
            margin-top:46px;
        }
    }
</style>