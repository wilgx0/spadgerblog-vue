<template>
    <div class="register">

        <h1 class="title">注册</h1>

        <div class="content">
            <van-cell-group>
                <van-field
                        v-model="username"
                        clearable
                        label="用户名"
                        icon="question"
                        placeholder="请输入用户名"
                        @click-icon="$toast('question')"
                        v-validate="'required|max:20'"
                        name="用户名"
                />

                <van-field
                        v-model="password"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        v-validate="'required|max:20'"
                        name="密码"
                />
                <van-field
                        v-model="rpassword"
                        type="password"
                        label="重复密码"
                        placeholder="请再次输入密码"
                        v-validate="'required|max:20'"
                        name="重复密码"
                />
            </van-cell-group>
            <div class="btn">
                <van-button type="primary" size="large" @click="register" :loading="openLoading">注册</van-button>
            </div>
            <div class="btn">
                <van-button type="default" size="large" @click="reset">重  置</van-button>
            </div>
        </div>

        <div v-show="errors.any()" v-cloak class="validate-error">
            <p v-for="(v,i) in errors.all()">{{v}}</p>
        </div>
    </div>
</template>

<script>

    import Tool from '@/common.js'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant'
    export default {
        data(){
            return {
                username:'',
                password:'',
                rpassword:'',
                openLoading:false,
            }
        },
        methods:{
            register(){
                this.$validator.validateAll().then( result => {
                    if(result){
                        if(this.password != this.rpassword){
                            Toast.fail('两次输入的密码不一致!');
                            return false
                        }
                        this.openLoading = true
                        let postData = Tool.stringify({
                            username:this.username,
                            password:this.password,
                            device_type:'mobile'
                        })

                        this.$http({
                            url:url.register,
                            method:'post',
                            data:postData
                        })
                        .then( response => {
                            var data = Tool.getAxiosData(response)
                            //console.log(data)
                            if(data && data.code == 1){
                                this.reset()
                                Toast.success(data.msg);
                                this.$router.push({name:'Login'})
                            }
                            this.openLoading = false
                        })
                        .catch(error=>{
                            console.log(error)
                            this.openLoading = false
                        })
                    }
                })
            },
            reset(){
                this.username = ''
                this.password = ''
                this.rpassword = ''
            }
        }
    }
</script>

<style lang="less" scoped>
    .register{
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