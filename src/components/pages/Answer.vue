<template>
    <div>
        <article_list
                :article_list="list"
                :clipHeight="50"
                @article_load="onLoad"
                @clear_list = 'onClearList'
        ></article_list>
    </div>
</template>

<script>
    import List from '@/components/component/List.vue'

    export default {
        data() {
            return {
                list:[],
            }
        },
        methods: {
            onSearch(){

            },
            onClearList(){
                this.list = [];
            },
            onLoad(el){               //上拉加载
                setTimeout(() => {
                    for (let i = 0; i < 15; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    el.loading = false;
                    if (this.list.length >= 60) {
                        el.finished = true;
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
