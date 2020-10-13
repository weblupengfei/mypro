<template>
    <header>
        <div class='left'>
            <el-button type="primary" icon="el-icon-menu" size='mini' @click='isCollapse()'></el-button>
            <!-- <div class="callOut">
                <input type='text' placeholder='输入电话号码'>
                <span class='el-icon-phone-outline' title='点击拨号'> </span>
                <span class='el-icon-message' title='发送短信'></span>
            </div> -->
        </div>
        
        <div class='right'>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <img :src="image" alt="" class='userImage'>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="icon el-icon-user-solid">个人设置</el-dropdown-item>
                    <el-dropdown-item icon='icon el-icon-switch-button'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<script>
import {mapState} from 'vuex'
    
    export default{
        computed:{
            
        },
        data(){
            return{
                image: require('../assets/images/head.jpg')
            }
        },
        methods:{
            isCollapse(){
                this.$store.commit('isCollapse')
            }
        }
    }
</script>
<style lang="scss" scoped>
    header{
        display:flex;
        height:100%;
        align-items: center;
        justify-content:space-between;
    }
    .right{
        display:flex;
        align-items:center;
        .userImage{
            width:40px;
            height:40px;
            border-radius:50%;
        }
    }
    .left{
        width:400px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        .callOut{
            position:relative;
            width:250px;
            height:35px;
            border:1px solid rgb(248, 233, 233);
            box-sizing:border-box;
            border-radius:20px;
            line-height:35px;
            // background-image:linear-gradient(to right,#ddd4d4,#d0d3e6);
            background:#eee;
            .el-icon-phone-outline,.el-icon-message{
                position:absolute;
                width:10px;
                height:10px;
                font-size: 20px;
                left:180px;
                top:7px;
            }
            .el-icon-message{
                left:210px;
            }
            input{
                position:absolute;
                height:20px;
                width:150px;
                outline:none;
                border:0;
                margin-left:15px;
                top:7px;
                font-size:12px;
                background:none;
            }
        }
    }
     .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
    }
</style>