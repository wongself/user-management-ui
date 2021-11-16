<template>
  <div class="advance container px-0 px-md-3">
    <el-backtop></el-backtop>
    <div class="px-3 p-md-0">
      <el-row class="row-advance">
        <el-col :span="24" class="col-advance">
          <h1 class="mt-5 mb-5">高级查询</h1>
          <el-form
            label-position="left"
            label-width="100px"
            :model="formAdvance"
          >
            <el-form-item label="木头人性别">
              <el-radio-group v-model="formAdvance.sex">
                <el-radio label="不限"></el-radio>
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="评分区间">
              <el-input-number
                v-model="formAdvance.scoreMin"
                :min="1"
                :max="10"
                label="评分下限"
              ></el-input-number>
              <span class="h6 mx-3 mb-0">~</span>
              <el-input-number
                v-model="formAdvance.scoreMax"
                :min="formAdvance.scoreMin"
                :max="10"
                label="评分上限"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="从业时长">
              <el-checkbox-group v-model="formAdvance.experience">
                <el-checkbox
                  v-for="(exp, index) in experiences"
                  :key="index"
                  :label="exp"
                  name="type"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="从业时长">
              <el-checkbox
                :indeterminate="isIndetAgcy"
                v-model="agencyAll"
                @change="handleAgencyAllChange"
                >全选</el-checkbox
              >
              <el-checkbox-group
                v-model="formAdvance.agency"
                @change="handleAgenciesChange"
              >
                <el-checkbox
                  v-for="(agcy, index) in agencies"
                  :key="index"
                  :label="agcy"
                  name="type"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="历史项目">
              <el-checkbox
                :indeterminate="isIndetHist"
                v-model="historyAll"
                @change="handleHistoryAllChange"
                >全选</el-checkbox
              >
              <el-checkbox-group
                v-model="formAdvance.history"
                @change="handleHistoriesChange"
              >
                <el-checkbox
                  v-for="(hist, index) in histories"
                  :key="index"
                  :label="hist"
                  name="type"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleQuery()">查询</el-button>
              <el-button @click="handleReset()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Advance",
  data: function() {
    return {
      formAdvance: {
        sex: "不限",
        scoreMin: 1,
        scoreMax: 10,
        experience: [],
        agency: [],
        history: []
      },
      // Experience
      experiences: ["1年以内", "1年~3年", "3年~5年", "5年~10年", "10年以上"],
      // Agency
      isIndetAgcy: false,
      agencies: [
        "xxxx有限公司",
        "xxxx有限公司",
        "xxxx有限公司",
        "xxxx有限公司",
        "xxxx有限公司",
        "xxxx有限公司",
        "xxxx有限公司"
      ],
      agencyAll: false,
      // History
      isIndetHist: false,
      histories: [
        "834678324331.DZ ",
        "834678324332.DZ 行",
        "834678324333.DZ ",
        "834678324334.DZ 台",
        "834678324335.DZ ",
        "834678324336.DZ 金",
        "834678324337.DZ ",
        "834678324338.DZ "
      ],
      historyAll: false
    };
  },
  methods: {
    handleAgencyAllChange(val) {
      this.formAdvance.agency = val ? this.agencies : [];
      this.isIndetAgcy = false;
    },
    handleAgenciesChange(val) {
      let checkedCount = val.length;
      this.agencyAll = checkedCount === this.agencies.length;
      this.isIndetAgcy =
        checkedCount > 0 && checkedCount < this.agencies.length;
    },
    handleHistoryAllChange(val) {
      this.formAdvance.history = val ? this.histories : [];
      this.isIndetHist = false;
    },
    handleHistoriesChange(val) {
      let checkedCount = val.length;
      this.historyAll = checkedCount === this.histories.length;
      this.isIndetHist =
        checkedCount > 0 && checkedCount < this.histories.length;
    },
    handleQuery() {
      // Push
      // router.push({
      //   path: "/docs",
      //   query: { query: input }
      // });
    },
    handleReset() {
      this.formAdvance = {
        sex: "",
        scoreMin: 1,
        scoreMax: 10,
        experience: [],
        agency: [],
        history: []
      };
      [this.agencyAll, this.historyAll] = [false, false];
      [this.isIndetAgcy, this.isIndetHist] = [false, false];
    }
  }
};
</script>

<style scoped lang="scss">
.advance {
  .row-advance {
    .el-checkbox {
      margin-right: 1rem;
    }
  }
}
</style>
