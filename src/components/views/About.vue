<template>
  <div>
    <header class="header">
      <h1 class="text-center">關於我們</h1>
    </header>
    <img src="~@/assets/images/homeimg.png" class="w-100 mt-4 mb-4" alt="" />
    <div class="bg-white">
      <div class="text-center h1-middle">
        <h1 class="text-danger">零食小舖</h1>
      </div>
      <hr class="w-75" />
      <div class="col-sm-12 mapset ml-5">
        <a href="/">首頁</a>
        <i class="fa fa-chevron-right m-1"></i>
        <a href="/#/about">關於我們</a>
      </div>
      <div class="m-5">
        <div style="color: gray">樣式最齊全</div>
        <div style="color: orange">
          <font size="5">|</font>
          <font size="6">妳的零食倉庫</font>
        </div>
        <div class="row">
          <font size="4">
            <p>隨時有需要,就來你的零食倉庫補貨,絕對不讓你餓到。</p>
            <p>不管颱風還是自主管理,我們都是你肚子的靠山</p>
            <p>我們的貨源充足，種類最多</p>
            <p>不管甜的,鹹的,甜的加鹹的我們全都要</p>
            <p>不管酸的,辣的,還是又酸又辣的我們全都給你</p>
            <p>只要你想得到的,我們都有</p>
            <p>你想不到的,我們也會推薦給你</p>
          </font>
          <img
            src="~@/assets/images/store.png"
            class="mx-auto"
            width="500"
            height="300"
            alt=""
          />
        </div>
      </div>

      <div class="m-5">
        <div class="row">
          <img
            src="~@/assets/images/test.png"
            class="mx-auto"
            width="500"
            height="500"
            alt=""
          />
          <div>
            <div style="color: gray">零食糾察隊</div>
            <div style="color: orange">
              <font size="5">|</font>
              <font size="6">把關零食大小事</font>
            </div>
            <font size="4">
              <p>只要有我們,就不用擔心被詐騙。</p>
              <p>申訴,溝通管道透明</p>
              <p>買東西不用貨比三家,我們一定最便宜</p>
              <p>品質管理標準做到最高</p>
              <p>建立更好的購物體驗</p>
              <p>最好的員工訓練</p>
              <p>還有各種打到骨折的折扣活動</p>
            </font>
          </div>
        </div>
      </div>

      <div class="m-5">
        <div style="color: gray">成為你最好的夥伴</div>
        <div style="color: orange">
          <font size="5">|</font>
          <font size="6">無論何時都可以提供最好的商品</font>
        </div>
        <div class="row">
          <font size="4">
            <p>生活中免不了各種狀況發生。</p>
            <p>不管是節慶或是突發狀況</p>
            <p>我們隨時提供最好的食品</p>
            <p>讓你應付每一個不同的場合</p>
            <p>可能是逢年過節</p>
            <p>可能是聚餐酒敘</p>
            <p>我們都能提供最適合的零食幫你面對所有狀況</p>
          </font>
          <img
            src="~@/assets/images/good.png"
            class="mx-auto"
            width="500"
            height="400"
            alt=""
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from "../views/Footer.vue";

export default {
  components: {
    Footer,
  },
};
</script>