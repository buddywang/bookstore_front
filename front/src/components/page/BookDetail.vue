<template lang="html">
  <div class="content">
    <el-row>
        <el-col :span="6" :offset="6">
            <div class="img">
              <el-image :src="bookinfos.picture" style="width:300px;height:400px;">
              </el-image>
            </div>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow=none >
            <div style="text-align:left;">
              书名：<span style="font-weight: bold;">{{bookinfos.title}}</span>
            </div>
            <div style="text-align:left;">
              作者：{{bookinfos.author}}
            </div>
            <div style="text-align:left;">
              分类：{{bookinfos.category}}
            </div>
            <div style="text-align:left;">
              出版社：{{bookinfos.publisher}}
            </div>
            <div style="text-align:left;">
              价格：{{bookinfos.price}}￥
            </div>
            <div style="text-align:left;">
              简介：{{bookinfos.description}}
            </div>
            <div style="text-align:left;margin: 10px 0;">
              <span>数量</span>
              <el-input-number v-model="quantity" :min="0"></el-input-number>
            </div>
            <div style="text-align:left;">
              <el-button type="info" style="float:left;margin: 10px 0;">加入购物车</el-button>
              <el-button type='primary' style="float:right;margin: 10px 0;" @click="goAffirm">现在购买</el-button>
            </div>
          </el-card>
        </el-col>
    </el-row>
    <el-row class="comment-box">
        <el-col :span="12" :offset="6">
            <div>
              评论
            </div>
            <hr>
            <div class="comment" v-for="(comment, index) in comments"  :key="index">
              <el-row>
                  <el-col :span="2">
                      <i class="el-icon-user-solid" style="font-size:35px;"></i>
                  </el-col>
                  <el-col :span="22">
                      <div>
                        {{comment.name}}
                        <span style="float: right;color:gray;">{{comment.date}}</span>
                      </div>
                      <div style="margin: 10px;color: gray;">
                        {{comment.comment}}
                      </div>
                  </el-col>
              </el-row>
            </div>
        </el-col>
    </el-row>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="commentsNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      commentsNum: 0,
      quantity: 0,
      comments: [],
      bookinfos: {}
    }
  },
  mounted(){
    this.getBookDetail();
    this.getComment();
  },
  methods:{
    goAffirm(){
      if(this.$store.state.islogin){
        this.$router.push('/affirm');
      } else {
          this.$router.push('/login');
        }
    },
    // 获取评论
    getComment(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://119.23.239.101:8080/books/'+this.$route.params.bookid+'/comments',
        params:{
          page: 1,
          pageSize: 12
        }
      })
      .then(function(res){
        that.comments=res.data.data.comments;
        that.commentsNum=res.data.data.commentsNum;
      })
      .catch(function(e) {
        console.log(e);
      })
    },

    // 获取图书详情
    getBookDetail(){
      let that=this;
      this.$ajax({
        method: 'get',
        url: 'http://119.23.239.101:8080/books/'+this.$route.params.bookid,
      })
      .then(function(res){
        that.bookinfos = res.data.data
      })
      .catch(function(e) {
        console.log(e);
      })
    },
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
.comment-box{
  margin-top: 20px;
  text-align: left;
}
.comment{
  margin: 20px 0;
}
</style>
