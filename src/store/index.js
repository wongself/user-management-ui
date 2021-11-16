import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";
import router from "@/router";
import axios from "axios";
import { Message } from "element-ui";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Input
    searchInput: "",
    // User
    userInfo: {},
    userStatus: {},
    // Email
    emailInfo: {},
    emailStatus: {},
    // Order
    orderInfo: {},
    orderStatus: {},
    // Message
    msgError: "未知错误，请重试。若错误持续存在，请联系我们。",
    msgRegisterSuccess: "注册成功，2秒后将跳转至登录界面。",
    msgNameHasRegistered: "用户名已被占用，无法注册。",
    msgLogInSuccess: "登录成功，2秒后将跳转至首页。",
    msgLogInMismatch: "用户名或密码错误。",
    msgLogOutSuccess: "登出成功，正在跳转至首页。",
    msgFindSuccess: "密码修改成功，2秒后将跳转至登录界面。",
    msgFindFailure: "密码修改失败，请检查提交信息后重试。",
    msgEmailSendSuccess: "邮件发送成功，请前往邮箱查看。",
    msgEmailHasRegistered: "该邮箱已被占用，请更换其他邮箱或直接登录。",
    msgEmailNotRegistered: "该邮箱未被注册，请更换其他邮箱或直接注册。",
    msgEmailWrongCode: "验证码错误，请确保邮箱填写正确。",
    msgOrderSuccess: "订单创建成功，请立即支付。",
    msgOrderFailure: "订单创建失败，请检查网络后重试。",
    msgPaySuccess: "订单支付成功，请前往“个人中心 - 我的订单”页面查看。",
    msgPayFailure: "订单支付失败，请检查网络后重试。"
  },
  mutations: {
    // Input
    updateInput(state, val) {
      state.searchInput = val;
    },
    handleQuery(state) {
      var input = state.searchInput.toLowerCase();
      input = input.replace(/(^\s*)|(\s*$)/g, "");
      input = input.replace(/\s+/g, " ");
      state.searchInput = input;
      if (!input) {
        Message.error("检索关键字不能为空");
        return;
      }
      // Push
      router.push({
        path: "/rst",
        query: { query: input }
      });
      // History
      const keyName = "hammer_search*" + input;
      const time = new Date().Format("yyyy-MM-dd hh:mm:ss");
      if (!VueCookies.isKey(keyName)) {
        VueCookies.set(keyName, { query: input, time: time }, "3d");
      }
    },
    // User
    updateUserInfo(state, val) {
      state.userInfo = val;
    },
    updateUserStatus(state, val) {
      state.userStatus = val;
    },
    // Register & Log
    registerRequest(state) {
      if (state.userInfo.code != state.emailInfo.code) {
        Message.error(state.msgEmailWrongCode);
        return;
      }
      state.userStatus = { registering: true };
      axios({
        method: "post",
        url: "/register",
        headers: { "Content-Type": "application/json" },
        data: state.userInfo,
        timeout: 1000 * 5
      })
        .then(response => {
          // console.log(response.data);
          switch (response.data.status) {
            case "registerSuccess":
              state.userStatus = { registered: true };
              Message.success(state.msgRegisterSuccess);
              setTimeout(() => {
                router.push({ path: "/join", query: { join: "log" } });
                state.userStatus = {};
              }, 1000 * 2);
              break;
            case "nameRegistered":
              state.userInfo = {};
              state.userStatus = { nameRegistered: true };
              Message.error(state.msgNameHasRegistered);
              break;
            case "emailRegistered":
              state.userInfo = {};
              state.userStatus = { emailRegistered: true };
              Message.error(state.msgEmailHasRegistered);
              break;
            default:
              state.userInfo = {};
              state.userStatus = {};
              Message.error(state.msgError);
              break;
          }
        })
        .catch(error => {
          console.log(error);
          state.userInfo = {};
          state.userStatus = {};
          Message.error(state.msgError);
        });
    },
    logInRequest(state) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      state.userInfo.type = re.test(state.userInfo.name.toLowerCase())
        ? "email"
        : "name";
      state.userStatus = { loggingIn: true };
      const isRemember = state.userInfo.rmb;
      axios({
        method: "post",
        url: "/login",
        headers: { "Content-Type": "application/json" },
        data: state.userInfo,
        timeout: 1000 * 5
      })
        .then(response => {
          // console.log(response.data);
          switch (response.data.status) {
            case "logInSuccess":
              state.userInfo = JSON.parse(response.data.info);
              state.userStatus = { loggedIn: true };
              Message.success(state.msgLogInSuccess);
              if (isRemember) {
                if (VueCookies.isKey("hammer_user_token")) {
                  VueCookies.remove("hammer_user_token");
                }
                VueCookies.set("hammer_user_token", state.userInfo, "3d");
              }
              setTimeout(() => {
                router.push({ path: "/" });
              }, 1000 * 2);
              break;
            case "logInMismatch":
              state.userInfo = {};
              state.userStatus = { logInMismatch: true };
              Message.error(state.msgLogInMismatch);
              break;
            default:
              state.userInfo = {};
              state.userStatus = {};
              Message.error(state.msgError);
              break;
          }
        })
        .catch(error => {
          console.log(error);
          state.userInfo = {};
          state.userStatus = {};
          Message.error(state.msgError);
        });
    },
    cookieLogInRequest(state) {
      state.userStatus = { loggingIn: true };
      axios({
        method: "post",
        url: "/cookieLogin",
        headers: { "Content-Type": "application/json" },
        data: state.userInfo,
        timeout: 1000 * 5
      })
        .then(response => {
          // console.log(response.data);
          switch (response.data.status) {
            case "cookieValid":
              state.userInfo = JSON.parse(response.data.info);
              state.userStatus = { loggedIn: true };
              Message.info("以 " + state.userInfo.username + " 登录");
              if (VueCookies.isKey("hammer_user_token")) {
                VueCookies.remove("hammer_user_token");
              }
              VueCookies.set("hammer_user_token", state.userInfo, "3d");
              // router.push({ path: "/" });
              break;
            default:
              state.userInfo = {};
              state.userStatus = {};
              if (VueCookies.isKey("hammer_user_token")) {
                VueCookies.remove("hammer_user_token");
              }
              router.push({ path: "/join", query: { join: "log" } });
              break;
          }
        })
        .catch(error => {
          console.log(error);
          state.userInfo = {};
          state.userStatus = {};
          Message.error(state.msgError);
          router.push({ path: "/" });
        });
    },
    logOutRequest(state) {
      Message.info(state.msgLogOutSuccess);
      if (VueCookies.isKey("hammer_user_token")) {
        VueCookies.remove("hammer_user_token");
      }
      state.userInfo = {};
      state.userStatus = { loggedOut: true };
      setTimeout(() => {
        router.push({ path: "/" });
      }, 1000 * 1);
    },
    forgetRequest(state) {
      if (state.userInfo.code != state.emailInfo.code) {
        Message.error(state.msgEmailWrongCode);
        return;
      }
      state.userStatus = { finding: true };
      axios({
        method: "post",
        url: "/forget",
        headers: { "Content-Type": "application/json" },
        data: state.userInfo,
        timeout: 1000 * 5
      })
        .then(response => {
          // console.log(response.data);
          switch (response.data.status) {
            case "findSuccess":
              state.userStatus = { found: true };
              Message.success(state.msgFindSuccess);
              setTimeout(() => {
                router.push({ path: "/join", query: { join: "log" } });
                state.userStatus = {};
              }, 1000 * 2);
              break;
            case "notRegistered":
              state.userInfo = {};
              state.userStatus = { notRegistered: true };
              Message.error(state.msgEmailNotRegistered);
              break;
            case "findFailure":
              state.userInfo = {};
              state.userStatus = { notFound: true };
              Message.success(state.msgFindFailure);
              break;
            default:
              state.userInfo = {};
              state.userStatus = {};
              Message.error(state.msgError);
              break;
          }
        })
        .catch(error => {
          console.log(error);
          state.userInfo = {};
          state.userStatus = {};
          Message.error(state.msgError);
        });
    },
    // Email
    updateEmailInfo(state, val) {
      state.emailInfo = val;
    },
    updateEmailStatus(state, val) {
      state.emailStatus = val;
    },
    emailRequest(state, type = "reg") {
      state.emailInfo.code = String(Math.random()).substr(2, 5);
      state.emailInfo.type = type;
      state.emailStatus = { sending: true };
      axios({
        method: "post",
        url: "/email",
        headers: { "Content-Type": "application/json" },
        data: state.emailInfo,
        timeout: 1000 * 5
      })
        .then(response => {
          // console.log(response.data);
          switch (response.data.status) {
            case "emailSuccess":
              state.emailStatus = { sent: true };
              Message.success(state.msgEmailSendSuccess);
              break;
            case "hasRegistered":
              state.emailInfo = {};
              state.emailStatus = { hasRegistered: true };
              Message.error(state.msgEmailHasRegistered);
              break;
            case "notRegistered":
              state.emailInfo = {};
              state.emailStatus = { notRegistered: true };
              Message.error(state.msgEmailNotRegistered);
              break;
            default:
              state.emailInfo = {};
              state.emailStatus = {};
              Message.error(state.msgError);
              break;
          }
        })
        .catch(error => {
          console.log(error);
          state.emailInfo = {};
          state.emailStatus = {};
          Message.error(state.msgError);
        });
    },
    // Order
    updateOrderInfo(state, val) {
      state.orderInfo = val;
    },
    updateOrderStatus(state, val) {
      state.orderStatus = val;
    },
    orderRequest(state, obj = {}) {
      state.orderInfo.type = obj.custom ? obj.customType : "vip";
      state.orderStatus = { ordering: true };
      axios({
        method: "post",
        url: "/order",
        headers: { "Content-Type": "application/json" },
        data: state.orderInfo,
        timeout: 1000 * 5
      })
        .then(response => {
          console.log(response.data);
          switch (response.data.status) {
            case "orderSuccess":
              state.orderInfo.orderId = response.data.orderId;
              state.orderStatus = { ordered: true };
              window.open(response.data.jump, "_blank");
              Message.success(state.msgOrderSuccess);
              break;
            default:
              state.orderInfo = {};
              state.orderStatus = { orderFailed: true };
              Message.error(state.msgOrderFailure);
              break;
          }
        })
        .catch(error => {
          console.log(error);
          state.orderInfo = {};
          state.orderStatus = {};
          Message.error(state.msgError);
        });
    },
    confirmPaid(state) {
      state.orderStatus = { ordering: true };
      axios({
        method: "post",
        url: "/confirmPaid",
        headers: { "Content-Type": "application/json" },
        data: state.orderInfo,
        timeout: 1000 * 5
      })
        .then(response => {
          // console.log(response.data);
          switch (response.data.status) {
            case "paidSuccess":
              state.userInfo = JSON.parse(response.data.info);
              state.orderStatus = { paid: true };
              Message.success(state.msgPaySuccess);
              break;
            default:
              state.orderInfo = {};
              state.orderStatus = { payFailed: true };
              Message.error(state.msgPayFailure);
              break;
          }
        })
        .catch(error => {
          console.log(error);
          state.orderInfo = {};
          state.orderStatus = {};
          Message.error(state.msgError);
        });
    }
  },
  actions: {},
  modules: {}
});
