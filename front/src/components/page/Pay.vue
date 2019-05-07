<template lang="html">
  <div class="content">
    <el-card :body-style="{ padding: '0px' }" class="card">
      <img src="../../assets/pay.png" class="image">
      <span style="line-height:50px;">请扫码完成付款</span>
    </el-card>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
  .content{
    margin-top: 75px;
    display: flex;
    justify-content: center;
  }
  .image{
    width: 300px;
    height: 300px;
  }
  .card{
    width: 300px;
  }
</style>
