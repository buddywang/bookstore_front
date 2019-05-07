<template lang="html">
  <el-row>
      <el-col :span="18" :offset="3">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="float: left">购物清单</span>
          </div>
          <el-row>
            <el-col :span="5">商品信息</el-col>
            <el-col :span="3" :offset="7">单价</el-col>
            <el-col :span="3">数量</el-col>
            <el-col :span="3">小计</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
          <el-row v-for="x in y" :key="x" style="margin: 10px 0;">
            <el-col :span="1"><el-checkbox v-model="check[x]"></el-checkbox></el-col>
            <el-col :span="3"><el-image style="width: 100px; height: 100px" :src="url"></el-image></el-col>
            <el-col :span="8"><div style="float: left">book1book1book1book1</div></el-col>
            <el-col :span="3"><div>￥50</div></el-col>
            <el-col :span="3"><el-input-number v-model="num" @change="handleChange" :min="1" label="数量"></el-input-number></el-col>
            <el-col :span="3"><div>￥50</div></i></el-col>
            <el-button type="danger" icon="el-icon-delete" @click="changey"></el-button>
          </el-row>

          <hr>

          <el-row style="line-height:50px;">
            <el-col :span="2"><el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-col>
            <el-col :span="2"><el-button type="danger">移除已选商品</el-button></el-col>
            <el-col :span="4" :offset="4"><div>已选择 {{num}} 件商品</div></el-col>
            <el-col :span="4"><div>共计 {{num}} 件商品</div></el-col>
            <el-col :span="4"><div>应付总额 {{num*price}} ￥</div></el-col>
            <el-col :span="4"><el-button type="primary" @click="goAffirm">现在结算</el-button></el-col>
          </el-row>
        </el-card>
      </el-col>
  </el-row>

</template>

<script>
  export default {
    data () {
      return {
        check: [],
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        num:1,
        price:50,
        checkone:false,
        checkAll:false,
        y:3,
    }
  },
  mounted(){
    // this.getCart();
  },
  methods: {
    getCart(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://110.64.87.189:8080/carts'
      })
      .then(function(res){
        console.log('cart',res);
      })
      .catch(function(e) {
        console.log(e);
      })
    },

    goAffirm(){
      this.$router.push('/affirm');
    },
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
