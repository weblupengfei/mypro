<template>
    <el-form  :model="seachForm" label-width="80px" inline :rules='rules' ref='subFormEdit'>
        <el-form-item v-for='item in formLabel' :key='item.model' :label='item.label' style='font-size:12px' :prop='item.model'>
            <el-input v-model='seachForm[item.model]' v-if="item.type==='input'" :disabled="editType==='add'?false:item.disabled" ></el-input>
            <!-- 密码 -->
            <el-input v-model='seachForm[item.model]' v-if="item.type==='password'" :type='item.type' :prop='item.model'></el-input>
            <!-- 性别 -->
            <el-radio-group v-model='seachForm[item.model]'>
                <el-radio   v-for='temp in item.radio' :key='temp.value' :label="temp.value">{{temp.label }}</el-radio>
            </el-radio-group> 
            <!-- 选择部门 -->
            <el-select ref='select' v-model='seachForm.dept' placeholder="请选择" v-if="item.type==='treeSelect'" clearable >
                <el-option style='height:auto' :value='valueId' :key='valueId' >
                    <el-tree ref="tree"  :data="deptList" :props='defaultProps' default-expand-all check-strictly   :expand-on-click-node='false' @node-click="handleNodeClick" >
                    </el-tree>
                </el-option>
            </el-select> 
            <!-- 选择角色 -->
             <el-select v-model='seachForm[item.model]' placeholder='请选择' v-if="item.type==='select'"  clearable>
                 <el-option v-for='item in identityList' :key='item.id' :value='item.label' :label='item.label'></el-option>
             </el-select>
             <!-- 状态 -->
            <el-switch v-model='seachForm[item.model]' v-if="item.type==='switch'" :inline='false'></el-switch>
        </el-form-item>
        <!-- 按钮插槽 -->
        <el-form-item>
            <slot></slot>
        </el-form-item>
    </el-form>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['deptList'])
    },
    data(){
        return{
            valueId:null,
            valueTitle:''
        }
    },
    props:{
        formLabel:Array,
        seachForm:Object,
        editType:String,
        identityList:Array,
        rules:Object,
        defaultProps: {
            id:'id',
            children: "children",
            label: "label"
        },
        options:{type:Array},
        //初始值
        value:{type:String}
    },
    methods:{
        handleNodeClick(node){
            //console.log(node)
            this.seachForm.dept=node.label
            this.valueId=node.id
        },
        //uname失去焦点验证
    }
    // watch:{
    //     valueTitle(){
    //         if(this.valueTitle){
    //             this.$refs.select.visible=false
    //         }
    //     }
    // }
}
</script>
<style  lang='scss'>
.el-dialog{
        .el-form-item{
             margin:10px;
            .el-input__inner,.el-form-item__content{
                width:200px;
            }
            
        }
    }
.el-form-item{
    height:30px;
    line-height: 27px;
    margin:0;
    .el-form-item__label{
        font-size:10px; 
        line-height: 30px;       
    }
    .el-input__inner{
        height:30px;
        line-height: 30px;
        width:200px;
    }
    .el-form-item__content{
        line-height: 27px;
    }
    .el-input__icon{
        line-height: 30px;
    }
}
    

.el-tree-node__content{
    font-weight: normal;
  }
    
    
</style>