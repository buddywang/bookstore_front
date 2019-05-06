<template lang="html">
  <div class="content">
    <el-row :gutter="20">
        <el-col :span="3" :offset="6">
          <el-menu
            :default-active="defaultmenu">
            <el-menu-item index="1" @click="handleClick('我的订单')">
              <span slot="title">我的订单</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleClick('收货地址')">
              <span slot="title">收货地址</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="9">
          <div>
            <div style="font-weight:bold;text-align:left;">
              {{list_title}}
              <el-button v-if="list_title=='收货地址'" type="primary" style="float:right;" @click="addAddress">添加地址</el-button>
            </div>
            <div class="orderlist" style="text-align: left;margin-top:20px;" v-if="list_title=='我的订单'">
              <el-card class="order" v-for="item in orders"  :key="item.order_id" shadow="hover">
                <div class="order-info">
                  <span class="text">时间：{{item.date}}</span>
                  <span class="text">订单ID：{{item.order_id}}</span>
                  <span class="text">共 {{item.count}} 件商品</span>
                  <span class="text">总付款 {{item.cost}} 元</span>
                </div>
                <hr>
                <div v-for="book in item.booklist"  :key="book.book_id" style="margin:10px;">
                  <el-row>
                      <el-col :span="4">
                          <el-image :src="book.picture" style="width:80px;height:80px;"></el-image>
                      </el-col>
                      <el-col :span="12" style="line-height:20px;padding:10px;">
                          <div>
                            {{book.title}}
                          </div>
                          <div>
                            {{book.price}}
                          </div>
                          <div>
                            购买数量：{{book.quautity}}
                          </div>
                      </el-col>
                  </el-row>
                </div>
              </el-card>
            </div>
            <div class="addresslist" style="text-align: left;margin-top:20px;" v-if="list_title=='收货地址'">
              <el-card class="address" v-for="item in addresses"  :key="item" shadow="hover">
                <div>
                  <i class="el-icon-location"></i>
                  {{item}}
                  <div style="float: right;">
                    <el-button type="primary" icon="el-icon-edit" circle @click="editAddress(item)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteAddress"></el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      defaultmenu: "1",
      list_title: '我的订单',
      orders: [],
      addresses: []
    }
  },
  mounted(){
    if(this.$route.params.menu=='我的订单'){
      this.defaultmenu="1";
      this.list_title='我的订单';
    }
    else{
      this.defaultmenu="2";
      this.list_title='收货地址';
    }
    this.getOrder();
    this.getAddress();
  },
  methods:{
    handleClick(msg){
      this.$router.push('/usercenter/'+msg);
      this.list_title=msg;
    },
    editAddress(address){
      console.log("edit address");
      this.$prompt('地址', '修改地址', {
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          inputPattern: /./,
          inputValue: address,
          inputErrorMessage: '请输入地址'
        }).then( ({value}) => {
          console.log(value);
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
    },
    deleteAddress(){
      console.log("delete address");
      this.$confirm('删除该地址, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    addAddress(){
      console.log("add address");
      this.$prompt('请输入地址', '添加地址', {
          confirmButtonText: '添加',
          cancelButtonText: '取消',
          inputPattern: /./,
          inputErrorMessage: '请输入地址'
        }).then( ({value}) => {
          console.log(value);
          this.$message({
            type: 'success',
            message: '添加成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消添加'
          });
        });
    },
    getOrder(){
      this.orders=[
        {
          order_id: '123dd3455',
          date: '2018/3/4',
          count: 5,
          cost: "33$",
          booklist: [
            {
              price: '3$',
              quautity: 3,
              title: '金瓶梅',
              picture: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
              book_id: 'ss333'
            },
            {
              price: '3$',
              quautity: 6,
              title: '笑傲江湖',
              picture: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
              book_id: '3d33'
            }
          ]
        },
        {
          order_id: '1233455',
          date: '2018/3/4',
          booklist: [
            {
              price: '3$',
              quautity: 3,
              title: '金瓶梅',
              picture: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
              book_id: '333'
            },
            {
              price: '3$',
              quautity: 3,
              title: '金瓶梅',
              picture: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
              book_id: '3dff33'
            }
          ]
        }
      ];
    },
    getAddress(){
      this.addresses=[
        "dflsfjdfds",
        "djfdisfsdsjflsddsfsl",
        "ldfjsfjsldk",
      ];
    }
  }
}
</script>

<style lang="css" scoped>
.text{
  font-size: 13px;
  margin-right: 20px;
}
.content{
  margin-top: 75px;
}
.order{
  margin-top: 10px;
}
.address{
  margin-top: 10px;
  line-height: 35px;
}
</style>
