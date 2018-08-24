<template>
    <div class='share'>
        <van-search
                v-model="searchValue"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch"
        >
            <div slot="action" @click="onSearch">{{searchBtnText}}</div>
        </van-search>

        <div class="list-content" id="list-content">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                        :offset="20"
                >
                    <div class="list-item" :style="{minHeight:itemHeight + 'px'}" v-for="(item,index) in list"
                         :key="index" @click="showDetails(item.id)">
                        <div class="title">
                            <van-row>
                                <van-col span="24"><span>{{item.post_title|splitStr(25)}}</span></van-col>
                            </van-row>
                        </div>
                        <van-row>
                            <van-col span="10">{{item.user.user_nickname|splitStr(10)}}</van-col>
                            <van-col span="7">{{item.published_time|published_time_format}}</van-col>
                            <van-col span="7">{{item.post_hits>0 ? item.post_hits:'0'}}次阅读</van-col>
                        </van-row>
                    </div>

                </van-list>
            </van-pull-refresh>
        </div>

        <!--文章详情-->
        <van-popup v-model="showArticle" position="right">
            <van-nav-bar title="文章详情" left-text="返回" @click-left="showArticle = false" left-arrow fixed></van-nav-bar>
            <div v-if="articleloading" class="loading">
                <van-loading type="spinner" color="black"  v-show="articleloading"/>
            </div>
            <div class="Article" id="article" v-else>
                <h1 class="title">{{ArticleData.post_title}}</h1>
                <div class="hits">
                    <van-row>
                        <van-col span="7">阅读:{{ArticleData.post_hits}}</van-col>
                        <van-col span="17">{{ArticleData.published_time}}</van-col>
                    </van-row>
                </div>
                <div class="excerpt">
                    {{ArticleData.post_excerpt}}
                </div>
                <div v-html="ArticleData.post_content" class="content"> </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import url from '@/serviceAPI.config.js'
    import Tool from '@/common.js'
    import { Toast } from 'vant'

    export default {
        data() {
            return {
                searchBtnText:'搜索',
                searchValue: "",          //搜索关键字
                list: [],                 //数据列表
                loading: false,           //是否处于加载状态
                finished: false,          //是否已加载完所有数据
                isLoading: false,         //是否处于下拉刷新状态
                current_page: 0,            //当前页数
                itemHeight: 0,              //数据列表中各项的高度
                showArticle: false,         //文章页面的显示
                ArticleData:{},             //文章详情
                articleloading:false,        //文章加载框的显示
            };
        },
        filters: {
            published_time_format(value) {       //显示日期格式化
                if (!value) {
                    return;
                }
                let ret = value.split(' ')
                return ret[0]
            },
            splitStr(value,len){
                return Tool.splitStr(value,len)
            }
        },
        watch:{
            articleloading:function(val){
                if(val === false){
                    setTimeout(()=>{
                        let winHeight = document.documentElement.clientHeight
                        document.getElementById('article').style.height = winHeight - 44 + 'px'
                    },300)
                }
            }
        },
        methods: {
            showDetails(id) {          //显示文章详情
                this.articleloading = true
                this.ArticleData = {}
                this.showArticle = true
                this.$http({
                    url:url.getArticleById,
                    method:'get',
                    params:{
                        id :id
                    }
                }).then(response=>{
                    //console.log(response);
                    if(response.status != 200){
                        Toast.fail('网络错误，未能请求到数据!');
                        return;
                    }
                    let data = response.data
                    if (data.code != 1) {
                        Toast.fail('服务器错误，未能请求到数据!');
                        return;
                    }
                    this.ArticleData = data.data
                    this.articleloading = false
                }).catch(err=>{
                    console.log(err)
                })
            },
            onSearch() {                //搜索的方法
                if(this.searchValue && this.searchBtnText == '搜索'){
                    this.searchBtnText = '取消'
                    this.onRefresh()
                }
                else if(this.searchBtnText == '取消'){
                    this.searchValue = ''
                    this.searchBtnText = '搜索'
                    this.onRefresh()
                }
                else {
                    Toast.fail('请输入查询关键字!');
                }
            },
            onLoad() {                  //上拉加载
                setTimeout(() => {
                    this.$http({
                        url: url.getShareList,
                        method: 'get',
                        params: {
                            page: ++this.current_page,
                            key:this.searchValue,       //查询关键字
                        }
                    }).then(response => {
                        this.loading = false;
                        if (response.status == 200) {
                            let data = response.data
                            let last_page = data.data.last_page
                            if (this.current_page >= last_page) {
                                this.finished = true
                            }
                            if (data.code == 1) {
                                this.list = this.list.concat(data.data.data)
                            } else {
                                Toast.fail('服务器错误，未能请求到数据!');
                                this.finished = true
                            }
                        } else {
                            Toast.fail('网络错误，未能请求到数据!');
                            this.finished = true
                        }

                    }).catch(err => {
                        this.loading = false;
                        this.finished = true
                        console.log(err)

                    })
                }, 500)

            },
            onRefresh() {       //下拉刷新
                setTimeout(() => {
                    this.finished = false
                    this.isLoading = false
                    this.list = []
                    this.current_page = 0
                    this.onLoad()
                }, 500);
            }
        },
        mounted() {
            let pageSize = 10           //分页大小
            let headHeight = 44         //头部的高度
            let footHeight = 50         //底部的高度
            let winHeight = document.documentElement.clientHeight                               //视口高度
            let loadHeight = winHeight - headHeight - footHeight;                              //视口高度减去头部和底部的高度
            document.getElementById('list-content').style.height = loadHeight + 'px'            //设置上拉加载框最小高度
            this.itemHeight = loadHeight / pageSize + 5                                         //设置列表框每一行的最小高度
        }
    };
</script>

<style lang='less' scoped>
    .share {
        .list-content {
            overflow: scroll;
            .list-item {
                font-size: 10px;
                padding: 0.5rem;
                border-bottom: 2px solid #f0f0f0;
                .title {
                    font-size: 14px;
                    color: #2e3135;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }
            }
        }
        .van-popup {
            &--right {
                width: 100%;
                height: 100%;
            }
            .loading{
                display: flex;
                justify-content:center;
                align-items:center;
                height: 100%;
            }
            .Article{
                margin-top:44px;
                overflow: scroll;
                box-sizing: border-box;
                padding:0.5rem;
                color:#333;
                .title{
                    font-size:24px;
                }
                .hits{
                    font-size:12px;
                    color:#666;
                    margin:1rem 0;
                }
                .excerpt{
                    font-size:14px;
                    background-color:#e4f1eb;
                    margin-bottom:1rem;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                }
                .content{
                    font-size:15px;
                }
            }
        }


    }

</style>
