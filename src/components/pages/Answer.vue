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
        <article_list></article_list>
    </div>
</template>

<script>
    import List from '@/components/component/List.vue'

    export default {
        data() {
            return {
                searchValue: '',
            }
        },
        methods: {
            onSearch() {

            }
        },
        components:{
            article_list:List
        }

    }
</script>

<style scoped>

</style>
