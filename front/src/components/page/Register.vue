<template lang="html">
  <el-card style="background-color:#fff"class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span style="font-size: 20px;font-weight: bold;">用户注册</span>
    </div>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form>
  <router-link style="float:right;margin-top:-25px;;" :to="{ name: '登录'}">我要登录</router-link>
  </el-card>
</template>

<script>
  export default {
data() {
  var validateUsername = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入用户名'));
    } else {
      callback();
    }
  };
  var validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      callback();
    }
  };
  var validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.ruleForm.pass) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };
  return {
    ruleForm: {
      pass: '',
      checkPass: '',
      username:'',
    },
    rules: {
      username: [
        { validator: validateUsername, trigger: 'blur' }
      ],
      pass: [
        { validator: validatePass, trigger: 'blur' }
      ],
      checkPass: [
        { validator: validatePass2, trigger: 'blur' }
      ],
    }
  };
},
methods: {
  //注册
  submitForm(ruleForm) {
    let that=this;
    this.$refs[ruleForm].validate((valid) => {
    if (valid) {
    var form = new FormData()
    form.append("name", this.ruleForm.username)
    form.append("password", this.ruleForm.pass)
    this.$ajax({
      method: 'post',
      url: 'http://119.23.239.101:8080/register',
      header: "{'Content-Type': 'multipart/form-data;boundary=${form._boundary}}'",
      data: form
    })
    .then(function(res){
      if(res.data.data=="注册成功")
      {
        that.$message({
          type: 'success',
          message: '注册成功，请登录！'
        });
        setTimeout(() => {
          that.$router.push('/login')
        }, 1500)
      }
      else{
        that.$message({
          type: 'warning',
          message: '注册失败,用户已存在！'
        });
      }
    })
    .catch(function(ruleForm) {
      console.log(ruleForm.msg);
    })
  }
  else {
    return false;
  }
})
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
    width: 480px;
  }
</style>
