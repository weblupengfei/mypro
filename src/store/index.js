import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tabList: [
    { path: '/', name: 'home', label: '首页', icon: 's-home' }
  ],
  currentTab: null,
  isCollapse: false,
  menu: [],
  userImage: '../assets/images/head.jpg',
  deptList:[]
}
const mutations = {
  addTab(state, val) {
    if (val.name != 'home' && val.path) {
      //state.currentTab=val
      let result = state.tabList.findIndex(item => item.name === val.name)
      result === -1 ? state.tabList.push(val) : ''
    }

    //console.log(state.tabList) 
  },
  closeTab(state, val) {
    let result = state.tabList.findIndex(item => item.name === val.name)
    state.tabList.splice(result, 1)
    //console.log(state.tabList)
  },
  isCollapse(state) {
    state.isCollapse = !state.isCollapse
  },
  getImage(state, val) {
    state.userImage = val
  },
  //获取部门列表
  setDept(state,val){
    state.deptList=val
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
