<template lang="html">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="float: left">购物清单</span>
    </div>
  <el-row>
  <el-col :span="5">商品信息</el-col>
  <el-col :span="3" offset=7>单价</el-col>
  <el-col :span="3">数量</el-col>
  <el-col :span="3">小计</el-col>
  <el-col :span="3">操作</el-col>
  </el-row>
  <el-row v-for="x in y">
    <el-col :span="1"><el-checkbox v-model="checkone"></el-checkbox></el-col>
    <el-col :span="3"><el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image></el-col>
    <el-col :span="8"><div style="float: left">book1</div></el-col>
    <el-col :span="3"><div>￥50</div></el-col>
    <el-col :span="3"><el-input-number v-model="num" @change="handleChange" :min="1" label="数量"></el-input-number></el-col>
    <el-col :span="3"><div>￥50</div></i></el-col>
    <el-button type="primary" icon="el-icon-delete" @click="changey"></el-button>
  </el-row>
  <el-row>
  </br>
  </el-row>
  <el-row style="color:blue">
    <el-col :span="1"><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-col>
    <el-col :span="2"><el-button type="primary">删除已选商品</el-button></el-col>
    <el-col :span="1" :offset="8"><div>已选择</div></el-col>
    <el-col :span="1"><div>{{num}}</div></el-col>
    <el-col :span="2"><div>件商品（共计</div></el-col>
    <el-col :span="1"><div>{{num}}</div></el-col>
    <el-col :span="1"><div>件商品）</div></el-col>
    <el-col :span="2"><div>应付总额(￥)：</div></el-col>
    <el-col :span="1"><div>{{num*price}}</div></el-col>
    <el-col :span="2"><el-button type="primary">现在结算</el-button></el-col>
  </el-row>
  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        num:1,
        price:50,
        checkone:false,
        checkAll:false,
        y:1,
    }
  },
  methods: {
      handleChange(value) {
        console.log(value);
      },
      handleCheckAllChange(value){
        this.checkone=value;
      },
      changey(){
        this.y--;
      }
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
    margin: 75px 0;
  }
</style>
