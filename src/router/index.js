import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Advance from "@/views/Advance.vue";
import Result from "@/views/Result.vue";
import Sponsor from "@/views/Sponsor.vue";
import VIP from "@/views/VIP.vue";
import Customize from "@/views/Customize.vue";
import CustomAnalysis from "@/views/CustomAnalysis.vue";
import Join from "@/views/Join.vue";
import User from "@/views/User.vue";
import Help from "@/views/Help.vue";

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "一二三四 - 首页",
      keepAlive: true
    }
  },
  {
    path: "/adv",
    name: "Advance",
    component: Advance,
    meta: {
      title: "一二三四 - 高级查询",
      keepAlive: true
    }
  },
  {
    path: "/rst",
    name: "Result",
    component: Result,
    meta: {
      title: "一二三四 - 查询结果",
      keepAlive: false
    }
  },
  {
    path: "/sps",
    name: "Sponsor",
    component: Sponsor,
    meta: {
      title: "一二三四 - 木头人详情",
      keepAlive: false
    }
  },
  {
    path: "/vip",
    name: "VIP",
    component: VIP,
    meta: {
      title: "一二三四 - VIP会员",
      keepAlive: false
    }
  },
  {
    path: "/cust",
    name: "Customize",
    component: Customize,
    meta: {
      title: "一二三四 - 定制化服务",
      keepAlive: false
    }
  },
  {
    path: "/cust_ansis",
    name: "CustomAnalysis",
    component: CustomAnalysis,
    meta: {
      title: "一二三四 - 定制化服务",
      keepAlive: false
    }
  },
  {
    path: "/join",
    name: "Join",
    component: Join,
    meta: {
      title: "一二三四 - 加入我们",
      keepAlive: false
    }
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: {
      title: "一二三四 - 个人中心",
      keepAlive: false
    }
  },
  {
    path: "/help",
    name: "Help",
    component: Help,
    meta: {
      title: "一二三四 - 帮助中心",
      keepAlive: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
