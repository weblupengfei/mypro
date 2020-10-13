<template>
    <el-container style='height:100%'>
        <el-aside width="auto">
            <Aside></Aside>
        </el-aside>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <Tab></Tab>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import Header from '../components/CommonHeader.vue'
import Aside from '../components/CommonAside.vue'
import Tab from '../components/CommonTab.vue'
export default {
    components:{
        Header,
        Aside,
        Tab
    }
}
</script>
<style lang="scss">
    .el-header{
        background:#000;
    }
    .el-main{
        padding:10px;;
    }
</style>