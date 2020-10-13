<template>
  <el-row class="home" :gutter="10">
    <el-col :span="8" style>
      <el-card shadow="hover" style="height:200px;margin-bottom:20px">
        <div class="info">
          <img :src="image" alt />
          <div>
            <p>dingding</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="loginfo">
          <p>上次登录时间：2020-08-03</p>
          <p>上次登录地点：上海</p>
        </div>
      </el-card>
      <el-card shadow="hover">2</el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card shadow="hover">
          <span>通话记录</span>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      image: require("../assets/images/head.jpg")
    };
  }
};
</script>
<style lang="scss" scope>
@import "~@/assets/scss/home.scss";
</style>  