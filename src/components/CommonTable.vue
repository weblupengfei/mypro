<template>
    <div class='common-table'>
        <el-table :data="tableData" height='380' stripe v-loading='config.loading' @selection-change='selectRows' >
            <el-table-column prop="date" label='序号' width='70'  >
                <template slot-scope="scope">
                    <span style="margin-left: 10px;padding:0">{{scope.$index +1}}</span>
                </template>
            </el-table-column>
            <el-table-column type="selection"  width="55"  > </el-table-column>
            <el-table-column v-for='item in tableLabel' :key='item.prop' :label='item.label' show-overflow-tooltip>
                <template slot-scope="scope" >
                    <el-tooltip :content="scope.row.ustate?'已启用':'已禁用'" placement='right'>
                        <el-switch  v-model='scope.row.ustate' v-if="item.prop=='state'" :active-value='true' :inactive-value='false' @change='changeState(scope.row)'>
                        </el-switch>
                    </el-tooltip>
                    <span style="margin-left: 10px;font-size:12px;">{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width='150'>
                <template slot-scope="scope"> 
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChange" @prev-click='prev' @next-click='next' @current-change='change' :current-page.sync="config.page" :page-sizes="[20, 50, 200, 500]" :page-size.sync="config.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="config.total">
        </el-pagination>
    </div>
</template>
<script>
export default { 
    props:{
        tableData:Array,
        tableLabel:Array,   
        config:Object
    },
    data(){
        return {
            pageSize:null,
            
        }
    },
    methods:{
        handleEdit(val){this.$emit('edit',val)},
        handleDelete(val){this.$emit('del',val)},
        sizeChange(pageSize){
            this.$emit('changeSizePage',pageSize)
        },
        prev(page){this.$emit('changePage',page)},
        next(page){this.$emit('changePage',page)},
        change(page){this.$emit('changePage',page)},
        changeState(val){this.$emit('changState',val)},
        //表格行选中
        selectRows(val){
            this.$emit('selectRow',val)
        }
    }
}
</script>
<style lang='scss'>
    .el-table{
        padding-top:10px;
       
            td{
                padding:5px 0;
            }
        
    }


</style>