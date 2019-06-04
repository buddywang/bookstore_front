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
              <el-button v-if="list_title=='收货地址'" type="primary" style="float:right;" @click="dialogFormVisible = true">添加地址</el-button>
            </div>
            <div class="orderlist" style="text-align: left;margin-top:20px;" v-if="list_title=='我的订单'">
              <el-card class="order" v-for="item in orders"  :key="item.order_id" shadow="hover">
                <div class="order-info">
                  <span class="text">时间：{{item.date}}</span>
                  <span class="text">订单ID：{{item.order_id}}</span>
                  <span class="text">共 {{item.total_quantity}} 件商品</span>
                  <span class="text">总付款 {{item.total_price}} 元</span>
                </div>
                <hr>
                <div v-for="book in item.book_list"  :key="book.book_id" style="margin:10px;">
                  <el-row>
                      <el-col :span="4">
                          <el-image :src="book.picture" style="width:80px;height:80px;"></el-image>
                      </el-col>
                      <el-col :span="12" style="line-height:20px;padding:10px;">
                          <div>
                            {{book.title}}
                          </div>
                          <div>
                            {{book.price}} ￥
                          </div>
                          <div>
                            购买数量：{{book.quantity}}
                            <el-button type="primary" class="judge" @click="step(book.book_id)" >评论</el-button>
                          </div>
                      </el-col>
                  </el-row>
                </div>
              </el-card>
            </div>
            <div class="addresslist" style="text-align: left;margin-top:20px;" v-if="list_title=='收货地址'">
              <el-card class="address" v-for="item in addresses"  :key="item.address" shadow="hover">
                <div>
                  <i class="el-icon-location"></i>
                  {{item.address}}
                  <div style="float: right;">
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteAddress(item.address)"></el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
    </el-row>
    <el-dialog title="添加收货信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收货人">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货号码">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAddress">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="评论" :visible.sync="show">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"></el-input>
      <hr>
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="addjudge">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      show:false,
      textarea:'',
      commentbook:'',
      dialogFormVisible: false,
      defaultmenu: "1",
      list_title: '我的订单',
      orders: [],
      addresses: [],
      form:{
        address:'',
        name:'',
        telephone:'',
      }
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

    addjudge(){
      let that=this;
      var form = new FormData()
      form.append("comment",that.textarea)
      that.$ajax({
        method:'post',
        url:'http://119.23.239.101:8080/books/'+that.commentbook+'/comments',
        header:"{'Content-Type': 'multipart/form-data;boundary=${form._boundary}}'",
        data:form,
      })
      .then(function(res){
        if(res.data.msg=="OK"){
          that.$message({
            type:'success',
            message:'添加评论成功'
          })
        }
        else{
          that.$message({
            type:'success',
            message:'添加评论失败'
          })
        }
      })
      that.show=false;
    },

    step(val){
      this.show=true;
      this.commentbook=val;
    },

    deleteAddress(val){
      let that=this;
      var form=new FormData()
      form.append("address",val)
      that.$ajax({
        method:'delete',
        url:'http://119.23.239.101:8080/address',
        header:"{'Content-Type': 'multipart/form-data;boundary=${form._boundary}}'",
        data:form,
      })
      .then(function(res){
        if(res.data.msg=="OK"){
          that.$message({
            type:'success',
            message:'删除地址成功',
          })
          that.getAddress()
        }
        else{
          that.$message({
            type:'warning',
            message:'删除地址失败',
          })
        }
      })      
    },

    addAddress(){
      let that=this;
      var form=new FormData()
      form.append("address",this.form.address)
      form.append("name",this.form.name)
      form.append("telephone",this.form.telephone)
      that.$ajax({
        method:'put',
        url:'http://119.23.239.101:8080/address',
        header:"{'Content-Type': 'multipart/form-data;boundary=${form._boundary}}'",
        data:form,
      })
      .then(function(res){
        if(res.data.msg=="OK"){
          that.$message({
            type:'success',
            message:'添加地址成功',
          })
          that.getAddress()
        }
        else{
          that.$message({
            type:'warning',
            message:'添加地址失败',
          })
        }
      })
      that.dialogFormVisible=false;
    },

    // 获取我的订单
    getOrder(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://119.23.239.101:8080/orders'
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
        if(res.data.statusCode==200){
          that.orders=res.data.data
        }
      })
    },
    getAddress(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://119.23.239.101:8080/address',
      })
      .then(function(res){
        that.addresses=res.data.data;
      })
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
.judge{
  position:relative;
  left:100px;
}
</style>
