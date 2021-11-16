<template>
  <div class="home">
    <el-backtop></el-backtop>
    <div class="banner">
      <div class="container flex-center px-0 px-md-3">
        <div class="px-3 p-md-0 text-center w-100">
          <h3 class="white-text mb-4">查木头人，就来一二三四</h3>
          <div class="flex-center mb-2">
            <el-autocomplete
              v-model="searchInput"
              placeholder="请输入内容"
              :fetch-suggestions="handleComplete"
              @select="handleSelect"
              @keypress.enter.native="handleQuery()"
              class="inline-input w-75"
              clearable
            >
              <template slot-scope="{ item }">
                <div class="teal-text">{{ item.query }}</div>
              </template>
              <el-button slot="append" @click="handleQuery()">
                <font-awesome-icon :icon="['fas', 'search']" size="sm" />
                <span class="ml-1">查询</span>
              </el-button>
            </el-autocomplete>
            <el-button
              @click="$router.push({ path: '/adv' })"
              class="ml-2"
              size="medium"
              plain
              >高级<span class="d-none d-md-inline-block">查询</span></el-button
            >
          </div>
          <p class="m-0 hot-search">
            <span class="strong small white-text mr-2">热门搜索</span>
            <el-tag
              v-for="(hot, index) in hotSearch.slice(0, 5)"
              :key="index"
              size="mini"
              type="info"
              effect="dark"
              class="mr-1"
            >
              <el-link :underline="false" @click="handleHot(hot)">
                {{ hot }}
              </el-link>
            </el-tag>
          </p>
        </div>
      </div>
    </div>
    <div class="putup mt-5 mb-5">
      <div class="container px-0 px-md-3">
        <div class="px-3 p-md-0">
          <el-row :gutter="25" class="row-putup">
            <el-col :span="24" class="col-putup">
              <el-card
                shadow="never"
                :body-style="{ backgroundColor: '#fbfbfb' }"
              >
                <h5 class="strong teal-text mb-3">综合评分 Top 10</h5>
                <div class="container-figure" v-if="fTopScroll">
                  <div
                    v-for="(t, tIndex) in hotTop10.slice(0, 10)"
                    :key="tIndex"
                    class="div-figure d-inline-block"
                  >
                    <el-card
                      shadow="never"
                      :body-style="{ padding: '1rem', textAlign: 'center' }"
                    >
                      <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        :size="60"
                      >
                        <img src="@/assets/error.png" />
                      </el-avatar>
                      <div>
                        <el-link
                          @click="$router.push({ path: '/' })"
                          class="mt-2"
                        >
                          <span class="h6 text-body m-0">{{ t }}</span>
                        </el-link>
                      </div>
                    </el-card>
                  </div>
                </div>
                <el-row v-else :gutter="8" class="row-figure">
                  <el-col
                    :xs="12"
                    :sm="4"
                    :md="3"
                    v-for="(t, tIndex) in hotTop10.slice(0, 10)"
                    :key="tIndex"
                    class="col-figure"
                  >
                    <el-card
                      shadow="never"
                      :body-style="{ padding: '1rem', textAlign: 'center' }"
                    >
                      <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        :size="60"
                      >
                        <img src="@/assets/error.png" />
                      </el-avatar>
                      <div>
                        <el-link
                          @click="$router.push({ path: '/' })"
                          class="mt-2"
                        >
                          <span class="h6 text-body m-0">{{ t }}</span>
                        </el-link>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="12" class="col-putup">
              <el-card
                shadow="never"
                :body-style="{ backgroundColor: '#fbfbfb' }"
              >
                <h5 class="strong teal-text mb-3">地产行业优秀木头人</h5>
                <el-row :gutter="15" class="row-figure">
                  <el-col
                    :xs="24"
                    :sm="12"
                    :md="8"
                    v-for="(e, eIndex) in hotEstate"
                    :key="eIndex"
                    class="col-figure"
                  >
                    <el-card
                      shadow="never"
                      :body-style="{ padding: '1rem', textAlign: 'center' }"
                    >
                      <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        :size="80"
                      >
                        <img src="@/assets/error.png" />
                      </el-avatar>
                      <div>
                        <el-link
                          @click="$router.push({ path: '/' })"
                          class="mt-2"
                        >
                          <span class="h6 text-body m-0">{{ e }}</span>
                        </el-link>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="12" class="col-putup">
              <el-card
                shadow="never"
                :body-style="{ backgroundColor: '#fbfbfb' }"
              >
                <h5 class="strong teal-text mb-3">金融行业优秀木头人</h5>
                <el-row :gutter="15" class="row-figure">
                  <el-col
                    :xs="24"
                    :sm="12"
                    :md="8"
                    v-for="(m, mIndex) in hotMoney"
                    :key="mIndex"
                    class="col-figure"
                  >
                    <el-card
                      shadow="never"
                      :body-style="{ padding: '1rem', textAlign: 'center' }"
                    >
                      <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        :size="80"
                      >
                        <img src="@/assets/error.png" />
                      </el-avatar>
                      <div>
                        <el-link
                          @click="$router.push({ path: '/' })"
                          class="mt-2"
                        >
                          <span class="h6 text-body m-0">{{ m }}</span>
                        </el-link>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="12" class="col-putup">
              <el-card
                shadow="never"
                :body-style="{ backgroundColor: '#fbfbfb' }"
              >
                <h5 class="strong teal-text mb-3">券商行业优秀木头人</h5>
                <el-row :gutter="15" class="row-figure">
                  <el-col
                    :xs="24"
                    :sm="12"
                    :md="8"
                    v-for="(m, mIndex) in hotBroker"
                    :key="mIndex"
                    class="col-figure"
                  >
                    <el-card
                      shadow="never"
                      :body-style="{ padding: '1rem', textAlign: 'center' }"
                    >
                      <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        :size="80"
                      >
                        <img src="@/assets/error.png" />
                      </el-avatar>
                      <div>
                        <el-link
                          @click="$router.push({ path: '/' })"
                          class="mt-2"
                        >
                          <span class="h6 text-body m-0">{{ m }}</span>
                        </el-link>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="12" class="col-putup">
              <el-card
                shadow="never"
                :body-style="{ backgroundColor: '#fbfbfb' }"
              >
                <h5 class="strong teal-text mb-3">软件行业优秀木头人</h5>
                <el-row :gutter="15" class="row-figure">
                  <el-col
                    :xs="24"
                    :sm="12"
                    :md="8"
                    v-for="(m, mIndex) in hotSoft"
                    :key="mIndex"
                    class="col-figure"
                  >
                    <el-card
                      shadow="never"
                      :body-style="{ padding: '1rem', textAlign: 'center' }"
                    >
                      <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        :size="80"
                      >
                        <img src="@/assets/error.png" />
                      </el-avatar>
                      <div>
                        <el-link
                          @click="$router.push({ path: '/' })"
                          class="mt-2"
                        >
                          <span class="h6 text-body m-0">{{ m }}</span>
                        </el-link>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      hotSearch: [],
      fTopScroll: !window.matchMedia("(max-width: 992px)").matches,
      hotTop10: [
        "王某某",
        "李某某",
        "金某某",
        "开某某",
        "凯某某",
        "铠某某",
        "单某某",
        "散某某",
        "散某某",
        "散某某",
        "琴某某"
      ],
      hotEstate: ["王某某", "李某某", "金某某"],
      hotMoney: ["开某某", "凯某某", "铠某某"],
      hotBroker: ["单某某", "散某某", "琴某某"],
      hotSoft: ["谭某某", "炎某某", "恒某某"]
    };
  },
  computed: {
    searchInput: {
      get() {
        return this.$store.state.searchInput;
      },
      set(value) {
        this.$store.commit("updateInput", value);
      }
    },
    historyData: function() {
      const historyKeys = this.$cookies
        .keys()
        .filter(e => e.substr(0, 13) == "hammer_search*");
      var historyData = [];
      historyKeys.forEach(function(key) {
        historyData.push(this.$cookies.get(key));
      }, this);
      return historyData.reverse();
    }
  },
  mounted: function() {
    window.onresize = () => {
      this.fTopScroll = !window.matchMedia("(max-width: 992px)").matches;
    };
    this.hotSearch = ["热搜1", "热搜2", "热搜3", "热搜4", "热搜5", "热搜6"];
    // this.fetchHot();
  },
  methods: {
    handleComplete(queryString, cb) {
      var histories = this.historyData.slice(0, 50);
      var results = queryString
        ? histories.filter(this.historyFilter(queryString))
        : histories;
      cb(results);
    },
    historyFilter(queryString) {
      return history => {
        return (
          history.query.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.searchInput = item.query;
      this.handleQuery();
    },
    fetchHot() {
      this.axios
        .get("/hot-search")
        .then(response => {
          console.log(response.data);
          this.hotSearch = response.data;
        })
        .catch(error => {
          console.error(error);
          this.$message.error("未知错误，请重试");
        })
        .finally(() => {
          console.log("Hot search word searched");
        });
    },
    handleHot(query) {
      this.searchInput = query;
      this.handleQuery();
    },
    handleQuery() {
      this.$store.commit("handleQuery");
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  .banner {
    width: 100%;
    height: 30vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
      url("../assets/stock.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    ::v-deep .el-input-group__append {
      background-color: #009688;
      border-color: #009688;
      color: white;
    }
    .hot-search .el-link {
      color: white;
      transform: translateY(-2px);
    }
  }
  .putup {
    .col-putup {
      margin-bottom: 1.5rem;
      .container-figure {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        overflow: auto;
        .div-figure {
          min-width: 125px;
          &:not(:last-child) {
            margin-right: 0.75rem;
            margin-bottom: 0.75rem;
          }
        }
      }
      .col-figure:not(:nth-last-child(-n + 1)) {
        margin-bottom: 0.75rem;
        @media (min-width: 992px) {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
