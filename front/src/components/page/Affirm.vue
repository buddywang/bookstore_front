<template lang="html">
  <div style="margin-top:75px;">
    <el-dialog title="添加收货信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货号码" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span style="float: left">收货信息</span>
    </div>
    <el-row>
      <div v-for="item in address">
      <el-col :span="8">
        <el-card class="add">
          <el-button type="primary" class="del" size="mini" icon="el-icon-delete" @click="deleteAdderss(item.address)">
          </el-button>
          <div>收货地址：{{item.address}}</div>
          <div>收货者姓名：{{item.name}}</div>
          <div>收货者电话：{{item.telephone}}</div>
        </el-card>
      </el-col>
      </div>     
      <el-col :span="4">
    <el-card shadow="hover" class="add">
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
    <div v-for="item in list">
    <el-row style="margin: 20px 0;">
      <el-col :span="3"><el-image style="width: 100px; height: 100px" :src="item.picture"></el-image></el-col>
      <el-col :span="8"><div style="float: left">{{item.title}}</div></el-col>
      <el-col :span="3" :offset="4"><div>￥{{item.price}}</div></el-col>
      <el-col :span="3"><div>{{item.quantity}}</div></el-col>
      <el-col :span="3"><div>￥{{item.price*item.quantity}}</div></i></el-col>
    </el-row>
    </div>
    <el-row>
    </br>
    <hr>
    </el-row>
    <el-row style="line-height:30px;">
      <el-col :span="4" :offset="14"><el-select v-model="selAddress" placeholder="选择收货地址"><el-option v-for="item in address" :key="item.$index" :label="item.address" :value="item.address"></el-option></el-select></el-col>
      <el-col :span="4"><div>应付总额 {{totalNum}} ￥</div></el-col>
      <el-col :span="2"><el-button  :disabled="selAddress==''" type="primary" @click="goPay">提交订单</el-button></el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
  export default {
    data () {
      return {
        selAddress:'',
        totalNum:0,
        checkedval:false,
        address:[],
        list:[],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        num:1,
        price:50,
       dialogFormVisible: false,
       form: {
        address:'',
        name:'',
        telephone:1,
       },
       formLabelWidth: '120px'
    }
  },

  mounted(){
    this.list=JSON.parse(this.$route.query.choose);
    this.getAddress();
    this.computed();
  },

  methods: {
    goPay(){
      let that=this;
      var count=0;
      var orderlist="[";
      var length =this.list.length;
      this.list.forEach(i=>{
        count++;
        orderlist+='{"bookId":"';
        orderlist+=i.book_id;
        orderlist+='","quantity":';
        orderlist+=i.quantity;
        orderlist+='}'
        if(count!==length)
          orderlist+=',';
        else
          orderlist+=']'
      })
      console.log(orderlist)
      var form=new FormData()
      form.append("orderLists",orderlist)
      that.$ajax({
        method:'post',
        url:'http://119.23.239.101:8080/orders',
        header:"{'Content-Type': 'multipart/form-data;boundary=${form._boundary}}'",
        data:form,
      })
      .then(function(res){
        console.log(res)
        if(res.data.msg=='OK'){
          that.$message({
            type:'success',
            message:'购买成功'
          })
        }
        else{
          that.$message({
            type:'warning',
            message:'购买失败'
          })
        }
      })
      this.$router.push('/pay');
    },

    computed(){
      this.list.forEach(i=>{
        this.totalNum+=i.price*i.quantity;
      })
    },

    deleteAdderss(val){
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

    add(){
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

    getAddress(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://119.23.239.101:8080/address',
      })
      .then(function(res){
        that.address=res.data.data;
      })
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
  .add{
    height:120px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .del{
    position:relative;
    left:120px;
  }

  .box-card {
    margin: 0 200px;
  }
</style>
