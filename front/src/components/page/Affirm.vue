<template lang="html">
  <div style="margin-top:75px;">
    <el-dialog title="添加收货信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货号码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span style="float: left">收货信息</span>
    </div>
    <el-row>
      <el-col :span="4">
    <el-card shadow="hover">
      <el-row>
        <el-button type="text" @click="dialogFormVisible = true" icon="el-icon-circle-plus" style="font-size:20px"></el-button>
      </el-row>
      <el-row>
        <div>添加收货信息</div>
      </el-row>
      </el-card>
    </el-col>
    </el-row>
    </el-card>
    </br>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span style="float: left">订单详情</span>
      </div>
    <el-row>
      <el-col :span="3">商品信息</el-col>
      <el-col :span="3" :offset="12">单价</el-col>
      <el-col :span="3">数量</el-col>
      <el-col :span="3">小计</el-col>
    </el-row>
    <el-row style="margin: 20px 0;">
      <el-col :span="3"><el-image style="width: 100px; height: 100px" :src="url"></el-image></el-col>
      <el-col :span="8"><div style="float: left">book1</div></el-col>
      <el-col :span="3" :offset="4"><div>￥50</div></el-col>
      <el-col :span="3"><div>{{num}}</div></el-col>
      <el-col :span="3"><div>￥50</div></i></el-col>
    </el-row>
    <el-row>
    </br>
    <hr>
    </el-row>
    <el-row style="line-height:30px;">
      <el-col :span="4" :offset="18"><div>应付总额 {{num*price}} ￥</div></el-col>
      <el-col :span="2"><el-button type="primary" @click="goPay">提交订单</el-button></el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
  export default {
    data () {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        num:1,
        price:50,
       dialogTableVisible: false,
       dialogFormVisible: false,
       form: {
         name: '',
         region: '',
         date1: '',
         date2: '',
         delivery: false,
         type: [],
         resource: '',
         desc: ''
       },
       formLabelWidth: '120px'
    }
  },
  methods: {
    goPay(){
      this.$router.push('/pay');
    },
      handleChange(value) {
        console.log(value);
      },
    }
}
</script>

<style lang="css" scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 0 200px;
  }
</style>
