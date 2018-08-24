<template>
    <div class='share'>
        <van-search
                v-model="searchValue"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch"
        >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>

        <div class="list-content" id="list-content">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                        :offset="20"
                >
                    <div class="list-item" :style="{minHeight:itemHeight + 'px'}" v-for="(item,index) in list" :key="index">
                        <van-row>
                            <van-col span="24"><span class="title">{{item.post_title}}</span></van-col>
                        </van-row>
                        <van-row>
                            <van-col span="10">作者</van-col>
                            <van-col span="7">阅读</van-col>
                            <van-col span="7">日期</van-col>
                        </van-row>
                    </div>

                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import url from '@/serviceAPI.config.js'
    import Tool from '@/common.js'

    export default {
        data() {
            return {
                searchValue: "",          //搜索关键字
                list: [],                 //数据列表
                loading: false,           //是否处于加载状态
                finished: false,          //是否已加载完所有数据
                isLoading: false,         //是否处于下拉刷新状态
                current_page:0,            //当前页数
                itemHeight:0,              //数据列表中各项的高度
            };
        },
        methods: {
            onSearch() {                //搜索的方法
            },
            onLoad() {                  //上拉加载
                setTimeout(()=>{
                    this.$http({
                        url:url.getShareList,
                        method:'get',
                        params:{
                            page: ++ this.current_page
                        }
                    }).then(response=>{
                        this.loading = false;
                        if(response.status == 200 ){
                            let data = response.data
                            let last_page = data.data.last_page
                            if (this.current_page >= last_page) {
                                this.finished = true
                            }
                            if(data.code == 1){
                                this.list = this.list.concat(data.data.data)

                            } else {
                                Toast.fail('服务器错误，未能请求到数据!');
                                this.finished = true
                            }
                        } else {
                            Toast.fail('网络错误，未能请求到数据!');
                            this.finished = true
                        }

                    }).catch(err=>{
                        this.loading = false;
                        this.finished = true
                        console.log(err)

                    })
                },500)

            },
            onRefresh() {       //下拉刷新
                setTimeout(() => {
                    this.finished = false
                    this.isLoading = false
                    this.list = []
                    this.current_page = 0
                }, 500);
            }
        },
        mounted() {
            let pageSize = 15
            let winHeight = document.documentElement.clientHeight                               //视口高度
            let loadHeight = winHeight - 44 - 50;                                               //视口高度减去头部和底部的高度
            document.getElementById('list-content').style.height = loadHeight + 'px'            //调整上拉加载框高度
            this.itemHeight = loadHeight / pageSize + 5
        }
    };
</script>

<style lang='less' scoped>
    .share {
        .list-content {
            overflow: scroll;
            .list-item{
                font-size:14px;
                padding: 0.5rem;
                border-bottom: 2px solid #f0f0f0;
                .title{
                    color:#2e3135;
                    font-weight:bold;
                }
            }
        }
    }
</style>
