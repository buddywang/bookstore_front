<template lang="html">
  <el-row>
      <el-col :span="18" :offset="3">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="float: left">购物清单</span>
          </div>
          <el-table
            height='500'
            ref="multipleTable"
            :data="cartlist"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectGood">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="picture"
              label="商品信息">
              <template slot-scope="scope">
                <el-image style="width: 80px; height: 80px" :src="scope.row.picture"></el-image>
                <p>书名：{{ scope.row.title }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="单价">
              <template slot-scope="scope">{{ scope.row.price }} ￥</template>
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="数量">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.quantity" :disabled="scope.row.isable" @change="handleChange(scope.row)" :min="1" label="数量"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              label="小计">
              <template slot-scope="scope">{{ (scope.row.price*scope.row.quantity).toFixed(2) }} ￥</template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="deleteCart(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-row style="line-height:50px;">
            <el-col :span="4" :offset="8"><div>已选择 {{bookNum}} 种商品</div></el-col>
            <el-col :span="4"><div>共计 {{totalNum}} 件商品</div></el-col>
            <el-col :span="4"><div>应付总额 {{totalPrice.toFixed(2)}} ￥</div></el-col>
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
        check: [1],
        checkAll:false,
        bookNum: 0,
        totalPrice: 0,
        totalNum: 0,
        totalPrice: 0,
        cartlist: [],
        choose:[],
    }
  },
  mounted(){
    this.getCart();
  },
  methods: {
    // 处理选择商品
    handleSelectGood(val) {
      this.cartlist.forEach(i => {
        i.isable=false;
      })
      let bookNum=0,totalNum=0,totalPrice=0;
      val.forEach(item => {
        bookNum++;
        totalNum+=item.quantity;
        totalPrice+=item.price*item.quantity;
        this.cartlist.forEach(i => {
          if(i.book_id==item.book_id){
            i.isable=true;
          }
        })
      })
      this.bookNum=bookNum;
      this.totalNum=totalNum;
      this.totalPrice=totalPrice;
    },

    addBook(index){
      console.log(this.check[index]);
      console.log(this.check.map(n => n?1:0));
    },

    // 获取购物车信息
    getCart(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://119.23.239.101:8080/carts'
      })
      .then(function(res){
        if(res.msg==='未登录'){
          that.$store.commit('updateIsLogin', false);
          that.$message({
            type: 'info',
            message: '请登录'
          });
          that.$router.push('/index');
          return;
        }
        that.cartlist = res.data.data;
      })
    },

    goAffirm(){
      this.cartlist.forEach(i =>{
        if(i.isable==true){
          this.choose.push(i);
        }
      }) 
      console.log(this.choose);
      this.$router.push({
        path:'/affirm',
        query:{
          choose: JSON.stringify(this.choose),
        }
      })
    },

    handleChange(row) {
      // console.log('row',row);
    },

    handleCheckAllChange(value){
      this.check.map(n => value);
    },

    // 从购物车中删除商品
    deleteCart(index, row){
      const that=this;
      var form = new FormData();
      form.append("book_id", row.book_id);
      this.$ajax({
        method: 'delete',
        url: 'http://119.23.239.101:8080/carts',
        headers:{'Content-Type': 'multipart/form-data; boundary=${form._boundary}'},
        data: form,
      })
      .then(function(res){
        that.$message({
          type: 'success',
          message: '删除成功'
        });
        that.cartlist.splice(index, 1);
      })
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
