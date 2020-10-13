<template>
  <div class="login">
    <div id="body">
      <form action id="loginform">
        <p>Welcome</p>
        <p>
          <input type="text" id="txtName" name="uname" placeholder="Username" v-model="uname" />
        </p>
        <p>
          <input type="password" id="txtPwd" name="upwd" placeholder="Password" v-model="upwd" />
        </p>
        <p>
          <input type="button" id="btn" value="Login" @click="login" :disabled="submit" />
        </p>
      </form>
    </div>
    <div class="box">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      uname: "",
      upwd: "",
      submit: true
    };
  },
  methods: {
    buttonDis() {
      let reg = /^[a-z\d]{3,10}$/i;
      this.submit = !(reg.test(this.uname) && this.upwd !== "");
      //console.log(this.submit)
    },
    login() {
      let url = "http://127.0.0.1:3000/login";
      var data = this.qs.stringify({
        uname: this.uname,
        upwd: this.upwd
      });
      this.axios.post(url, data).then(res => {
        console.log(res);
        const { token } = res.data;
        localStorage.setItem("accessToken", token);
        var decoded = jwt_decode(token);
        console.log(decoded);
        this.$router.push("/");
      });
      //     let url="http://api.qi.work/uaa/oauth/token"
      //     var data=this.qs.stringify({
      //         grant_type:'password',
      //         username:'shceshi',
      //         password:'56fea90d6a916e00a5d8f16f3fbdf77d',
      //         client_id:'server',
      //         client_secret:'server',
      //         scope:'server'
      //     })
      //     this.axios.post(url,data,{
      //         headers:{
      //             'Content-Type':'application/x-www-form-urlencoded'
      //         }
      //     }).then(res=>{
      //         console.log(res)
      //         if(res.status==200){
      //             var obj={
      //                 'uname':this.uname,
      //                 'companyId':res.data.companyId,
      //                 'controlId':6454,
      //                 'departmentId':res.data.departmentId,
      //                 'expires_in':res.data.expires_in,
      //                 'roleId':res.data.roleId,
      //                 'userId':res.data.userId,
      //             }
      //             sessionStorage.setItem('token',res.data.access_token )
      //             sessionStorage.setItem('userInfo',JSON.stringify(obj))
      //             this.$router.push('/home/userInfo')
      //         }

      //     })
    }
  },
  updated() {
    this.buttonDis();
  }
};
</script>

<style>
@import "../assets/scss/login.css";
</style>