<template>
    <div>
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
                        <van-cell v-for="item in article_list" :key="item" :title="item + ''" />
                    </div>

                </van-list>
            </van-pull-refresh>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                searchValue: '',
                list: [],
                loading: false,   //是否处于加载状态
                finished: false,  //是否已加载完所有数据
                isLoading: false,   //是否处于下拉刷新状态
            }
        },
        props:['article_list','clipHeight'],
        methods:{
            onSearch() {            //搜索

            },
            onLoad() {              //上拉加载
                setTimeout(() => {
                    this.$emit('article_load',this)
                }, 500);
            },
            onRefresh() {       //下拉刷新
                setTimeout(() => {
                    this.finished = false
                    this.isLoading = false
                    this.$emit('clear_list')
                  //  this.onLoad()
                }, 500);
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight                          //视口大小
            document.getElementById('list-content').style.height = (winHeight - this.clipHeight - 44) +'px'  //调整上拉加载框高度
        }
    }
</script>

<style scoped>
    .list-content{
        overflow:scroll;
    }
    .list-item{
        text-align:center;
    }
</style>