<template lang="html">
  <div class="Header">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="10" :offset="2"><span style="font-size: 20px;" @click="goIndex"><a href="#"><span style="color: #996996;font-size:30px;">32123 </span>图书商城</a></span></el-col>
          <el-col :span="4" :offset="5">
             <el-autocomplete
             class="inline-input"
             v-model="state1"
             :fetch-suggestions="querySearch"
             placeholder="请输入内容"
             :trigger-on-focus="false"
             suffix-icon="el-icon-search"
             @select="getDetail">
             </el-autocomplete>
          </el-col>
          <el-col :span="3">
            <el-menu
              class="el-menu-demo"
              router
              mode="horizontal"
              background-color="#000"
              text-color="#fff"
              active-text-color="#fff">
              <el-submenu index="1" v-if="islogin">
                <template slot="title"><i class="el-icon-user-solid" style="font-size:25px;"></i></template>
                <el-menu-item index="/usercenter/我的订单">我的订单</el-menu-item>
                <el-menu-item index="/usercenter/收货地址">收货地址</el-menu-item>
                <hr style="width:90%;">
                <el-menu-item @click="logout">退出登录</el-menu-item>
              </el-submenu>
              <el-submenu index="1" v-else>
                <template slot="title"><i class="el-icon-user-solid" style="font-size:25px;"></i></template>
                <el-menu-item index="/register">注册</el-menu-item>
                <el-menu-item index="/login">登录</el-menu-item>
              </el-submenu>
              <el-menu-item v-if="islogin" index="/cart" style="border-bottom-color:#000;"><i class="el-icon-shopping-cart-2" style="font-size:25px;"></i></el-menu-item>
              <el-menu-item v-else index="/login" style="border-bottom-color:#000;"><i class="el-icon-shopping-cart-2" style="font-size:25px;"></i></el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state1:'',
      searchlist:[],
      searchkey: '',
    };
  },
  computed:{
    islogin(){
      return this.$store.state.islogin
    }
  },
  methods: {
    logout(){
      this.$store.commit('updateIsLogin', false);
      this.goIndex();
    },

    querySearch(queryString,cb){
      var showlist=[];
      let that=this;
      that.$ajax({
        method:'get',
        url:'http://119.23.239.101:8080/search',
        params:{
          keyword:queryString
        }
      })
      .then(function(res){
        that.searchlist=res.data.data;
        that.searchlist.forEach(i=>{
          i.value=i.title;
          showlist.push(i);
        })
        cb(showlist)    
      })
    },

    getDetail(val){
      if(this.$router.path!='bookdetail'){
        this.$router.push('/bookdetail/'+val.book_id);
      }
      else{
        this.$route.params.id=val.book_id;
      }
      this.$router.go(0)
    },

    goIndex(){
      this.$router.push('/index')
    }
  }
}
</script>

<style lang="css" scoped>
  .el-header, .el-footer {
    background-color: #000;
    color: #fff;
    text-align: left;
    line-height: 60px;
    position: fixed;
    top:0;
    width: 100%;
    z-index: 2;
  }
  .el-col{
    text-align: left;
  }
  .input{
    width: 200px;
  }
  a:hover, a:visited, a:link, a:active {
    text-decoration: none;
    color: #fff;
  }
</style>
