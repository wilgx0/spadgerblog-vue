<template>
    <div class="login">

            <h1 class="title">登录</h1>

            <div class="content">
                <van-cell-group>
                    <van-field
                            v-model="username"
                            required
                            clearable
                            label="用户名"
                            icon="question"
                            placeholder="请输入用户名"
                            @click-icon="$toast('question')"
                    />

                    <van-field
                            v-model="password"
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            required
                    />
                </van-cell-group>
                <div class="btn">
                    <van-button type="primary" size="large">登  录</van-button>
                </div>
                <div class="btn">
                    <van-button type="default" size="large">重  置</van-button>
                </div>
            </div>

    </div>

</template>

<script>
    export default {
        data(){
            return {
                username:'',
                password:'',
            }
        }
    }
</script>

<style lang="less" scoped>
    .login{
        .title{
            text-align: center;
        }
        .content{
            .btn{
                margin-top:1rem;
                padding:0 1rem;
            }
        }
    }
</style>