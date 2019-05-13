// import "babel-polyfill";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      username: '',
      islogin: false,
      userid: '',
    },
  mutations:{ //处理数据的唯一途径，state的改变或赋值只能在这里, 同步执行
    updateUserName (state, username) {
      state.username = username;
    },
    updateIsLogin (state, islogin) {
      state.islogin = islogin;
    },
    updateUserId (state, userid) {
      state.userid = userid;
    }
  },
});

export default store  //导出store并在main.js中应用注册
