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
                    <slot name="list_item"></slot>
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
        props:['clipHeight'],
        methods:{
            onSearch() {            //搜索
                this.$emit('onSearch',this.searchValue)
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
            let loadHeight = winHeight - this.clipHeight - 44
            document.getElementById('list-content').style.height = loadHeight +'px'         //调整上拉加载框容器高度

        }
    }
</script>

<style scoped>
    .list-content{
        overflow:scroll;
    }
</style>