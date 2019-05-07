<template lang="html">
  <div style="background-color:white">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <div v-for="category in categories" :key="category">
    <el-col :span=1.5>
    <el-menu-item @click="getBookList(category)">{{category}}</el-menu-item>
    </el-col>
    </div>
    <el-col span=0.5 offset=5 style="margin-top:12px;">
    <el-button type="primary"  @click="dialogFormVisible = true">增加图书</el-button>
    </el-col>
    <el-col :span=3 style="margin-top:12px;" offset=1>
      <el-input  placeholder="搜索图书" v-model="searchkey" class="input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
  </el-menu>
  <el-card class="big-card">
    <div v-for="book in booklist" :key="book">
    <el-card class="small-card">
    <el-row >
      <el-col :span="3"><el-image style="width: 100px; height: 100px" :src="book.picture"></el-image></el-col>
      <el-col :span="6">
        <el-row>id：{{book.book_id}}</el-row>
        <el-row>名称：{{book.title}}</el-row>
        <el-row>价格：{{book.price}}</el-row>
        <el-row>类别：{{book.category}}</el-row>
      </el-col>
      <el-col :span="3" offset=10>
        <el-row><el-button type="primary">修改</el-button></el-row>
          </br>
          </br>
        <el-row><el-button type="primary">删除</el-button></el-row>
      </el-col>
    </el-row>
    </el-card>
   </div>
    <div class="block">
   </br>
   </br>
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
  </el-card>
  <el-dialog title="添加新图书" :visible.sync="dialogFormVisible" width=30%>
  <el-form :model="form" >
  <el-form-item label="图书ID" :label-width="formLabelWidth">
  <el-input v-model="form.name" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="书名" :label-width="formLabelWidth">
  <el-input v-model="form.name" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="价格" :label-width="formLabelWidth">
  <el-input v-model="form.name" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="类别" :label-width="formLabelWidth">
  <el-input v-model="form.name" autocomplete="off"></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  <el-button @click="dialogFormVisible = false">取 消</el-button>
  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      categories:[],
      booklist:[],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
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
      formLabelWidth: '80px'
    };
  },
  mounted(){
    this.getCategory();
    this.getBookList('传记')
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    getIndex(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://127.0.0.1:8080/home',
      })
      .then(function(res){
        that.booklist=res.data.data;
      })
    },

    getBookList(category){
      this.show=false;
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://127.0.0.1:8080/categories/'+category,
        params: {
          page: 1,
          pageSize:4
        }
      })
      .then(function(res){
        that.booklist=res.data.data.data;
        that.bookNum=res.data.data.totalNum;
        that.list_title=category;
      })
    },

    handleChange(value) {
      console.log(value);
    },
    getCategory(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://127.0.0.1:8080/categories'
      })
      .then(function(res){
        that.categories=res.data.data
      })
    },
  }
}
</script>

<style lang="css" scoped>
  .small-card {
    position:relative;
    left:7%;
  width: 1000px;
}
.big-card {
  position: absolute;
  left: 15%;
  top:10%;
width: 1200px;
height: 730px;
}
</style>
