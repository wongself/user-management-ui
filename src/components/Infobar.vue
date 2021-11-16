<template>
  <div class="infobar container px-0 px-md-3 pt-5 pb-3">
    <div class="px-3 p-md-0">
      <el-row :gutter="20" class="row-info">
        <el-col :span="24" class="col-title mb-3">
          <span class="h5 m-0">一二三四</span>
        </el-col>
        <el-col :xs="6" :sm="4" :md="4" class="col-about">
          <ul class="list-unstyled">
            <li>
              <el-link
                @click="
                  $router.push({ path: '/help', query: { item: '关于我们' } })
                "
              >
                <span class="h6 m-0">关于我们</span>
              </el-link>
            </li>
            <li>
              <el-link
                @click="
                  $router.push({ path: '/help', query: { item: '用户协议' } })
                "
              >
                <span class="h6 m-0">用户协议</span>
              </el-link>
            </li>
            <li>
              <el-link
                @click="
                  $router.push({ path: '/help', query: { item: '免责声明' } })
                "
              >
                <span class="h6 m-0">免责声明</span>
              </el-link>
            </li>
            <li>
              <el-link
                @click="
                  $router.push({ path: '/help', query: { item: '意见反馈' } })
                "
              >
                <span class="h6 m-0">意见反馈</span>
              </el-link>
            </li>
          </ul>
        </el-col>
        <el-col :xs="18" :sm="12" :md="14" class="col-addr">
          <ul class="list-unstyled">
            <li>公司地址：北京市海淀区中关村大街2333号</li>
            <li>联系电话：328x8678x97x</li>
            <li>商务合作：328x8678x97x</li>
            <li>人才招聘：mutouren@172873.com</li>
          </ul>
        </el-col>
        <el-col
          :xs="24"
          :sm="8"
          :md="6"
          class="col-qr d-flex justify-content-center mt-3 mt-md-0"
        >
          <div class="qr-code d-inline-block mr-5 mr-md-3">
            <img
              alt="在线客服"
              src="@/assets/customer.png"
              width="105"
              height="105"
            />
            <span class="h6 small m-0">在线客服</span>
          </div>
          <div class="qr-code d-inline-block">
            <img
              alt="官方公众号"
              src="@/assets/account.png"
              width="105"
              height="105"
            />
            <span class="h6 small m-0">官方公众号</span>
          </div>
        </el-col>
      </el-row>
      <el-divider class="my-3"></el-divider>
      <el-row class="row-copy">
        <el-col :span="24" class="col-copy text-center">
          <p class="small grey-text mb-1">京ICP备 x 号-1</p>
          <p class="small grey-text m-0">京公网安备 x号</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Infobar"
};
</script>

<style scoped lang="scss">
.infobar {
  .row-info {
    ul li {
      margin-bottom: 0.375rem;
    }
    .el-link {
      color: #009688;
    }
    .qr-code {
      text-align: center;
      & > * {
        display: block;
      }
    }
  }
}
</style>
