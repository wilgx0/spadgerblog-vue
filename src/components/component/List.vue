<template>
    <div class="my-list">
        <div class="head">
            <div class="head-left" @click="onHeadLeft"><van-icon name="records" /><span>{{headLeftName}}</span></div>
            <div class="head-right">
                <van-search
                        v-model="searchValue"
                        placeholder="请输入搜索关键词"
                        show-action
                        @search="onSearch"
                >
                    <div slot="action" @click="onSearch">搜索</div>
                </van-search>
            </div>

        </div>

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
        props:['clipHeight','headLeftName'],
        methods:{
            onHeadLeft(){
                this.$emit('onHeadLeft')
            },
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

<style lang="less" scoped>
    .my-list{
        .head{
            display:flex;
            align-items:center;
            .head-left{
                flex:1.6;
                font-size: 14px;
                background-color:rgb(242, 242, 242);
                height: 44px;
                line-height: 44px;
                text-indent: 0.2rem;
                & > i {
                    top: 0.1rem;
                    left: -0.1rem;
                }
            }
            .head-right{
                flex:8.4;
            }
        }
        .list-content{
            overflow:scroll;
        }
    }

</style>