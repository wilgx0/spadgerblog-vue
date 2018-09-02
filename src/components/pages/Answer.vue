<template>
    <div class="answer">
        <article_list
                clipHeight="50"
                headLeftName = "提问"
                @article_load="onLoad"
                @clear_list = 'onClearList'
                @onSearch = 'onSearch'
                @onHeadLeft = 'onHeadLeft'
        >
            <div slot="list_item">
                <div v-for="(item,index) in list" :key="index" :style="{minHeight:itemHeight + 'px'}" class="list-item">
                    <van-row >
                        <div class="title">
                            <van-col span="18">{{item.post_title|splitStr(25)}}</van-col>
                        </div>
                        <div class="answer-right">
                            <van-col span="6"><em>已回答</em></van-col>
                        </div>

                    </van-row>
                </div>
            </div>
        </article_list>
    </div>
</template>

<script>
    import List from '@/components/component/List.vue'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant'
    import Tool from '@/common.js'


    export default {
        data() {
            return {
                list:[],
                searchValue: "",            //搜索关键字
                current_page: 0,            //当前页数
                itemHeight:0,               //分页子项目的高度
            }
        },
        methods: {
            onHeadLeft(){                           //提交问题
                console.log('test')
            },
            onSearch(value){                    //搜索
                this.searchValue = value
                console.log(this.searchValue)
            },
            onClearList(){
                this.list = [];
            },
            onLoad(el){               //上拉加载
                setTimeout(() => {
                    this.$http({
                        url: url.getShareList,
                        method: 'get',
                        params: {
                            page: ++this.current_page,
                            key:this.searchValue,       //查询关键字
                            articleType:2,              //文章类型
                        }
                    }).then(response => {
                        el.loading = false;
                        if (response.status == 200) {
                            let data = response.data
                            let last_page = data.data.last_page
                            if (this.current_page >= last_page) {
                                el.finished = true;
                            }
                            if (data.code == 1) {
                                this.list = this.list.concat(data.data.data)
                            } else {
                                Toast.fail('服务器错误，未能请求到数据!');
                                el.finished = true;
                            }
                        } else {
                            Toast.fail('网络错误，未能请求到数据!');
                            el.finished = true;
                        }

                    }).catch(err => {
                        el.loading = false;
                        el.finished = true;
                        console.log(err)

                    })
                }, 500);
            }
        },
        components:{
            article_list:List
        },
        filters: {
            splitStr(value,len){
                return Tool.splitStr(value,len)
            }
        },
        mounted(){
            let pageSize = 15          //分页大小
            let winHeight = document.documentElement.clientHeight                               //视口高度
            let loadHeight = winHeight - 50 - 44;                              //下拉加载容器高度
            this.itemHeight = loadHeight / pageSize + 5                          //分页条目高度
        }
    }
</script>

<style lang="less" scoped>
    .answer{
        .list-item{
            padding:0 1rem;
            border-bottom: 2px solid #f0f0f0;
            box-sizing: border-box;
            padding-top:0.5rem;
            .title{
                font-size: 14px;
                color: #2e3135;
                font-weight: bold;
            }
            .answer-right{
                text-align: right;
                em{
                    font-style:normal;
                    font-size: 12px;
                    background-color:red;
                    border-radius:5px;
                    padding:3px;
                    color:#fff;
                    display:inline-block;
                }
            }
        }
    }
</style>
