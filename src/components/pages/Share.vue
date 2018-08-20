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
      <p>Share.vue</p>
      <p>Share.vue</p>   
      <p>Share.vue</p>   
      <p>Share.vue</p>   
      <p>Share.vue</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue:'',
    };
  },
  methods:{
    onSearch(){
      
    }
  }
};
</script>

<style scoped>
</style>
