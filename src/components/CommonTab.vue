<template>
  <div class='tabs'>
      <el-tag  size='small' :key="tag.name" v-for="tag in tags" :closable="tag.name=='home'? false:true" :disable-transitions="false" @close="handleClose(tag)" @click='changeTab(tag)' :effect="($route.path==''||$route.path===tag.path)?'dark':'plain'">
        {{tag.label}}
      </el-tag>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
  export default {
    computed:{
      ...mapState({
        tags: state=> state.tabList
      })
    },
    data() {
      return {
        
      };
    },
    methods:{
      // ...mapMutations({
      //   close:'closeTab'
      // }),
      handleClose(tag) {
        this.$store.commit('closeTab',tag)
        let route=this.tags[this.tags.length-1].path
        this.$router.push(route)
      //this.closeTab(tag)
      },
      changeTab(item){
        this.$router.push(item.name)
      }
    },
  
  }
</script>
<style lang="scss">
  .tabs{
    padding:5px;
    background-color:#fff;
    .el-tag{
      margin-right:10px;
      cursor:pointer;
    }
  }
</style>