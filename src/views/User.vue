<template>
  <div class="user container px-0 px-md-3">
    <el-backtop></el-backtop>
    <div v-if="this.userStatus.loggedIn" class="px-3 p-md-0">
      <el-row class="row-user">
        <el-col :span="24" class="col-user mt-4">
          <el-card shadow="never" class="mt-3 mb-5">
            <el-row :gutter="20" class="row-info">
              <el-col :xs="24" :sm="6" :lg="4" class="col-avatar text-center">
                <p class="teal-text mb-2">{{ userInfo.username }}</p>
                <img src="..\assets\avatar.png" alt="Avatar" height="60" />
                <p class="small mt-2 mb-0">
                  <span class="mr-1">加入于</span>
                  <span>{{
                    new Date(userInfo.register_time).Format("yyyy-MM-dd")
                  }}</span>
                </p>
              </el-col>
              <el-col :xs="24" :sm="18" :lg="20" class="col-level">
                <el-tag effect="dark" class="mt-1">
                  <span v-if="fBasic">普通</span
                  ><span v-else-if="fMonth">月付</span
                  ><span v-else-if="fSeason">季付</span
                  ><span v-else-if="fYear">年付</span
                  ><span v-else>特殊</span>用户
                </el-tag>
                <span></span>
                <p class="small mt-3 mb-0">
                  <span v-if="fBasic">
                    <span v-if="false">会员资格已于失效</span>
                    <span v-else>暂未开通会员</span>
                  </span>
                  <span v-else
                    >会员有效期：{{ effectDate }} ~ {{ expireDate }}</span
                  >
                  <el-link
                    @click="$router.push({ path: '/vip' })"
                    class="teal-text ml-3"
                  >
                    <span v-if="fBasic">开通会员</span>
                    <span v-else>会员续费</span>
                  </el-link>
                </p>
                <p class="small grey-text mt-0 mb-2">
                  数据更新存在延迟，若您支付的订单没有显示，请手动刷新页面。
                </p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="row-tab">
        <el-col :span="24" class="col-tab mt-4">
          <el-tabs v-model="itemTab" tab-position="left">
            <el-tab-pane label="浏览历史" name="浏览历史">
              <History />
            </el-tab-pane>
            <el-tab-pane label="我的关注" name="我的关注">
              <p>
                But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happiness. No one rejects, dislikes, or avoids pleasure
                itself, because it is pleasure, but because those who do not
                know how to pursue pleasure rationally encounter consequences
                that are extremely painful. Nor again is there anyone who loves
                or pursues or desires to obtain pain of itself, because it is
                pain, but because occasionally circumstances occur in which toil
                and pain can procure him some great pleasure. To take a trivial
                example, which of us ever undertakes laborious physical
                exercise, except to obtain some advantage from it? But who has
                any right to find fault with a man who chooses to enjoy a
                pleasure that has no annoying consequences, or one who avoids a
                pain that produces no resultant pleasure?
              </p>
            </el-tab-pane>
            <el-tab-pane label="我的订单" name="我的订单">
              <Order />
            </el-tab-pane>
            <el-tab-pane label="账户设置" name="账户设置">
              <p>
                On the other hand, we denounce with righteous indignation and
                dislike men who are so beguiled and demoralized by the charms of
                pleasure of the moment, so blinded by desire, that they cannot
                foresee the pain and trouble that are bound to ensue; and equal
                blame belongs to those who fail in their duty through weakness
                of will, which is the same as saying through shrinking from toil
                and pain. These cases are perfectly simple and easy to
                distinguish. In a free hour, when our power of choice is
                untrammelled and when nothing prevents our being able to do what
                we like best, every pleasure is to be welcomed and every pain
                avoided. But in certain circumstances and owing to the claims of
                duty or the obligations of business it will frequently occur
                that pleasures have to be repudiated and annoyances accepted.
                The wise man therefore always holds in these matters to this
                principle of selection: he rejects pleasures to secure other
                greater pleasures, or else he endures pains to avoid worse
                pains.
              </p>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import History from "@/components/History.vue";
import Order from "@/components/Order.vue";

export default {
  name: "User",
  components: { History, Order },
  data: function() {
    return {
      itemTab: "浏览历史"
    };
  },
  computed: {
    userInfo: function() {
      return this.$store.state.userInfo;
    },
    userStatus: function() {
      return this.$store.state.userStatus;
    },
    fBasic: function() {
      return this.userInfo.vip_level == "basic";
    },
    fMonth: function() {
      return this.userInfo.vip_level == "month";
    },
    fSeason: function() {
      return this.userInfo.vip_level == "season";
    },
    fYear: function() {
      return this.userInfo.vip_level == "year";
    },
    effectDate: function() {
      return new Date(this.userInfo.vip_effect_time).Format("yyyy年MM月dd日");
    },
    expireDate: function() {
      return new Date(this.userInfo.vip_expire_time).Format("yyyy年MM月dd日");
    }
  },
  watch: {
    $route() {
      this.routeCheck();
    }
  },
  mounted: function() {
    this.routeCheck();
  },
  methods: {
    routeCheck() {
      if (!this.userStatus.loggedIn) {
        this.$message.warning("尚未登录，正在获取账户信息。");
        // this.$router.push({ path: "/join", query: { join: "log" } });
      }
      const item = this.$route.query.item;
      this.itemTab = item ? item : "浏览历史";
    }
  }
};
</script>

<style scoped lang="scss">
.user {
  .row-user {
    .el-link {
      transform: translateY(-2px);
    }
    .col-avatar {
      margin-bottom: 1rem;
      @media (min-width: 768px) {
        & {
          margin-bottom: 0;
        }
      }
    }
  }
  .row-tab {
    .el-tab-pane {
      margin-left: 0.5rem;
    }
  }
}
</style>
