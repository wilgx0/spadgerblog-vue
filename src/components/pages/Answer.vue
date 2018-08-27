<template>
    <div>
        <article_list
                :article_list="list"
                :article_loading = "loading"
                :article_finished = "finished"
                :article_isloading = "isLoading"
                @article_load="onLoad"
        ></article_list>
    </div>
</template>

<script>
    import List from '@/components/component/List.vue'

    export default {
        data() {
            return {
                list:[],
                loading: false,     //是否处于加载状态
                finished: false,    //是否已加载完所有数据
                isLoading: false,   //是否处于下拉刷新状态
            }
        },
        methods: {
            onSearch() {

            },
            onLoad(){               //上拉加载
                //console.log('test')
                setTimeout(() => {
                    for (let i = 0; i < 15; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    this.loading = false;
                    if (this.list.length >= 60) {
                        this.finished = true;
                    }
                }, 500);
            }
        },
        components:{
            article_list:List
        }

    }
</script>

<style scoped>

</style>
