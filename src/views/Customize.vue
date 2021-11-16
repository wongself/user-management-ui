<template>
  <div class="customize">
    <el-backtop></el-backtop>
    <div class="banner">
      <div class="container flex-center px-0 px-md-3">
        <div class="px-3 p-md-0">
          <h3 class="white-text mb-4">一二三四专业团队</h3>
          <h4 class="white-text mb-0">为您的企业提供最全面的定制化服务</h4>
        </div>
      </div>
    </div>
    <div class="custom mt-5 mb-5">
      <div class="container px-0 px-md-3">
        <div class="px-3 p-md-0">
          <el-card class="card-custom w-100">
            <el-row :gutter="30" class="row-custom">
              <el-col :xs="24" :sm="14" :md="10" class="col-img text-center">
                <img alt="一二三四" src="@/assets/pair.svg" height="240" />
              </el-col>
              <el-col :xs="24" :sm="10" :md="14" class="col-text">
                <h5 class="strong teal-text mt-3 mb-4">
                  企业定制化木头人分析报告
                </h5>
                <p class="mb-3 mb-md-5">
                  10年以上从业经验分析师1对1为您企业进行木头人深度分析，根据您企业的类型推荐最合适的木头人。
                </p>
                <el-button
                  type="primary"
                  @click="$router.push({ path: '/cust_ansis' })"
                  class="float-right"
                >
                  了解详情
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Customize"
};
</script>

<style scoped lang="scss">
.customize {
  .banner {
    width: 100%;
    height: 30vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
      url("../assets/stock.jpg");
    background-position: center center;
    background-repeat: no-repeat;
  }
}
</style>
