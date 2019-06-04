<template lang="html">
	<el-card style="margin-top:75px" class="big-card">
		<div v-for="item in list">
		<el-card class="small-card">
		<div>id：{{item.book_id}}</div>
		<div>书名：{{item.title}}</div>
		<div>描述：{{item.description}}</div>
		<el-button type="primary" @click="change(item.book_id)">修改</el-button>
		<el-button type="primary" @click="bookDelete(item.$index,item.book_id)">删除</el-button>
		</el-card>
	    </div>
	</el-card>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        searchkey:'',
        list:[],
    }
  },

  mounted(){
    this.searchkey=this.$route.query.searchkey;
    this.search();
  },

  methods: {
    search(){
      let that=this;
      this.$ajax({
        method:'get',
        url:'http://119.23.239.101:8080/search',
        params:{
          keyword:this.searchkey
        }
      })
      .then(function(res){
        console.log(res)
        that.list=res.data.data;
      })
    },

    getDetail(bookid){
    	this.$router.push('/bookdetail/'+bookid);
    }

    }
}
</script>

<style lang="css" scoped>
.big-card{
	position:relative;
	left:15%;
	width:1000px;
	text-align: left;
}
.small-card{
	position:relative;
	left:7%;
	width:800px;
}
</style>
