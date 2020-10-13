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
          <input type="button" id="btn" value="Login" @click="regist" :disabled="submit" />
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
    regist() {
      let url = "http://127.0.0.1:3000/register";
      var data = this.qs.stringify({
        uname: this.uname,
        upwd: this.upwd
      });
      this.axios.post(url, data).then(res => {
        console.log(res);
        this.$message({
            showClose:true,
            type:'success',
            message:res.data.msg
        })
        //this.$router.push("/login");
      });
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