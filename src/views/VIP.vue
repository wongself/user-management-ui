<template>
  <div class="vip">
    <el-backtop></el-backtop>
    <div class="banner">
      <div class="container flex-center px-0 px-md-3">
        <div class="px-3 p-md-0 text-center w-100">
          <el-card v-if="isPaid" class="card-paid text-left d-inline-block">
            <h4 class="teal-text">订单支付成功</h4>
            <ul class="list-unstyled text-left mt-4">
              <li>订单名称：一二三四{{ levelSubject[vipLevel] }}VIP会员订单</li>
              <li>
                订单金额：RMB$ {{ levelAmount[vipLevel].toLocaleString() }}
              </li>
              <li>会员有效期：{{ vipStartDate }} ~ {{ vipEndDate }}</li>
            </ul>
            <p class="small grey-text">
              数据更新存在延迟，若您的会员有效期显示错误，请手动刷新页面。
            </p>
            <p class="small grey-text">
              可前往“个人中心 - 我的订单”页面可查看详细信息
            </p>
            <div class="text-right mt-4">
              <el-button size="medium" @click="isPaid = false">
                返回
              </el-button>
              <el-button
                type="primary"
                size="medium"
                @click="
                  $router.push({ path: '/user', query: { item: '我的订单' } })
                "
              >
                前往个人中心
              </el-button>
            </div>
          </el-card>
          <el-card v-else class="card-vip d-inline-block">
            <h4 class="mt-3">立即成为VIP会员</h4>
            <h5>尊享服务特权</h5>
            <el-row :gutter="20" class="row-vip text-center mt-4">
              <el-col :xs="24" :sm="8" class="col-vip">
                <el-card shadow="hover" class="card-plan">
                  <h5 class="teal-text mb-4">月卡</h5>
                  <h6>29元 / 月</h6>
                  <h6 class="small grey-text mb-4">每天仅需0.97元</h6>
                  <el-button type="primary" @click="handleDialog('month')">
                    立即预订
                  </el-button>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="8" class="col-vip">
                <el-card shadow="hover" class="card-plan">
                  <h5 class="teal-text mb-4">季卡</h5>
                  <h6>79元 / 3月</h6>
                  <h6 class="small grey-text mb-4">每天仅需0.88元</h6>
                  <el-button type="primary" @click="handleDialog('season')">
                    立即预订
                  </el-button>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="8" class="col-vip">
                <el-card shadow="hover" class="card-plan">
                  <h5 class="teal-text mb-4">年卡</h5>
                  <h6>299元 / 12月</h6>
                  <h6 class="small grey-text mb-4">每天仅需0.82元</h6>
                  <el-button type="primary" @click="handleDialog('year')">
                    立即预订
                  </el-button>
                </el-card>
              </el-col>
            </el-row>
            <h6 class="mt-4">
              特权说明：成为VIP会员后，您可以无限量查阅木头人分析信息。
            </h6>
          </el-card>
          <el-dialog
            title="订单确认"
            :visible.sync="isDialogShow"
            class="text-left"
          >
            <p class="mb-4">请确认订单信息，确认无误后点击“下单”按钮。</p>
            <p class="mt-0 mb-3">
              一二三四<span class="teal-text">{{ levelSubject[vipLevel] }}</span
              >会员（{{ levelPeriod[vipLevel] }}天）
            </p>
            <h2 class="strong teal-text">
              RMB$ {{ levelAmount[vipLevel].toLocaleString() }}
            </h2>
            <p class="mt-3 mb-0">会员生效日期：{{ vipStartDate }}</p>
            <p class="mb-4">会员失效日期：{{ vipEndDate }}</p>
            <p class="mb-1">若您拥有优惠码，请在此输入：</p>
            <el-input
              size="medium"
              placeholder="16位优惠码，仅含数字和字母"
              v-model="discount"
            ></el-input>
            <p class="mt-4 mb-1">支付方式：</p>
            <div class="mb-2">
              <el-radio v-model="paymentRadio" label="支付宝" border>
                支付宝
              </el-radio>
            </div>
            <div class="mb-4">
              <el-checkbox v-model="isRenew" disabled>自动续费</el-checkbox>
            </div>
            <p class="grey-text">
              数据更新存在延迟，若您的会员有效期显示错误，请手动刷新页面。
            </p>
            <p class="grey-text">
              如果您在结算周期未满时提出退订，恕不能向您退款。
            </p>
            <p class="grey-text">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "VIP",
  data: function() {
    return {
      isPaid: false,
      isDialogShow: false,
      vipLevel: "month",
      levelAmount: { month: 29.0, season: 79.0, year: 299.0 },
      levelPeriod: { month: 30, season: 90, year: 365 },
      levelSubject: { month: "月付", season: "季付", year: "年付" },
      discount: "",
      paymentRadio: "支付宝",
      isRenew: false,
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
            .SetDate(this.levelPeriod[this.vipLevel])
            .Format("yyyy年MM月dd日")
        : new Date(this.userInfo.vip_expire_time)
            .SetDate(this.levelPeriod[this.vipLevel])
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
        level: this.vipLevel,
        amount: this.levelAmount[this.vipLevel],
        discount: this.discount,
        method: this.paymentRadio,
        renew: this.isRenew
      });
      this.$store.commit("orderRequest");
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
.vip {
  .banner {
    width: 100%;
    height: 80vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
      url("../assets/stock.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    .card-paid {
      ul li:not(:last-child) {
        margin-bottom: 0.25rem;
      }
    }
    .card-vip .col-vip:nth-child(n + 2) {
      margin-top: 1rem;
      @media (min-width: 768px) {
        & {
          margin-top: 0;
        }
      }
    }
    .card-paid,
    .card-vip {
      width: 100%;
      @media (min-width: 768px) {
        & {
          width: 75%;
        }
      }
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
}
</style>
