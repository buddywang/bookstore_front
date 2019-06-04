<template lang="html">
  <el-card style="background-color:"class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span style="font-size: 20px;font-weight: bold;">用户登录</span>
    </div>
  <el-form :model="loginRuleform" status-icon :rules="rules" ref="loginRuleform" label-width="100px" class="demo-loginRuleform">
    <el-form-item label="用户名" prop="username">
      <el-input style="width:250px;" v-model="loginRuleform.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input style="width:250px;" type="password" v-model="loginRuleform.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-button class="manager" type="primary" @click="submit('loginRuleform')" >管理员登录</el-button>
    <el-button type="primary" @click="submitForm('loginRuleform')" >登录</el-button>
  </el-form>
  <router-link style="float:right;margin-top:-25px;" :to="{ name: '注册'}">我要注册</router-link>
  </el-card>
</template>

<script>
  export default {
data() {
  var validatePassword = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    }else{
      callback();
    }
  };
  var validateUserName = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入用户名'));
    }else{
      callback();
    }
  };
  return {
    loginRuleform: {
      password: '',
      username:''
    },
    rules: {
      password: [
        { validator: validatePassword, trigger: 'blur' }
      ],
      username: [
        { validator: validateUserName, trigger: 'blur' }
      ],
    }
  };
},
methods: {
  submitForm(formName) {
    const that=this
    this.$refs[formName].validate((valid) => {
      if (valid) {
        var form = new FormData();
        form.append("name", this.loginRuleform.username);
        form.append("password", this.loginRuleform.password);
        that.$ajax({
          method: 'post',
          url: 'http://119.23.239.101:8080/users',
          headers:{'Content-Type': 'multipart/form-data; boundary=${form._boundary}'},
          data: form
        })
        .then(function(res){
          console.log(res.data.statusCode)
          if(res.data.statusCode=="200"){
            console.log('success');
            that.$store.commit('updateIsLogin', true);
            that.$message({
              type: 'success',
              message: '登录成功'
            });
            setTimeout(() => {
              that.$router.push('/index')
            }, 1500)
          }else{
            console.log('fail');
          }
        })
        .catch(function(e) {
          console.log(e);
        })
      } else {
        return false;
      }
    });
  },

  submit(){
    if(this.loginRuleform.username=='hao'){
      if(this.loginRuleform.password=='123'){
        this.$router.push('/Manage')
      }
    }
  },

  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
}
}
</script>

<style lang="css" scoped>
.box-card {
      position: absolute;
      left: 36%;
      top:20%;
    width:400px;
  }

  .manager{
    position:relative;
    right:60px;
  }
</style>
