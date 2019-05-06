<template lang="html">
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="4" :offset="3">
        <div class="sidebar">
          <el-card class="filter-card" shadow="hover">
            <div class="item head">
              图书筛选
            </div>
            <div class="item">
              <el-link :underline="false">价格从高到低</el-link>
            </div>
            <div class="item">
              <el-link :underline="false">价格从低到高</el-link>
            </div>
            <div class="item">
              <el-input v-model="minprice" placeholder="最低价" class="filer_price"></el-input> -
              <el-input v-model="maxprice" placeholder="最高价" class="filer_price"></el-input>
              <el-button>确定</el-button>
            </div>
          </el-card>
          <el-card class="category-card" shadow="hover">
            <div class="item head">
              图书类别
            </div>
            <div class="item">
              <el-link :underline="false" @click="getIndex">热门推荐</el-link>
            </div>
            <div v-for="category in categories" :key="category" class="item">
              <el-link :underline="false" @click="getBookList(category)">{{ category }}</el-link>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="head" style="float:left;">
          图书-{{list_title}}
        </div>
        <div class="booklist">
          <el-card v-for="(book, index) in booklist"  :key="index" :body-style="{ padding: '0px' }" shadow="hover" class="book-card">
            <img :src="book.picture" class="image">
            <div style="padding: 14px;text-align:left;">
              <div><router-link :to="{ name: '详情', params: { bookid: book.book_id} }">书名：{{book.title}}</router-link></div>
              <div>作者：{{book.author}}</div>
              <div>分类：{{book.category}}</div>
              <div>
                <span>价格：{{book.price}}￥</span>
              </div>
            </div>
          </el-card>
        </div>
        <div class="pagination">
          <el-pagination
            v-if="show"
            background
            :page-size="12"
            layout="prev, pager, next"
            @current-change="onChange"
            :total="bookNum">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data(){
    return {
      list_title: '热门推荐',
      show: true,
      bookNum: 10,
      minprice: '',
      maxprice: '',
      categories: [],
      booklist:[]
    }
  },
  mounted(){
    this.getIndex();
    this.getCategory();
  },
  methods:{
    // 改变页数
    onChange(e){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://127.0.0.1:8080/categories/'+that.list_title,
        params: {
          page: e,
          pageSize: 12
        }
      })
      .then(function(res){
        that.booklist=res.data.data.data
      })
      .catch(function(e) {
        console.log(e);
      })
    },

    // 获取首页图书信息
    getIndex(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://127.0.0.1:8080/home',
      })
      .then(function(res){
        that.booklist=res.data.data;
      })
      .catch(function(e) {
        console.log(e);
      })
    },

    // 获取图书所有分类
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

    // 获取某一图书分类信息
    getBookList(category){
      this.show=false;
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://127.0.0.1:8080/categories/'+category,
        params: {
          page: 1,
          pageSize:12
        }
      })
      .then(function(res){
        that.booklist=res.data.data.data;
        that.bookNum=res.data.data.totalNum;
        that.list_title=category;
        that.show=true;
      })
    }
  }
}
</script>

<style lang="css" scoped>
.pagination{
  margin: 20px;
}
.content{
  margin-top: 75px;
}
.el-col{
  border-radius: 4px;
}
.booklist{
  display: flex;
  width: 1000px;
  flex-wrap: wrap;
}
.filer_price{
  width: 70px;
}
.item{
  padding-bottom: 5px;
}
.category-card{
  margin-top: 5px;
}
.head{
  font-weight: bold;
  margin-bottom: 10px;
}
.book-card{
  width: 200px;
  margin: 10px;
}
.image{
  width: 200px;
  height: 250px;
}
a {
    text-decoration: none;
  }
</style>
