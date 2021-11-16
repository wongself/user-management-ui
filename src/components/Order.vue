<template>
  <div class="order position-relative">
    <el-row class="row-table">
      <el-col :span="24" class="col-table">
        <el-table
          :data="orderTableData"
          :cell-style="{ padding: '0.375rem 0' }"
          max-height="600px"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            width="40"
          ></el-table-column>
          <el-table-column width="150" label="订单">
            <template v-slot:default="scope">
              <span>一二三四{{ levelSubject[scope.row.vip_level] }}会员</span>
            </template>
          </el-table-column>
          <el-table-column width="100" label="金额">
            <template v-slot:default="scope">
              <span>RMB$ {{ levelAmount[scope.row.vip_level] }}</span>
            </template>
          </el-table-column>
          <el-table-column width="90" label="支付方式">
            <template v-slot:default="scope">
              <el-tag size="small" effect="plain">{{
                scope.row.payment_method
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="时间">
            <template v-slot:default="scope">
              <span>{{ scope.row.order_create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column width="75" label="状态">
            <template v-slot:default="scope">
              <el-tag
                v-if="scope.row.order_status == 'paid'"
                type="success"
                size="small"
              >
                完成
              </el-tag>
              <el-tag
                v-else-if="scope.row.order_status == 'undone'"
                type="warning"
                size="small"
              >
                未完成
              </el-tag>
              <el-tag v-else type="info" size="small">未知</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" width="100">
            <template v-slot:default="scope">
              <el-button-group>
                <el-button @click="handleSearch(scope.$index)">
                  <font-awesome-icon :icon="['fas', 'info-circle']" />
                </el-button>
                <el-button
                  type="danger"
                  @click="handleDelete(scope.$index)"
                  :disabled="scope.row.order_status == 'paid'"
                >
                  <font-awesome-icon :icon="['far', 'trash-alt']" />
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Order",
  data: function() {
    return {
      orderData: [],
      levelAmount: { month: 29.0, season: 79.0, year: 299.0 },
      levelSubject: { month: "月付", season: "季付", year: "年付" }
    };
  },
  mounted: function() {
    this.findOrder();
  },
  computed: {
    userInfo: function() {
      return this.$store.state.userInfo;
    },
    orderTableData: {
      get() {
        return this.orderData;
      },
      set(value) {
        if (Number.isInteger(value)) {
          this.orderData.splice(value, 1);
        } else if (Array.isArray(value)) {
          this.orderData = [];
        }
      }
    }
  },
  methods: {
    findOrder() {
      this.axios({
        method: "post",
        url: "/findOrder",
        headers: { "Content-Type": "application/json" },
        data: this.userInfo,
        timeout: 1000 * 5
      })
        .then(response => {
          // console.log(response.data);
          switch (response.data.status) {
            case "findSuccess":
              this.orderData = response.data.res.map(function(item) {
                return JSON.parse(item);
              });
              break;
            default:
              this.orderData = [];
              this.$message.error("订单查询失败，请检查网络设置。");
              break;
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("未知错误，请重试。若错误持续存在，请联系我们。");
        });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleSearch(index) {
      const history = this.orderTableData[index];
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
            "hammer_search*" + this.orderTableData[index].query
          );
          this.orderTableData = index;
          this.$message.success("删除成功。");
        })
        .catch(() => {
          this.$message.info("已取消删除。");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.order {
  .row-table {
    max-height: 50vh;
    .el-button {
      padding: 0.3125rem 0.75rem;
      font-size: 0.75rem;
    }
  }
}
</style>
