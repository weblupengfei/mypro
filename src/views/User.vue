<template>
  <el-row class="user">
    <el-dialog
      :title="editType=='addDept'?'新建部门':editType=='add'? '新增用户':'编辑用户'"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      @close="closeEvent"
      v-if="isShow"
    >
      <Form
        class="edit"
        :formLabel="editLabel"
        :seachForm="editForm"
        :deptList="deptList"
        :identityList="identityList"
        :rules="rules"
        :editType.sync="editType"
        ref="formEdit"
      ></Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title='批量修改' width='30%' class='both' v-if='allupdateShow' :visible.sync='allupdateShow' @close="closeEvent">
        <Form :formLabel='bothLabel' :seachForm='bothForm' :deptList='deptList' :identityList='identityList' :rules='rules' ref='updateForm'></Form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeEvent">取 消</el-button>
          <el-button type="primary" @click="bothSubmit">保存</el-button>
        </div>
    </el-dialog>    
    <el-col :span="4" class="left">
      <Dept @selectDept="select" @addnode="addnode"></Dept>
    </el-col>
    <el-col :span="20" class="right">
      <div class="form">
        <div>
          <el-button type="primary" size="mini" @click="add">新增</el-button>
          <el-button type="primary" size="mini" @click='bothIdentity'>角色</el-button>
          <el-button type="primary" size="mini" @click='bothDept'>部门</el-button>
        </div>

        <Form :formLabel="formLabel" :seachForm="seachForm" :deptList="deptList">
          <el-button type="primary" size="mini">搜索</el-button>
        </Form>
      </div>
      <Table
        class="table"
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getUser"
        @changeSizePage="getUser"
        @edit="edit"
        @del="del"
        @changState="changeState"
        @selectRow='selectTable'
      ></Table>
    </el-col>
  </el-row>
</template>
<script>
import Form from "../components/CommonForm";
import Table from "../components/CommonTable";
import Dept from "../components/CommonDept";
export default {
  components: {
    Form,
    Table,
    Dept
  },
  data() {
    //用户名验证
    var checkUname = (rule, value, callback) => {
      if (this.editType == "add") {
        if (!value) {
          return callback(new Error("请输入用户名"));
        } else if (/^[a-z0-9]{3,12}$/.test(value)) {
          const url = "http://127.0.0.1:3000/check";
          const input = `uname=${value}`;
          this.axios.post(url, input).then(res => {
            //console.log(res)
            if (res.data.code == -1) {
              return callback(new Error("用户名已被注册"));
            } else {
              return callback();
            }
          });
        } else {
          return callback(new Error("英文或数字，长度再3-12之间"));
        }
      } else {
        return callback();
      }
    };
    //密码验证
    var regUpwd = (rule, value, callback) => {
      if (this.editType == "add") {
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[~!@#$%^&*])[\da-z~!@#$%^&*]{6,12}$/; //必须包含数字字母特殊符号，6-12位
        if (!value) {
          return callback(new Error("请输入密码"));
        } else if (!reg.test(value)) {
          return callback(
            new Error("必须包含数字、字母、特殊符号，长度在6-12之间")
          );
        } else {
          callback();
        }
      }
    };
    //确认密码
    var checkUpwd = (rule, value, callback) => {
      if (this.editType == "add") {
        if (!value) {
          return callback(new Error("请在此输入密码"));
        } else if (value != this.editForm.upwd) {
          console.log(this.editForm.upwd);
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      }
    };
    return {
      editType: "add",
      isShow: false,
      allupdateShow:false,
      bothForm:{
        dept:'',
        identity:''
      },
      bothLabel:[
        {
          model:'dept',
          label:'部门',
          type:'treeSelect'
        },
        {
          model: "identity",
          label: "角色",
          type: "select"
        }
      ],
      editForm: {
        name: "",
        uname: "",
        upwd: "",
        ustate: "",
        sex: "",
        dept: "",
        identity: "",
        phone: ""
      },
      editLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input"
        },
        {
          model: "uname",
          label: "用户名",
          type: "input",
          disabled: true
        },
        {
          model: "upwd",
          label: "密码",
          type: "password"
        },
        {
          model: "checkupwd",
          label: "确认密码",
          type: "password"
        },
        {
          model: "sex",
          label: "性别",
          type: "radio",
          radio: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "ustate",
          label: "状态",
          type: "switch"
        },
        {
          model: "dept",
          label: "部门",
          type: "treeSelect"
        },
        {
          model: "identity",
          label: "角色",
          type: "select"
        },
        {
          model: "phone",
          label: "号码",
          type: "input"
        }
      ],
      deptList: [
        {
          id: "1",
          label: "上海",
          children: [
            {
              id: "2",
              label: "销售部"
            }
          ]
        }
      ],
      deptForm: {
        dept: "",
        dname: ""
      },
      deptLabel: [
        {
          model: "dept",
          label: "上级部门",
          type: "treeSelect"
        },
        {
          model: "dname",
          label: "部门名称",
          type: "input"
        }
      ],
      identityList: [
        {
          id: "1",
          label: "部门经理"
        },
        {
          id: "2",
          label: "员工"
        }
      ],
      seachForm: {
        dept: "",
        keyword: ""
      },
      formLabel: [
        {
          model: "dept",
          label: "部门",
          type: "treeSelect"
        },
        {
          model: "keyword",
          label: "用户名",
          type: "input"
        }
      ],
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "uname",
          label: "用户名"
        },
        {
          prop: "state",
          label: "状态"
        },
        {
          prop: "sexy",
          label: "性别"
        },
        {
          prop: "dept",
          label: "部门"
        },
        {
          prop: "identity",
          label: "角色"
        },
        {
          prop: "phone",
          label: "手机号码"
        }
      ],
      config: {
        page: 1,
        pageSize: null,
        total: 25,
        loading: false
      },

      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        uname: [{ required: true, validator: checkUname, trigger: "blur" }],
        upwd: [{ required: true, validator: regUpwd, trigger: "blur" }],
        checkupwd: [{ required: true, validator: checkUpwd, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        dept: [{ required: true, message: "请选择部门", trigger: "change" }],
        identity: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }]
      },
      arr: [],         //保存部门
      tableList:[]    //保存选中行的uname，select(val)中
    };
  },
  methods: {
    //获取部门列表
    //部门树
    getJsonTree(data, parentId) {
      var itemArr = [];
      for (var i = 0; i < data.length; i++) {
        var node = data[i];
        //data.splice(i, 1)
        if (node.parent == parentId) {
          var newNode = {
            id: node.did,
            label: node.dname,
            children: this.getJsonTree(data, node.did)
          };
          itemArr.push(newNode);
        }
      }
      return itemArr;
    },
    getDeptList() {
      const url = "http://127.0.0.1:3000/getDept";
      this.axios.get(url).then(res => {
        const dlist = this.getJsonTree(res.data.data, "");
        this.deptList = dlist;
        this.$store.commit("setDept", dlist);
      });
    },

    //新建部门
    getSubDept(obj) {
      if (obj) {
        this.arr.push(obj.label);
        if (obj.children) {
          obj.children.forEach(item => {
            this.getSubDept(item);
          });
        }
      }
      return this.arr.join("','");
    },
    addnode() {
      //console.log(1)
      this.isShow = true;
      this.editType = "addDept";
      this.editLabel = this.deptLabel;
      this.editForm = this.deptForm;
    },


    //点击部门筛选
    select(val) {
      let deptArr = this.getSubDept(val);
      console.log(deptArr)
      this.getUser(deptArr);
      this.arr = [];
    },
    //加载用户信息
    getUser(dept) {
      this.config.loading = true;
      let url =
        "http://127.0.0.1:3000/userList?page=" +
        this.config.page +
        "&pageSize=" +
        this.config.pageSize +
        "&dept=" +
        dept;
      this.axios.get(url).then(res => {
        var result = res.data.data.data;
        this.config.total = res.data.data.total;
        //console.log(result);
        this.tableData = result.map(item => {
          item.ustate = item.ustate === 1 ? true : false;
          item.sexy = item.sex === 1 ? "男" : "女";
          return item;
        });
        this.config.loading = false;
      });
    },

    //编辑按钮
    edit(val) {
      this.isShow = true;
      this.editType = "edit";
      //编辑时过滤掉密码
      this.editLabel = this.editLabel.filter(item => {
        if (item.type == "password") {
          item = null;
        }
        return item;
      });
      this.editForm = val;
    },

    //提交按钮
    submit() {
      //先验证表格再提交
      this.$refs["formEdit"].$refs.subFormEdit.validate(valid => {
        console.log(valid);
        if (valid) {
          this.editForm.sexy = this.editForm.sex == "1" ? "男" : "女";
          var url = "";
          if (this.editType == "add") {
            //固定默认选项
            this.editForm.sexy = "";
            url = "http://127.0.0.1:3000/register";
          } else if (this.editType == "edit") {
            url = "http://127.0.0.1:3000/editUserInfo";
          } else {
            url = "http://127.0.0.1:3000/addDept";
          }
          var form = this.qs.stringify(this.editForm);
          console.log(this.editForm);
          this.axios.post(url, form).then(res => {
            //console.log(res)
            if (res.data.code == 1) {
              this.$message({
                showClose: true, //手动关闭消息提醒
                type: "success",
                message: res.data.msg
              });
              this.closeEvent();
              this.getUser();
              this.getDeptList();
            } else {
              //console.log(this.editForm);
              this.$message({
                showClose: true,
                type: "warning",
                message: res.data.msg
              });
            }
          });
        }
      });
    },

    //删除按钮
    del(val) {
      this.$confirm("此操作将永久删除该用户，是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var url = "http://127.0.0.1:3000/deleteUser";
          var info = this.qs.stringify(val);
          this.axios.post(url, info).then(res => {
            if (res.data.code == 1) {
              this.$message({
                showClose: true,
                type: "success",
                message: res.data.msg
              });
              this.getUser();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //添加按钮
    add() {
      this.isShow = true;
      this.editForm.ustate = true;
      this.editForm.sex = 1;
      this.editType = "add";
    },
    //uname验证
    //修改状态
    changeState(val) {
      console.log(val);

      const data = this.qs.stringify(val);
      console.log(data);
      const url = "http://127.0.0.1:3000/editUserInfo";
      this.axios.post(url, data).then(res => {
        //console.log(res)
      });
    },
    //表单关闭触发事件
    closeEvent() {
      //console.log(this.$refs['formEdit'].$refs.subFormEdit)
      this.isShow = false;
      this.allupdateShow=false
      this.editForm = {
        name: "",
        uname: "",
        ustate: true,
        upwd: "",
        sex: "",
        dept: "",
        identity: "",
        phone: ""
      };
      //将编辑模板重新初始化
      this.editLabel = [
        {
          model: "name",
          label: "姓名",
          type: "input"
        },
        {
          model: "uname",
          label: "用户名",
          type: "input",
          disabled: true
        },
        {
          model: "upwd",
          label: "密码",
          type: "password"
        },
        {
          model: "checkupwd",
          label: "确认密码",
          type: "password"
        },
        {
          model: "sex",
          label: "性别",
          type: "radio",
          radio: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "ustate",
          label: "状态",
          type: "switch"
        },
        {
          model: "dept",
          label: "部门",
          type: "treeSelect"
        },
        {
          model: "identity",
          label: "角色",
          type: "select"
        },
        {
          model: "phone",
          label: "号码",
          type: "input"
        }
      ];
      this.deptForm = {
        dept: "",
        dname: ""
      };
      this.bothLabel=[
        {
          model:'dept',
          label:'部门',
          type:'treeSelect'
        },
        {
          model: "identity",
          label: "角色",
          type: "select"
        }
      ]
      this.bothForm={
        dept:'',
        identity:''
      }
    },
    //选中行
    selectTable(val){
      this.tableList=[]
      val.forEach(item=>{
        this.tableList.push(item.uname)
      })
      console.log(this.tableList)
    },
    
  //批量修改点击编辑角色
    bothIdentity(){
      this.allupdateShow=true
      this.bothLabel=this.bothLabel.filter(item=>{
        if(item.model=='dept'){
          item=null
        }
        return item
      })
    },
    //批量修改部门
    bothDept(){
      this.allupdateShow=true
      this.bothLabel=this.bothLabel.filter(item=>{
        if(item.model=='identity'){
          item = null
        }
        return item
      })
    },
  //批量提交
  bothSubmit(){
    this.config.loading = true;
    this.$refs['updateForm'].$refs.subFormEdit.validate(valid=>{
      if(valid){
          let tableData=this.tableList.join("','")  
          this.bothForm.tableData=tableData
          console.log(this.bothForm)
          let form=this.qs.stringify(this.bothForm)
          const url='http://127.0.0.1:3000/bothUpdate'
          this.axios.post(url,form).then(res=>{
            if(res.data.code==1){
              this.$message({
                type:'success',
                showClose:true,
                message:res.data.msg
              })
              this.closeEvent();
              
            }else{
                this.$message({
                type:'warning',
                showClose:true,
                message:res.data.msg
                })
            }

          })
      }
    })
    this.config.loading = false
  },

    //搜索
    search() {}
  },

  created() {
    this.getUser();
    this.getDeptList();
  }
};
</script>
<style lang='scss' scoped>
.left {
  background-color: #eee;
}

.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>