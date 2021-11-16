<template>
  <div class="custom-analysis container px-0 px-md-3">
    <el-backtop></el-backtop>
    <div class="px-3 p-md-0">
      <el-card class="card-custom w-100 mt-5">
        <el-row :gutter="30" class="row-custom">
          <el-col :xs="24" :sm="10" :md="14" class="col-text">
            <h5 class="strong teal-text mt-2 mb-4">
              企业定制化木头人分析报告
            </h5>
            <p class="mb-2">
              服务周期：1至3个月
            </p>
            <p class="mb-2">
              收费标准：10万至100万
            </p>
            <p class="mb-1">
              成员配置：
            </p>
            <ol class="ol-custom">
              <li>项目经理1名</li>
              <li>木头人分析师1名</li>
              <li>投资者关系分析师1名</li>
            </ol>
          </el-col>
          <el-col :xs="24" :sm="14" :md="10" class="col-img text-center">
            <img alt="一二三四" src="@/assets/pair.svg" height="240" />
          </el-col>
        </el-row>
      </el-card>
      <el-card class="card-standard w-100 mt-5 mb-5">
        <el-row :gutter="30" class="row-standard">
          <el-col :xs="24" :sm="10" :md="14" class="col-standard">
            <h5 class="strong teal-text mt-2 mb-3">
              服务标准
            </h5>
            <ol class="ol-standard">
              <li>每周一次分析报告</li>
              <li>7x24小时一对一咨询服务</li>
              <li>提供3至5名木头人候选人</li>
              <li>每月提供一次完整的数据分析结果</li>
            </ol>
          </el-col>
        </el-row>
      </el-card>
      <div class="text-center mb-5">
        <el-button type="primary" @click="handleDialog()">
          立即预订
        </el-button>
      </div>
      <el-dialog
        title="订单确认"
        :visible.sync="isDialogShow"
        class="text-left"
      >
        <p class="mb-4">请确认订单信息，确认无误后点击“下单”按钮。</p>
        <p class="mt-0 mb-3">
          一二三四<span class="teal-text">{{ levelSubject[customLevel] }}</span>
        </p>
        <h2 class="strong teal-text">
          RMB$ {{ levelAmount[customLevel].toLocaleString() }}
        </h2>
        <el-radio-group v-model="customLevel" size="small" class="mt-2 mb-2">
          <el-radio-button label="one">一个月</el-radio-button>
          <el-radio-button label="two">两个月</el-radio-button>
          <el-radio-button label="three">三个月</el-radio-button>
        </el-radio-group>
        <p class="mt-3 mb-0">会员生效日期：{{ vipStartDate }}</p>
        <p class="mb-4">会员失效日期：{{ vipEndDate }}</p>
        <p class="mt-4 mb-1">支付方式：</p>
        <div class="mb-4">
          <el-radio v-model="paymentRadio" label="支付宝" border>
            支付宝
          </el-radio>
        </div>
        <p class="grey-text mb-1">
          数据更新存在延迟，若您的会员有效期显示错误，请手动刷新页面。
        </p>
        <p class="grey-text mb-1">
          如果您在结算周期未满时提出退订，恕不能向您退款。
        </p>
        <p class="grey-text mb-1">
          继续操作即表示您同意遵守本网站的服务条款。
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="handleCancel()">
            取消
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="handleOrder()"
            :loading="isOrderLoad"
          >
            {{ btnOrderText }}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Customize",
  data: function() {
    return {
      isPaid: false,
      isDialogShow: false,
      customLevel: "analysis_one",
      levelAmount: {
        analysis_one: 100000.0,
        analysis_two: 500000.0,
        analysis_three: 1000000.0
      },
      levelPeriod: { analysis_one: 30, analysis_two: 60, analysis_three: 90 },
      levelSubject: {
        analysis_one: "企业定制化木头人分析报告（一个月）",
        analysis_two: "企业定制化木头人分析报告（两个月）",
        analysis_three: "企业定制化木头人分析报告（三个月）"
      },
      paymentRadio: "支付宝",
      btnOrderText: "下单",
      isOrderLoad: false,
      timerOrder: null,
      timerPaid: null
    };
  },
  computed: {
    userInfo: function() {
      return this.$store.state.userInfo;
    },
    userStatus: function() {
      return this.$store.state.userStatus;
    },
    orderStatus: function() {
      return this.$store.state.orderStatus;
    },
    isExpired: function() {
      return (
        !this.userInfo.vip_expire_time ||
        new Date(this.userInfo.vip_expire_time) < new Date()
      );
    },
    vipStartDate: function() {
      return this.isExpired
        ? new Date().Format("yyyy年MM月dd日")
        : new Date(this.userInfo.vip_effect_time).Format("yyyy年MM月dd日");
    },
    vipEndDate: function() {
      return this.isExpired
        ? new Date()
            .SetDate(this.levelPeriod[this.customLevel])
            .Format("yyyy年MM月dd日")
        : new Date(this.userInfo.vip_expire_time)
            .SetDate(this.levelPeriod[this.customLevel])
            .Format("yyyy年MM月dd日");
    }
  },
  methods: {
    handleDialog(level) {
      if (!this.userStatus.loggedIn) {
        this.$message.error("尚未登录，无法进行该操作。");
        this.$router.push({ path: "/join", query: { join: "log" } });
      }
      this.vipLevel = level;
      this.isDialogShow = true;
    },
    handleCancel() {
      this.isDialogShow = false;
    },
    handleOrder() {
      // Order
      this.isOrderLoad = true;
      this.btnOrderText = "下单中...";
      this.$store.commit("updateOrderInfo", {
        userId: this.userInfo._id,
        level: "analysis_" + this.customLevel,
        amount: this.levelAmount[this.customLevel],
        method: this.paymentRadio
      });
      // this.$store.commit("orderRequest", {
      //   custom: true,
      //   customType: "analysis"
      // });
      // Fetch
      if (!this.timerOrder) {
        this.timerOrder = setInterval(() => {
          if (this.orderStatus.ordered || this.orderStatus.orderFailed) {
            this.isDialogShow = false;
            setTimeout(() => {
              this.isOrderLoad = false;
              this.btnOrderText = "下单";
              if (this.orderStatus.ordered) {
                this.waitOrderPaid();
              }
            }, 300);
            clearInterval(this.timerOrder);
            this.timerOrder = null;
          }
        }, 500);
      }
    },
    waitOrderPaid() {
      this.$msgbox({
        title: "支付成功？",
        message: "确认支付成功后，请点击“支付完毕”按钮。",
        showCancelButton: true,
        confirmButtonText: "支付完毕",
        cancelButtonText: "返回",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "确认中...";
            this.$store.commit("confirmPaid");
            // Fetch
            if (!this.timerPaid) {
              this.timerPaid = setInterval(() => {
                if (this.orderStatus.paid || this.orderStatus.payFailed) {
                  done();
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                    if (this.orderStatus.paid) {
                      this.isPaid = true;
                    }
                  }, 300);
                  clearInterval(this.timerPaid);
                  this.timerPaid = null;
                }
              }, 500);
            }
          } else {
            done();
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.custom-analysis {
  .row-standard ol li {
    margin-bottom: 0.5rem;
  }
  ::v-deep .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 2rem);
    max-width: calc(100% - 2rem);
    @media (min-width: 576px) {
      & {
        width: 460px;
      }
    }
    .el-dialog__body {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
