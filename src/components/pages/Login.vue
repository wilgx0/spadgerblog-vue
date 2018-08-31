<template>
    <div class="login">

            <h1 class="title">登录</h1>

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
                </van-cell-group>
                <div class="btn">
                    <van-button type="primary" size="large" @click="LoginAction" :loading="openLoading">登  录</van-button>
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
    import {mapGetters} from 'vuex'
    import { Toast } from 'vant'

    export default {
        data(){
            return {
                username:'',
                password:'',
                openLoading:false,
            }
        },
        methods:{
            LoginAction(){      //登录操作
                this.$validator.validateAll().then(result=>{
                    if(result){
                        this.openLoading = true
                        let postData = Tool.stringify({
                            username:this.username,
                            password:this.password,
                            device_type:'mobile'
                        })

                        this.$http({
                            url:url.login,
                            method:'post',
                            data:postData
                        })
                        .then( response => {
                            if(response.status == 200 ){
                                if(response.data.code == 1 ){
                                    new Promise((resolve,reject)=>{
                                        let data = response.data.data
                                        localStorage.setItem('XX-Token',data.token);
                                        localStorage.setItem('XX-Device-Type', 'mobile');
                                        localStorage.setItem('user', JSON.stringify(data.user));
                                        setTimeout(()=>{
                                            resolve()
                                        },500)
                                    }).then(()=>{           //登录成功
                                        Toast.success(response.data.msg)
                                        this.$store.dispatch('isLoginAction',true)
                                        this.$router.push('/')
                                    }).catch(err=>{
                                        Toast.fail('登录状态保存失败')
                                        console.log(err)
                                    })
                                } else {
                                    Toast.fail(response.data.msg);
                                }
                            } else {
                                Toast.fail('登录请求失败请稍后再试');
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
            }
        },
        created(){
            (async ()=>{
                if(this.isLogin){
                    this.$router.push('/')
                } else {
                    let ret = await Tool.isLogin()
                    if(ret == 2){
                        this.$store.dispatch('isLoginAction',true)
                        this.$router.push('/')
                        Toast.success('已成功登录!');
                    } else {
                        this.$store.dispatch('isLoginAction',false)
                    }
                }
            })()
        },
        computed:{
            ...mapGetters(['isLogin']),
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