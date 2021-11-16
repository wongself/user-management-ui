<template>
  <div class="sponsor container px-0 px-md-3">
    <el-backtop></el-backtop>
    <div class="px-3 p-md-0">
      <el-row class="row-head">
        <el-col :span="24" class="col-head">
          <p>ssdasd</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentResults",
  data: function() {
    return {
      // Ip
      ip: "",
      // Head
      fLoad: true,
      fFound: true,
      queryId: "",
      queryName: "",
      totalDoc: 0,
      radioLayout: "normal",
      // Results
      resultDoc: [],
      currentPage: 1
    };
  },
  // watch: {
  //   $route() {
  //     this.routeCheck();
  //   }
  // },
  // mounted: function() {
  //   this.routeCheck();
  // },
  methods: {
    routeCheck() {
      const routeQuery = this.$route.query;
      const id = routeQuery.id;
      const name = routeQuery.name;
      if (!id || !name) {
        console.log("Redirect to home.");
        this.$router.push({ path: "/" });
        return;
      }
      this.queryId = id;
      this.queryName = name;
      this.currentPage = 1;
      this.querySubmit();
    },
    querySubmit(pageFrom = 0) {
      console.log("Start searching...");
      this.fLoad = true;
      this.fFound = true;
      this.resultDoc = [];
      this.submitDoc(pageFrom);
    },
    submitDoc(pageFrom) {
      this.axios
        .get(
          "/search_paper_by_venue_id?type=SEARCH_PAPER_BY_VENUE_ID&query=" +
            this.queryId +
            "&venue=" +
            this.queryName +
            "&from=" +
            pageFrom +
            "&size=10" +
            "&filter_year=false&s_year=0&e_year=0" +
            "&user_ip=" +
            this.ip
        )
        .then(response => {
          // console.log(response.data);
          this.totalDoc = response.data.hits.total;
          response.data.hits.hit.forEach(function(hit) {
            this.resultDoc.push(Object.assign({}, hit, { fExpandAbs: false }));
          }, this);
        })
        .catch(error => {
          console.error(error);
          this.fFound = false;
          // this.$parent.raiseUnknownError();
        })
        .finally(() => {
          this.fLoad = false;
        });
    },
    highlightQuery(str) {
      return this.$parent.highlightSubstr(this.queryName, str);
    },
    handleLink(link) {
      window.open(link, "_blank");
    },
    handleCurrentChange(val) {
      this.querySubmit((val - 1) * 10);
    }
  }
};
</script>

<style scoped lang="scss">
.sponsor {
  .row-result {
    min-height: 24vh;
    .el-link {
      color: #009688;
    }
  }
}
</style>
