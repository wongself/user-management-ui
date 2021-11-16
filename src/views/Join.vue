<template>
  <div class="join">
    <el-backtop></el-backtop>
    <div class="banner">
      <div class="container flex-center px-0 px-md-3">
        <div class="px-3 p-md-0 text-center w-100">
          <el-card class="card-join d-inline-block">
            <span v-if="userStatus.registered">
              <div>
                <font-awesome-icon
                  :icon="['fas', 'check-square']"
                  :style="{ color: '#009688' }"
                  size="3x"
                />
              </div>
              <h1 class="strong teal-text mt-5 mb-5">注册成功</h1>
              <el-button
                type="primary"
                @click="$router.push({ path: '/join', query: { join: 'log' } })"
              >
                立即登录
              </el-button>
              <p class="grey-text mt-3 mb-0">稍后将自动跳转至登录界面</p>
            </span>
            <span v-else-if="userStatus.loggedIn">
              <div>
                <font-awesome-icon
                  :icon="['fas', 'check-square']"
                  :style="{ color: '#009688' }"
                  size="3x"
                />
              </div>
              <h1 class="strong teal-text mt-5 mb-5">登录成功</h1>
              <el-button type="primary" @click="$router.push({ path: '/' })">
                回到首页
              </el-button>
              <p class="grey-text mt-3 mb-0">稍后将自动跳转至首页</p>
            </span>
            <span v-else-if="userStatus.found">
              <div>
                <font-awesome-icon
                  :icon="['fas', 'check-square']"
                  :style="{ color: '#009688' }"
                  size="3x"
                />
              </div>
              <h1 class="strong teal-text mt-5 mb-5">修改成功</h1>
              <el-button
                type="primary"
                @click="$router.push({ path: '/join', query: { join: 'log' } })"
              >
                立即登录
              </el-button>
              <p class="grey-text mt-3 mb-0">稍后将自动跳转至登录界面</p>
            </span>
            <span v-else class="mt-2">
              <el-form
                v-if="join == 'reg'"
                :model="regForm"
                :rules="regRule"
                :validate-on-rule-change="false"
                ref="regForm"
                class="form-register"
                size="small"
                status-icon
              >
                <el-form-item>
                  <h5 class="strong teal-text">注册</h5>
                </el-form-item>
                <el-form-item prop="name">
                  <el-input
                    v-model="regForm.name"
                    placeholder="用户名"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input v-model="regForm.email" placeholder="电子邮箱">
                    <el-button
                      slot="append"
                      @click="sendCode(regForm, 'regForm')"
                      :loading="isEmailCodeLoad"
                    >
                      {{ btnEmailCodeText }}
                    </el-button>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    v-model="regForm.code"
                    placeholder="验证码"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                  <el-input
                    type="password"
                    v-model="regForm.pwd"
                    placeholder="密码"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="pwdConfirm">
                  <el-input
                    type="password"
                    v-model="regForm.pwdConfirm"
                    placeholder="确认密码"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('regForm')"
                    class="w-100 mt-2 mb-2"
                  >
                    注册
                  </el-button>
                </el-form-item>
              </el-form>
              <el-form
                v-else-if="join == 'log'"
                :model="logForm"
                :rules="logRule"
                :validate-on-rule-change="false"
                ref="logForm"
                class="form-login"
                status-icon
              >
                <el-form-item>
                  <h5 class="strong teal-text">登录</h5>
                </el-form-item>
                <el-form-item prop="name">
                  <el-input
                    v-model="logForm.name"
                    placeholder="用户名/邮箱"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                  <el-input
                    type="password"
                    v-model="logForm.pwd"
                    placeholder="密码"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <h6 class="form-feat text-right mt-2 mb-2">
                  <el-link
                    @click="
                      $router.push({ path: '/join', query: { join: 'find' } })
                    "
                  >
                    <span class="teal-text">忘记密码？</span>
                  </el-link>
                </h6>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('logForm')"
                    class="w-100 mt-2 mb-2"
                  >
                    登录
                  </el-button>
                </el-form-item>
                <el-form-item class="mt-0 mb-4">
                  <el-checkbox v-model="isRemember">记住我</el-checkbox>
                </el-form-item>
              </el-form>
              <el-form
                v-else-if="join == 'find'"
                :model="findForm"
                :rules="findRule"
                :validate-on-rule-change="false"
                ref="findForm"
                class="form-find"
                status-icon
              >
                <el-form-item>
                  <h5 class="strong teal-text">找回密码</h5>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input v-model="findForm.email" placeholder="电子邮箱">
                    <el-button
                      slot="append"
                      @click="sendCode(findForm, 'findForm')"
                      :loading="isEmailCodeLoad"
                    >
                      {{ btnEmailCodeText }}
                    </el-button>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    v-model="findForm.code"
                    placeholder="验证码"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                  <el-input
                    type="password"
                    v-model="findForm.pwd"
                    placeholder="密码"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="pwdConfirm">
                  <el-input
                    type="password"
                    v-model="findForm.pwdConfirm"
                    placeholder="确认密码"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('findForm')"
                    class="w-100 mt-2 mb-2"
                  >
                    确认
                  </el-button>
                </el-form-item>
              </el-form>
              <h6 v-if="join == 'log'" class="form-feat mt-3 mb-0">
                还没有加入我们？<el-link
                  @click="
                    $router.push({ path: '/join', query: { join: 'reg' } })
                  "
                >
                  <span class="teal-text">马上注册</span></el-link
                >！
              </h6>
              <h6 v-if="join != 'log'" class="form-feat mt-3 mb-0">
                已经加入我们？<el-link
                  @click="
                    $router.push({ path: '/join', query: { join: 'log' } })
                  "
                >
                  <span class="teal-text">马上登录</span></el-link
                >！
              </h6>
              <h6 class="form-feat mt-3 mb-0">
                登录、注册即代表同意《<el-link
                  @click="
                    $router.push({ path: '/help', query: { item: '用户协议' } })
                  "
                >
                  <span class="teal-text">用户协议</span> </el-link
                >》及《<el-link
                  @click="
                    $router.push({ path: '/help', query: { item: '免责声明' } })
                  "
                >
                  <span class="teal-text">免责声明</span> </el-link
                >》
              </h6>
            </span>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    var validateNameReg = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      let re = /^[a-zA-Z0-9_]{4,32}$/;
      setTimeout(() => {
        if (!re.test(value)) {
          callback(new Error("仅含数字、字母或下划线，最短4位，最长32位"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入电子邮箱"));
      }
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      setTimeout(() => {
        if (!re.test(value.toLowerCase())) {
          callback(new Error("邮箱地址不正确"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      }
      let re = /^[0-9]{5}$/;
      setTimeout(() => {
        if (!re.test(value)) {
          callback(new Error("验证码仅含5位数字"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePwdReg = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        if (this.regForm.pwdConfirm) {
          this.$refs.regForm.validateField("pwdConfirm");
        }
        let re = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,32}$/;
        setTimeout(() => {
          if (!re.test(value)) {
            callback(
              new Error("必须包含字母和数字，至少8个字符，至多32个字符")
            );
          } else {
            callback();
          }
        }, 1000);
      }
    };
    var validatePwdConfirmReg = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value != this.regForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateNameLog = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名或邮箱"));
      } else {
        callback();
      }
    };
    var validatePwdLog = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePwdFind = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        if (this.findForm.pwdConfirm) {
          this.$refs.findForm.validateField("pwdConfirm");
        }
        let re = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,32}$/;
        setTimeout(() => {
          if (!re.test(value)) {
            callback(
              new Error("必须包含字母和数字，至少8个字符，至多32个字符")
            );
          } else {
            callback();
          }
        }, 1000);
      }
    };
    var validatePwdConfirmFind = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value != this.findForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      join: "",
      isRemember: true,
      isEmailCodeLoad: false,
      cntEmailCodeLoad: 10,
      timerEmailCodeLoad: null,
      // Register
      regForm: {
        name: "",
        email: "",
        code: "",
        pwd: "",
        pwdConfirm: ""
      },
      regRule: {
        name: [{ validator: validateNameReg, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        pwd: [{ validator: validatePwdReg, trigger: "blur" }],
        pwdConfirm: [{ validator: validatePwdConfirmReg, trigger: "blur" }]
      },
      // Log
      logForm: {
        name: "",
        pwd: ""
      },
      logRule: {
        name: [{ validator: validateNameLog, trigger: "blur" }],
        pwd: [{ validator: validatePwdLog, trigger: "blur" }]
      },
      // Find
      findForm: {
        email: "",
        code: "",
        pwd: "",
        pwdConfirm: ""
      },
      findRule: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        pwd: [{ validator: validatePwdFind, trigger: "blur" }],
        pwdConfirm: [{ validator: validatePwdConfirmFind, trigger: "blur" }]
      }
      // Email
    };
  },
  computed: {
    userStatus: function() {
      return this.$store.state.userStatus;
    },
    btnEmailCodeText: function() {
      return this.isEmailCodeLoad
        ? this.cntEmailCodeLoad + "秒后重发"
        : "获取验证码";
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
      const join = this.$route.query.join;
      this.join = join ? join : "reg";
    },
    sendCode(form, formName) {
      this.$refs[formName].validateField("email", error => {
        if (!error) {
          this.isEmailCodeLoad = true;
          this.$store.commit("updateEmailInfo", { email: form.email });
          this.$store.commit(
            "emailRequest",
            formName == "findForm" ? "find" : "reg"
          );
          if (!this.timerEmailCodeLoad) {
            this.timerEmailCodeLoad = setInterval(() => {
              if (this.cntEmailCodeLoad > 0 && this.cntEmailCodeLoad <= 10) {
                this.cntEmailCodeLoad--;
              } else {
                this.isEmailCodeLoad = false;
                this.cntEmailCodeLoad = 10;
                clearInterval(this.timerEmailCodeLoad);
                this.timerEmailCodeLoad = null;
              }
            }, 1000);
          }
        }
      });
    },
    submitForm(formName) {
      this.$message.info("正在提交您的请求，请稍后。");
      this.$refs[formName].validate(valid => {
        if (valid) {
          switch (formName) {
            case "regForm":
              this.$store.commit("updateUserInfo", {
                name: this.regForm.name,
                email: this.regForm.email,
                code: this.regForm.code,
                pwd: this.regForm.pwd
              });
              this.$store.commit("registerRequest");
              break;
            case "logForm":
              this.$store.commit("updateUserInfo", {
                name: this.logForm.name,
                pwd: this.logForm.pwd,
                rmb: this.isRemember
              });
              this.$store.commit("logInRequest");
              break;
            case "findForm":
              this.$store.commit("updateUserInfo", {
                email: this.findForm.email,
                code: this.findForm.code,
                pwd: this.findForm.pwd
              });
              this.$store.commit("forgetRequest");
              break;
            default:
              break;
          }
        } else {
          this.$message.error("请根据提示修改信息");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.join {
  .banner {
    width: 100%;
    height: calc(100vh - 60px);
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
      url("../assets/game.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    .card-join {
      width: 100%;
      ::v-deep .el-card__body {
        padding: 1.5rem 0.5rem;
      }
      transform: translateY(-5%);
    }
    @media (min-width: 576px) {
      .card-join {
        width: 460px;
        ::v-deep .el-card__body {
          padding: 1rem 1.5rem;
        }
      }
    }
    @media (min-width: 768px) {
      .card-join {
        ::v-deep .el-card__body {
          padding: 2rem 2.5rem;
        }
      }
    }
    .el-form .el-form-item:nth-child(n + 2) {
      margin-top: 1.5rem;
      margin-bottom: 0;
    }
    .form-feat {
      font-size: 0.8rem;
      .el-link {
        font-size: 0.8rem;
        transform: translateY(-1px);
        margin: 0 0.125rem;
      }
    }
  }
}
</style>
