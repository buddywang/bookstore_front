<template lang="html">
  <el-card style="background-color:#84C1FF"class="box-card">
    <h2 style="color:black">用户登录</h2>
  <el-form :model="loginRuleform" status-icon :rules="rules" ref="loginRuleform" label-width="100px" class="demo-loginRuleform">
    <el-form-item label="用户名" prop="loginUsername">
      <el-input style="width:250px;" v-model.number="loginRuleform.loginUsername"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="loginPass">
      <el-input style="width:250px;" type="password" v-model="loginRuleform.loginPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('loginRuleform')" >登录</el-button>
  </el-form>
  </el-card>
</template>

<script>
  export default {
data() {
  var validateloginPass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    }
      callback();

  };
  return {
    loginRuleform: {
      loginPass: '',
      loginUsername:''
    },
    rules: {
      loginPass: [
        { validator: validateloginPass, trigger: 'blur' }
      ],
    }
  };
},
methods: {
  submitForm(formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        alert('登录成功！');
      } else {
        console.log('登录失败！！');
        return false;
      }
    });
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
</style>
