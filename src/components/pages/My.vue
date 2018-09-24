<template>
    <div class="my">
        <div class="login">
            <p>
                <van-button type="primary" size="large" @click="register">注 册</van-button>
            </p>
            <p>
                <van-button type="default" size="large" @click="login">登 录</van-button>
            </p>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            register() {
                this.$router.push({name:'Register'})
            },
            login(){
                this.$router.push({name:'Login'})
            }
        }
    }
</script>

<style lang="less" scoped>
    .my {
        .login {
            margin-top: 10rem;
            display: flex;
            flex-direction: column;
            & > p {
                padding: 0 1rem;
            }
        }
    }
</style>