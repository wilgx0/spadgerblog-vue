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
                        :offset="10"
                >
                    <div class="list-item">
                        <van-row v-for="item in list" :key="item">
                            <van-col span="24">{{item.post_title}}</van-col>
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
                current_page:1,            //当前页数
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
                            page:this.current_page ++
                        }
                    }).then(response=>{
                        this.loading = false;
                        //console.log(response)
                        if(response.status == 200 ){
                            let data = response.data
                            let last_page = data.data.last_page
                            if (this.current_page >= last_page) {
                                this.finished = true;
                            }
                            if(data.code == 1){
                                this.list = this.list.concat(data.data.data)
                            } else {
                                Toast.fail('服务器错误，未能请求到数据!');
                            }
                        } else {
                            Toast.fail('网络错误，未能请求到数据!');
                        }
                    }).catch(err=>{
                        this.loading = false;
                        console.log(err)
                    })
                },500)
                setTimeout(() => {
                    for (let i = 0; i < 15; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    this.loading = false;
                    if (this.list.length >= 60) {
                        this.finished = true;
                    }
                }, 500);
            },
            onRefresh() {       //下拉刷新
                setTimeout(() => {
                    this.finished = false;
                    this.isLoading = false;
                    this.list = []
                    this.onLoad()
                }, 500);
            }
        },
        mounted() {
            let winHeight = document.documentElement.clientHeight   //视口高度
            document.getElementById('list-content').style.height = (winHeight - 44 - 50) + 'px' //调整上拉加载框高度
        }
    };
</script>

<style lang='less' scoped>
    .share {
        .list-content {
            overflow: scroll;
        }
    }
</style>
