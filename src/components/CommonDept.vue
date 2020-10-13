<template>
    <div class='dept'>
        <el-row in-line='true' class='team'>
            <p>组织架构</p> 
            <el-button type='primary' size='mini' @click='add'>新建部门</el-button>
        </el-row>
        <el-row>
            <el-tree :data="deptList" default-expand-all :expand-on-click-node='false' @node-click="handleNodeClick" >
            </el-tree>
        </el-row>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['deptList'])
    },
    
    methods: {
        handleNodeClick(data) {
            this.$emit('selectDept',data)
        },
        add(){
            this.$emit('addnode')
        }
    }
}
</script>
<style scoped lang='scss'>
.dept{
    height:100%;
    background-color:#eee;
    .team{
        font-size:14px;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
        
}
</style>