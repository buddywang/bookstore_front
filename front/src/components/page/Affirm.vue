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
        <div v-for="address in addresses" key="address">
      <el-col :span="4">
<<<<<<< HEAD
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
=======
          <el-card>
            {{address}}
          </el-card>
      </el-col>
      </div>
     <el-col :span="4">
        <el-card>
          <el-row>
            <el-button type="text" @click="dialogFormVisible = true" icon="el-icon-circle-plus" style="font-size:20px"></el-button>
          </el-row>
       <el-row>
  <div>使用新地址</div>
</el-row>
</el-card>
</el-col>
</el-row>
</el-card>
</br>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="float: left">购物清单</span>
    </div>
  <el-row>
  <el-col :span="13" :offset="2"><div class="grid-content bg-purple" style="float: left">商品信息</div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple-light">单价</div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple">数量</div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple">小计</div></el-col>
  </el-row>
  <el-row>
    <el-col :span="3"><el-image style="width: 100px; height: 100px" :src="url"></el-image></el-col>
    <el-col :span="8"><div style="float: left">book1</div></el-col>
    <el-col :span="3" :offset="4"><div>￥50</div></el-col>
    <el-col :span="3"><div>{{num}}</div></el-col>
    <el-col :span="3"><div>￥50</div></i></el-col>
  </el-row>
  <el-row>
  </br>
  </el-row>
  <el-row style="color:blue">
    <el-col :span="3" :offset="18"><div>应付总额(￥)：</div></el-col>
    <el-col :span="1"><div style="color:red;">{{num*price}}</div></el-col>
    <el-col :span="2"><el-button type="primary">提交订单</el-button></el-col>
  </el-row>
>>>>>>> 313f3fc69b21c9dc26d203ad01f0c2eb290bb27a
  </el-card>
  <el-dialog title="添加新地址" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="收货人" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" :label-width="formLabelWidth">
        <el-input v-model="form.region" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收货号码" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addAddress('form')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  export default {
    data () {
      return {
        //this.$store.state.userid
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        num:1,
        price:50,
       dialogFormVisible: false,
       form: {
         name: '',
         region: '',
         phone:'',
       },
       carts:[],
       cart:{
         title:'',
         picture:'',
         price:0.0,
         number:0,
       },
       addresses: [],
       dialogFormVisible: false,
       formLabelWidth: '120px',
    }
  },
  mounted(){
    this.getAddress();
    this.getCart();
  },
  methods: {
    goPay(){
      this.$router.push('/pay');
    },
      handleChange(value) {
        console.log(value);
      },
      getCart(){
        let that=this;
        this.$ajax({
          method:'get',
          url:'http://127.0.0.1:8080/carts',
        })
        .then(function(res){
          that.addresses=res.data.address.address
        })
        .catch(function(res) {
          console.log(res);
        })
      },
      getAddress(){
        let that=this;
        this.$ajax({
          method: 'get',
          url: 'http://127.0.0.1:8080/address',
        })
        .then(function(res){
          that.addresses=res.data.address.address
        })
        .catch(function(res) {
          console.log(res);
        })
      },
      addAddress(form){
        let that=this;
        var form = new FormData()
        form.append("name", this.form.name)
        form.append("address", this.form.region)
        form.append("telephone", this.form.phone)
        this.$ajax({
          method: 'put',
          url: 'http://127.0.0.1:8080/address',
          header: "{'Content-Type': 'multipart/form-data;boundary=${form._boundary}}'",
          data: form
        })
        .then(function(res){
          console.log(res)
        })
        .catch(function(res) {
          console.log(res);
        })
        this.dialogFormVisible=false
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
    margin: 0 200px;
  }
</style>
