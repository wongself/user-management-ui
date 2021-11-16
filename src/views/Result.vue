<template>
  <div class="result container px-0 px-md-3">
    <el-backtop></el-backtop>
    <div class="px-3 p-md-0">
      <h2 class="mt-5 mb-3">为您查到相关 {{ results.total }} 个木头人</h2>
      <h6 class="grey-text mb-5">查询字段：{{ results.query }}</h6>
      <el-row :gutter="30" class="row-result">
        <el-col :span="18" class="col-result">
          <h6 class="mb-3">
            没有找到合适的人选？试试<span
              ><el-link @click="$router.push({ path: '/adv' })">
                <span class="teal-text h6 m-0">高级查询</span>
              </el-link></span
            >！
          </h6>
          <el-row :gutter="15" class="row-list">
            <el-col
              v-for="(nomad, index) in results.hits"
              :key="index"
              :xs="24"
              :sm="12"
              class="col-list mb-3"
            >
              <el-card shadow="never">
                <el-link @click="handleName(nomad)">
                  <span class="teal-text h6 m-0">{{ nomad.name }}</span>
                </el-link>
                <h6 class="mt-4 mb-2">木头人从业时长：{{ nomad.exp }}年</h6>
                <h6 class="mb-0">现就职机构：{{ nomad.now }}</h6>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="col-recomm">
          <h6 class="mb-3">优秀木头人推荐</h6>
          <el-row :gutter="15" class="row-list">
            <el-col
              v-for="(nomad, index) in results.hits"
              :key="index"
              :span="24"
              class="col-list mb-3"
            >
              <el-card shadow="never">
                <el-link @click="handleName(nomad)">
                  <span class="teal-text h6 m-0">{{ nomad.name }}</span>
                </el-link>
                <h6 class="mt-4 mb-0">木头人从业时长：{{ nomad.exp }}年</h6>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  data: function() {
    return {
      results: {},
      recomms: {},
      testResults: {
        total: 13,
        query: "sadasdasd",
        hits: [
          { name: "asda", exp: 3, now: "妈妈睡觉" },
          { name: "asda", exp: 3, now: "妈妈睡觉" },
          { name: "asda", exp: 3, now: "妈妈睡觉" }
        ]
      }
    };
  },
  mounted: function() {
    this.routeCheck();
  },
  methods: {
    routeCheck() {
      console.log(this.$route.query.query);
      this.results = this.testResults;
      this.recomms = this.testResults;
    },
    handleName(nomad) {
      console.log(nomad);
    }
  }
};
</script>
