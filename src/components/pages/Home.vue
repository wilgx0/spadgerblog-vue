<template>
  <div >
        <div class="main-div">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>

        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="home">分享</van-tabbar-item>
            <van-tabbar-item icon="description">问答</van-tabbar-item>
            <van-tabbar-item icon="contact">我的</van-tabbar-item>
        </van-tabbar> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: "Share" });
          break;
        case 1:
          this.$router.push({ name: "Answer" });
          break;
        case 2:
          this.$router.push({ name: "My" });
          break;
      }
    }
  }
};
</script>

<style scoped>
</style>