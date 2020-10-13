<template>
    <el-menu default-active="/" class="el-menu-vertical-demo"  background-color="#545c64"
      text-color="#fff"  unique-opened
      active-text-color="#ffd04b"  :collapse="isCollapse" 
     >
       <template v-for='(item,key) in asideMenu'>
        <!-- 有子菜单 -->
        <el-submenu :index="String(key)" v-if='item.children&&item.children.length' :key='key' >
            <template slot="title">
            <i :class='`el-icon-${item.icon}`'></i>
            <span>{{item.label}}</span>
            </template>
            <el-menu-item-group >
                <el-menu-item :index="subItem.path" v-for='subItem in item.children' :key='subItem.path' @click='add(subItem)'>
                    {{subItem.label}}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- 没有子菜单 -->
        <el-menu-item :index="item.path" v-if='!item.children' @click='add(item)' :key='key'>
            <i :class='`el-icon-${item.icon}`'></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
      </template>
    </el-menu>

</template>
<script>
import {mapState} from 'vuex'
    export default{
        computed:{
            // haschildren(){
            //     return this.asideMenu.filter(item=> item.children)
            // },
            // nochildren(){
            //     return this.asideMenu.filter(item=> !item.children)
            // },
            isCollapse(){
                return this.$store.state.isCollapse
            }
        },
        data(){
            return{
                asideMenu:[
                    {path:'/',name:'home',label:'首页',icon:'s-home'},
                    {label:'应用'},
                    {path:'/user',name:'user',label:'账号管理', icon:'user'},
                    {label:'客户管理',icon:'s-custom',children:[
                        {path:'/customer',name:'customer',label:'客户列表',}
                    ]},
                    {label:'工作微信',icon:'chat-round',children:[
                        {path:'/wxRecord',name:'wxRecord',label:'微信记录'}
                    ]},
                    {path:'/callRecords',name:'callRecords',label:'电话记录',icon:'mobile-phone'},
                    {path:'/msgRecords',name:'msgRecords',label:'短信记录', icon:'message'}
                ]
            }
        },
        methods:{
            add(item){
                this.$router.push(item.path)
                this.$store.commit('addTab',item)
                //console.log(1)
            }

        }
    }
</script>
<style lang="scss" scoped>
    .el-menu{
        height:100%;
        border:none;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
   }
   .active{
       color:rgb(255, 208, 75);
   }
</style>