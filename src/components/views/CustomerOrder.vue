<template>
  <div class="text-center mx-auto w-100">
    <Navbar />
    <!-- 購物車列表 -->
    <div class="row mx-auto p-4 bg-light">
      <h1 class="col-12 mb-5">訂單資訊</h1>
      <div class="col-12 mapset">
        <a href="/">首頁</a>
        <i class="fa fa-chevron-right m-1"></i>
        <a href="/order">訂單頁面</a>
      </div>
      <div class="text-center mx-auto col-md-7">
        <h1 class="mb-5">訂購人資料</h1>
        <ValidationObserver v-slot="{ invalid }" tag="form">
          <form @submit.prevent="createOrder" class="w-75 mx-auto">
            <div class="form-group">
              <validation-provider
                name="email"
                rules="required|email"
                v-slot="{ classes, errors }"
              >
                <label for="useremail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  :class="classes"
                  name="email"
                  id="useremail"
                  v-model="form.user.email"
                  placeholder="請輸入 Email"
                />
                <!-- :class="{'is-invalid': failed }" 驗證失敗時套用 -->
                <!-- :class也可直接放入main.js裡整個classes物件 -->
                <span class="invalid-feedback">{{ errors[0] }}</span>
                <!-- span class中可以帶入vee--validate的css -->
              </validation-provider>
            </div>

            <div class="form-group">
              <validation-provider
                name="name"
                rules="required"
                v-slot="{ failed, errors }"
              >
                <label for="username">收件人姓名</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': failed }"
                  name="name"
                  id="username"
                  v-model="form.user.name"
                  placeholder="輸入姓名"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>

            <div class="form-group">
              <validation-provider
                name="Telephone"
                rules="required|mobile"
                v-slot="{ failed, errors }"
              >
                <label for="usertel">收件人電話</label>
                <input
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': failed }"
                  id="usertel"
                  v-model="form.user.tel"
                  placeholder="請輸入電話"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>

            <div class="form-group">
              <validation-provider
                name="Address"
                rules="required"
                v-slot="{ failed, errors }"
              >
                <label for="useraddress">收件人地址</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': failed }"
                  name="address"
                  id="useraddress"
                  v-model="form.user.address"
                  placeholder="請輸入地址"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>

            <div class="form-group">
              <label for="comment">留言</label>
              <textarea
                name=""
                id="comment"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-right">
              <router-link to="/customer/shop" class="btn btn-success"
                >回上一頁</router-link
              >
              <button class="btn btn-danger" :disabled="invalid">
                送出訂單
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>

      <div v-if="cart" class="col-md-5 border shadow p-3 h-50">
        <h1 class="mb-5">購物車清單</h1>
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>商品名稱</th>
              <th>數量</th>
              <th>單價</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <img
                  :src="item.product.imageUrl"
                  width="50"
                  height="50"
                  alt=""
                />
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">優惠券以套用</div>
              </td>
              <td>{{ item.qty }} / {{ item.product.unit }}</td>
              <td>{{ item.product.price | currency }}</td>
              <td>
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="removeCartItem(item.id)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot class="text-right mx-auto">
            <tr>
              <td></td>
              <td colspan="3" class="text-right">總計：</td>
              <td class="text-right">{{ Math.ceil(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td></td>
              <td colspan="3" class="text-right text-success">折扣價：</td>
              <td class="text-right text-success">
                {{ Math.ceil(cart.final_total) }}
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-5 input-group-sm w-75 div-right">
          <input
            type="text"
            class="form-control"
            v-model="coupon_code"
            placeholder="輸入折扣碼"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
      <!-- form -->
      <hr />
    </div>
    <Footer />
  </div>
</template>
<script>
import $ from "jquery";
import Navbar from "../Navbar.vue";
import Footer from "../views/Footer.vue";

export default {
  data() {
    return {
      products: [],
      product: {},
      cart: [],
      status: {
        loadingItem: "",
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      isLoading: false,
      coupon_code: "",
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
      const vm = this;
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    },
    getProduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      const vm = this;

      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $("#seemoreModal").modal("show");
        console.log(response.data);
        vm.status.loadingItem = "";
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data.data.carts);
        vm.isLoading = false;
        vm.cart = response.data.data;
      });
    },
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const vm = this;
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.isLoading = true;
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.getCart();
      });
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code,
      };
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.isLoading = true;
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.getCart();
      });
    },
    createOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.isLoading = true;
      this.$http.post(api, { data: order }).then((response) => {
        console.log("訂單建立", response.data);
        if (response.data.success) {
          console.log("success");
          vm.$router.push({ path: `/checkout/${response.data.orderId}` });
        } else {
          console.log("failed");
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>