<template>
  <div class="navbar py-3">
    <div class="container-fluid px-0">
      <div class="d-flex align-items-center w-100">
        <el-link
          :underline="false"
          @click="$router.push({ path: '/vip' })"
          class="ml-auto"
        >
          <span class="h6 m-0"
            >木头人<span class="d-none d-sm-inline-block">服务</span></span
          >
        </el-link>
        <el-link
          :underline="false"
          @click="$router.push({ path: '/cust' })"
          class="ml-3 ml-md-4 mr-0 mr-sm-3"
        >
          <span class="h6 m-0"
            >定制化<span class="d-none d-sm-inline-block">服务</span></span
          >
        </el-link>
        <span class="ml-2 ml-md-3 mr-0 mr-md-3">
          <span v-if="userStatus.loggedIn" class="flex-center">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link d-flex align-items-center">
                <el-avatar :size="24" class="mr-2">
                  <img src="@/assets/avatar.png" />
                </el-avatar>
                <font-awesome-icon :icon="['fas', 'angle-down']" size="lg" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>
                  <span class="text-dark">以 {{ userInfo.username }} 登录</span>
                </el-dropdown-item>
                <el-dropdown-item command="user" divided>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item command="浏览历史">
                  浏览历史
                </el-dropdown-item>
                <el-dropdown-item command="我的关注">
                  我的关注
                </el-dropdown-item>
                <el-dropdown-item command="我的订单">
                  我的订单
                </el-dropdown-item>
                <el-dropdown-item command="账户设置">
                  账户设置
                </el-dropdown-item>
                <el-dropdown-item command="logOut" divided>
                  <span class="mr-2">登出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <span v-else class="flex-center">
            <el-button
              type="primary"
              size="mini"
              @click="handleRegister()"
              class="d-none d-sm-flex"
            >
              注册
            </el-button>
            <el-button size="mini" @click="handleLogIn()">
              登录
            </el-button>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    userInfo: function() {
      return this.$store.state.userInfo;
    },
    userStatus: function() {
      return this.$store.state.userStatus;
    }
  },
  methods: {
    handleRegister() {
      this.$store.commit("updateUserInfo", {});
      this.$store.commit("updateUserStatus", {});
      this.$router.push({ path: "/join", query: { join: "reg" } });
    },
    handleLogIn() {
      this.$store.commit("updateUserInfo", {});
      this.$store.commit("updateUserStatus", {});
      this.$router.push({ path: "/join", query: { join: "log" } });
    },
    handleCommand(cmd) {
      if (cmd == "logOut") {
        this.$store.commit("logOutRequest");
      } else if (cmd == "user") {
        this.$router.push({ path: "/user" });
      } else {
        this.$router.push({ path: "/user", query: { item: cmd } });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.navbar {
  .logo {
    ::v-deep .el-link--inner {
      display: flex;
      align-items: center;
    }
  }
}
</style>
