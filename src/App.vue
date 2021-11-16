<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <main>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </main>
    <footer>
      <Infobar />
    </footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Infobar from "@/components/Infobar.vue";

export default {
  name: "app",
  components: { Navbar, Infobar },
  created: function() {
    this.cookieLogIn();
  },
  methods: {
    cookieLogIn() {
      if (this.$cookies.isKey("hammer_user_token")) {
        const info = this.$cookies.get("hammer_user_token");
        this.$store.commit("updateUserInfo", info);
        this.$store.commit("cookieLogInRequest");
      }
    }
  }
};

Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

Date.prototype.SetDate = function(day) {
  this.setDate(this.getDate() + day);
  return this;
};
</script>

<style lang="scss">
::selection {
  color: #ffffff;
  background-color: #dc3545;
}
#app {
  font-family: -apple-system, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
main {
  min-height: calc(100vh - 60px - 310.9px);
}
</style>
