<template lang="html">
  <div style="background-color:white">
  <el-menu class="el-menu-demo" mode="horizontal">
    <div v-for="category in categories" :key="category">
    <el-col :span="1.5">
    <el-menu-item @click="getBookList(category)">{{category}}</el-menu-item>
    </el-col>
    </div>
    <el-col :span="0.5" :offset="3" style="margin-top:12px;">
    <el-button type="primary"  @click="dialogFormVisible = true">增加图书</el-button>
    </el-col>
    <el-col :span="3" style="margin-top:12px;" :offset="1">
      <el-input  placeholder="搜索图书" v-model="searchkey" class="input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
  </el-menu>
  <el-card class="big-card">
    <div v-for="book in booklist" :key="book.book_id">
    <el-card class="small-card">
    <el-row >
      <el-col :span="3"><el-image style="width: 100px; height: 100px" :src="book.picture"></el-image></el-col>
      <el-col :span="6">
        <el-row>id：{{book.book_id}}</el-row>
        <el-row>名称：{{book.title}}</el-row>
        <el-row>价格：{{book.price}}</el-row>
        <el-row>类别：{{book.category}}</el-row>
      </el-col>
      <el-col :span="3" :offset="10">
        <el-row><el-button type="primary" @click="change(book.book_id)">修改</el-button></el-row>
          </br>
          </br>
        <el-row><el-button type="primary" @click="bookDelete(book.$index,book.book_id)">删除</el-button></el-row>
      </el-col>
    </el-row>
    </el-card>
    </div>
    <div class="block">
   </br>
   </br>
  <el-pagination
    layout="prev, pager, next"
    @current-change="onChange"
    :total="bookNum">
  </el-pagination>
   </div>
  </el-card>
  <el-dialog title="添加新图书" :visible.sync="dialogFormVisible" width=30%>
  <el-form :model="form" :ref="form">
  <el-form-item label="图书ID" :label-width="formLabelWidth">
  <el-input v-model="form.book_id" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="书名" :label-width="formLabelWidth">
  <el-input v-model="form.title" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="价格" :label-width="formLabelWidth">
  <el-input v-model="form.price" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="类别" :label-width="formLabelWidth">
  <el-select v-model="form.category" placeholder="类别">
    <el-option label="传记" value="传记"></el-option>
    <el-option label="体育" value="体育"></el-option>
    <el-option label="医学" value="医学"></el-option>
    <el-option label="历史" value="历史"></el-option>
    <el-option label="小说" value="小说"></el-option>
    <el-option label="少儿" value="少儿"></el-option>
    <el-option label="恋爱与婚姻" value="恋爱与婚姻"></el-option>
    <el-option label="政治与军事" value="政治与军事"></el-option>
    <el-option label="文学" value="文学"></el-option>
    <el-option label="计算机与互联网" value="计算机与互联网"></el-option>
    <el-option label="1" value="1"></el-option>
  </el-select>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  <el-button @click="dialogFormVisible = false">取 消</el-button>
  <el-button type="primary" @click="add">确 定</el-button>
  </div>
  </el-dialog>
  <el-dialog title="修改图书" :visible.sync="changeVisible" width=30%>
  <el-form :model="changeForm" :ref="changeForm">
  <el-form-item label="书名" :label-width="formLabelWidth">
  <el-input v-model="changeForm.title" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="价格" :label-width="formLabelWidth">
  <el-input v-model="changeForm.price" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="类别" :label-width="formLabelWidth">
    <el-select v-model="changeForm.category" placeholder="类别">
    <el-option label="传记" value="传记"></el-option>
    <el-option label="体育" value="体育"></el-option>
    <el-option label="医学" value="医学"></el-option>
    <el-option label="历史" value="历史"></el-option>
    <el-option label="小说" value="小说"></el-option>
    <el-option label="少儿" value="少儿"></el-option>
    <el-option label="恋爱与婚姻" value="恋爱与婚姻"></el-option>
    <el-option label="政治与军事" value="政治与军事"></el-option>
    <el-option label="文学" value="文学"></el-option>
    <el-option label="计算机与互联网" value="计算机与互联网"></el-option>
    </el-select>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  <el-button @click="chagneVisible = false">取 消</el-button>
  <el-button type="primary" @click="bookChange">确 定</el-button>
  </div>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRouterAlive:true,
      List_title:'',
      categories:[],
      booklist:[],
      searchkey:"",
      bookNum: 10,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      changeVisible: false,
      dialogFormVisible: false,
      form: {
        book_id: '',
        title:'',
        author:'',
        publisher:'',
        language:'',
        isbn:'',
        size:'',
        weight:'',
        brand:'',
        category:'1',
        price:'',
        picture:'',
        sock:1,
        sale:1,
        description:'',
      },
      changeForm: {
        book_id: '',
        title:'',
        author:'',
        publisher:'',
        language:'',
        isbn:'',
        size:'',
        weight:'',
        brand:'',
        category:'',
        price:'',
        picture:'',
        stock:1,
        sale:1,
        description:'',
      },
      formLabelWidth: '80px'
    };
  },
  mounted(){
    this.getCategory();
    this.getBookList('传记')
  },

  methods: {

    getIndex(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://119.23.239.101:8080/home',
      })
      .then(function(res){
        that.booklist=res.data.data;
      })
    },

    change(val){
      let that=this;
      this.$ajax({
        method:'get',
        url:'http://119.23.239.101:8080/books/'+val,
      })
      .then(function(res){
        that.changeForm.book_id=val;
        that.changeForm.title=res.data.data.title;
        that.changeForm.author=res.data.data.author;
        that.changeForm.publisher=res.data.data.publisher;
        that.changeForm.language=res.data.data.language;
        that.changeForm.isbn=res.data.data.isbn;
        that.changeForm.size=res.data.data.size;
        that.changeForm.weight=res.data.data.weight;
        that.changeForm.brand=res.data.data.brand;
        that.changeForm.category=res.data.data.category;
        that.changeForm.price=res.data.data.price;
        that.changeForm.picture=res.data.data.picture;
        that.changeForm.stock=res.data.data.stock;
        that.changeForm.sale=res.data.data.sale;
        that.changeForm.description=res.data.data.description;
      })
      this.changeVisible=true;
    },

    bookChange(){
      let that=this;
      var form = new FormData()
      form.append("title",this.changeForm.title)
      form.append("author",this.changeForm.author)
      form.append("publisher",this.changeForm.publisher)
      form.append("language",this.changeForm.language)
      form.append("isbn",this.changeForm.isbn)
      form.append("size",this.changeForm.size)
      form.append("weight",this.changeForm.weight)
      form.append("brand",this.changeForm.brand)
      form.append("category",this.changeForm.category)
      form.append("price",this.changeForm.price)
      form.append("picture",this.changeForm.picture)
      form.append("stock",this.changeForm.stock)
      form.append("sale",this.changeForm.sale)
      form.append("description",this.changeForm.description)
      that.$ajax({
        method:'put',
        url:'http://119.23.239.101:8080/books/'+this.changeForm.book_id,
        header: "{'Content-Type': 'multipart/form-data;boundary=${form._boundary}}'",
        data:form,
      })
      .then(function(res){
        if(res.data.msg=="OK")
        {
          that.$message({
            type:'success',
            message:'修改图书成功'
          });
          that.getBookList(that.changeForm.category)
        }
        else{
          that.$message({
            type:'warning',
            message:'修改图书失败',
          });
        }
      })
      that.changeVisible = false;
    },

    bookDelete(index,val){
      const that=this;
      this.$ajax({
        method: 'delete',
        url: 'http://119.23.239.101:8080/books/'+val,
      })
      .then(function(res) {
         if(res.data.msg=="OK"){
          that.$message({
            type:'success',
            message:'删除成功',
          });
          that.getBookList(that.form.category)
        }
        else{
          that.$message({
            type:'warning',
            message:'删除失败',
          });
        }
      })
    },

    onChange(e){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://119.23.239.101:8080/categories/'+that.list_title,
        params: {
          page: e,
          pageSize: 4
        }
      })
      .then(function(res){
        that.booklist=res.data.data.data
      })
    },

    getBookList(category){
      this.show=false;
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://119.23.239.101:8080/categories/'+category,
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

    add(form){
      let that=this;
      var form = new FormData()
      form.append("book_id",that.form.book_id)
      form.append("title",that.form.title)
      form.append("author",that.form.author)
      form.append("publisher",that.form.publisher)
      form.append("language",that.form.language)
      form.append("isbn",that.form.isbn)
      form.append("size",that.form.size)
      form.append("weight",that.form.weight)
      form.append("brand",that.form.brand)
      form.append("category",that.form.category)
      form.append("price",that.form.price)
      form.append("picture",that.form.picture)
      form.append("sock",that.form.sock)
      form.append("sale",that.form.sale)
      form.append("description",that.form.description)
      that.$ajax({
        method:'put',
        url:'http://119.23.239.101:8080/books',
        header: "{'Content-Type': 'multipart/form-data;boundary=${form._boundary}}'",
        data:form,
      })
      .then(function(res){
        if(res.data.msg=="OK")
        {
          that.$message({
            type:'success',
            message:'添加图书成功'
          });
          that.getBookList(that.form.category)
        }
        else{
          that.$message({
            type:'warning',
            message:'添加图书失败',
          });
        }
      })
    that.dialogFormVisible = false;
    },

    getCategory(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://119.23.239.101:8080/categories'
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
