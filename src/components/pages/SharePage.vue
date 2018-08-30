<template>
    <div class="sharepage">
        <van-nav-bar
                title="文章分享"
                left-text="返回"
                fixed
                left-arrow
                @click-left="onClickLeft"
        />
        <div class="content">
            <vue-html5-editor :content="content" :height="editHeight"
                @change="updateData"></vue-html5-editor>
        </div>
    </div>
</template>

<script>
    import initRichText from '@/common/initHTMLEditor'
    initRichText()

    export default {
        data() {
            return {
                content: '',
                editHeight:400,
            }
        },
        methods:{
            onClickLeft(){          //返回上一页
                this.$router.go(-1)
            },
            updateData(e = ''){
                this.content = e;
                console.info(e);
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            this.editHeight = winHeight - 46 - 30;
        }
    }
</script>

<style lang="less" scoped>
    .sharepage{
        .content{
            margin-top:46px;
        }
    }
</style>