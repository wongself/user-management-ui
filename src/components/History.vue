<template>
  <div class="history position-relative">
    <el-row class="row-head">
      <el-col :xs="10" :sm="16" class="col-title">
        <h4 class="ml-2 mb-0">检索历史</h4>
      </el-col>
      <el-col :xs="14" :sm="8" class="col-filter">
        <el-input
          v-model="historySearch"
          size="mini"
          placeholder="输入关键字筛选"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-row class="row-table">
      <el-col :span="24" class="col-table mt-3">
        <el-table
          :data="
            historyTableData.filter(
              data =>
                !historySearch ||
                data.query.toLowerCase().includes(historySearch.toLowerCase())
            )
          "
          :cell-style="{ padding: '0.375rem 0' }"
          :show-header="false"
          max-height="600px"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            width="40"
          ></el-table-column>
          <el-table-column prop="query" min-width="200"></el-table-column>
          <el-table-column
            prop="time"
            align="right"
            width="160"
            v-if="fTableTime"
          >
          </el-table-column>
          <el-table-column align="right" width="120">
            <template v-slot:default="scope">
              <el-button-group>
                <el-button @click="handleSearch(scope.$index)">
                  <font-awesome-icon :icon="['fas', 'search']" />
                </el-button>
                <el-button type="danger" @click="handleDelete(scope.$index)">
                  <font-awesome-icon :icon="['far', 'trash-alt']" />
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="row-clear">
      <el-col :span="6" class="col-clear mt-3">
        <el-button
          type="text"
          v-if="!!historyTableData.length"
          @click="handleClear()"
          class="ml-2"
        >
          <font-awesome-icon :icon="['fas', 'trash']" class="mr-2" />
          <span>清空全部</span>
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "History",
  data: function() {
    return {
      fTableTime: !window.matchMedia("(max-width: 992px)").matches,
      historySearch: "",
      historyData: []
    };
  },
  computed: {
    historyTableData: {
      get() {
        return this.historyData;
      },
      set(value) {
        if (Number.isInteger(value)) {
          this.historyData.splice(value, 1);
        } else if (Array.isArray(value)) {
          this.historyData = [];
        }
      }
    }
  },
  mounted() {
    this.initHistoryData();
    window.onresize = () => {
      this.fTableTime = !window.matchMedia("(max-width: 992px)").matches;
    };
  },
  methods: {
    initHistoryData() {
      const historyKeys = this.$cookies
        .keys()
        .filter(e => e.substr(0, 13) == "hammer_search*");
      var historyData = [];
      historyKeys.forEach(function(key) {
        historyData.push(this.$cookies.get(key));
      }, this);
      this.historyData = historyData.reverse();
    },
    indexMethod(index) {
      return this.historyTableData.length - index;
    },
    handleSearch(index) {
      const history = this.historyTableData[index];
      this.$store.commit("updateInput", history.query);
      this.$store.commit("handleQuery");
    },
    handleDelete(index) {
      this.$confirm("此操作将永久删除该检索记录, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$cookies.remove(
            "hammer_search*" + this.historyTableData[index].query
          );
          this.historyTableData = index;
          this.$message.success("删除成功。");
        })
        .catch(() => {
          this.$message.info("已取消删除。");
        });
    },
    handleClear() {
      this.$confirm("此操作将永久清空全部检索记录, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const historyKeys = this.$cookies
            .keys()
            .filter(e => e.substr(0, 13) == "hammer_search*");
          historyKeys.forEach(function(key) {
            this.$cookies.remove(key);
          }, this);
          this.historyTableData = [];
          this.$message.success("清空成功。");
        })
        .catch(() => {
          this.$message.info("已取消清空。");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.history {
  .row-table {
    max-height: 50vh;
    .el-button {
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
    }
  }
}
</style>
