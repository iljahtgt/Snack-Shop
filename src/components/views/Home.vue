<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- searchbar -->
    <div class="bg-light">
      <form class="form-inline text-center" style="margin-left: 30%">
        <a class="navbar-brand mt-4 text-dark" href="#">零食小舖</a>
        <input
          class="form-control w-50 mt-4"
          type="search"
          placeholder="尋找零食"
          aria-label="Search"
          v-model="searchText"
          @keyup.enter="scrollwindow();"
        /> <!-- @keyup.enter跳到產品頁高度 -->
        <button class="btn btn-outline-success mt-4" type="submit">
          Search
        </button>
      </form>
      <div class="keywords-wrap">
        <span style="vertical-align: super">熱門關鍵字 :</span>
        <span class="keywords"
          ><a href="#" @click.prevent="searchText = '冰淇淋';scrollwindow();">冰淇淋</a></span
        >
        <span class="keywords"
          ><a href="#" @click.prevent="searchText = '洋芋片';scrollwindow();">洋芋片</a>
        </span>
        <span class="keywords"
          ><a href="#" @click.prevent="searchText = '餅乾';scrollwindow();">餅乾</a>
        </span>
        <span class="keywords"
          ><a href="#" @click.prevent="searchText = '糖';scrollwindow();">糖</a>
        </span>
      </div>
      <img src="~@/assets/images/homeimg.png" class="w-100 mt-4 mb-4" alt="" />
    </div>

    <!-- body -->
    <div class="item-list row align-items-stretch mb-5">
      <!-- sidebar -->
      <div class="col-md-2 bg-white mx-auto sidebarset">
          <!-- 使用@searchCategory接收子元件傳出的category放入searchText中 -->
          <!-- 使用@searchAll尋找全部商品 -->
        <Sidebar @searchCategory="searchText =$event" @searchAll="searchText =$event"/>
      </div>
      <!-- shopcart -->
      <div class="dropdown cartset">
        <button
          class="btn btn-sm btn-cart"
          data-toggle="dropdown"
          data-flip="false"
        >
          <i
            class="fa fa-shopping-cart text-dark fa-2x icartset"
            aria-hidden="true"
          ></i>
          <span class="badge badge-pill badge-danger numset">{{
            cart.carts.length
          }}</span>
          <a class="sr-only" href="/index">購物去</a>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right p-3"
          style="min-width: 300px"
          data-offset="400"
        >
          <h6 v-if="cart.carts.length">已選擇商品</h6>
          <h6 v-else>購物車空空的</h6>
          <table class="table table-sm">
            <tbody>
              <tr
                v-for="item in cart.carts"
                :key="item.id"
                v-if="cart.carts.length"
              >
                <td class="align-middle text-center"></td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">
                  {{ item.qty }}{{ item.product.unit }}
                </td>
                <td class="align-middle text-right">
                  {{ item.total | currency }}
                </td>
                <a
                  href="#"
                  class="text-muted"
                  @click.prevent="removeCart(item.id)"
                >
                  <i class="fa fa-trash-o mt-2" aria-hidden="true"></i>
                </a>
              </tr>
            </tbody>
          </table>
          <router-link
            class="btn btn-primary btn-block"
            to="/order"
            v-if="cart.carts.length"
          >
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </router-link>
          <router-link
            class="btn btn-primary btn-block"
            to="/customer/shop"
            v-else
          >
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 購物去
          </router-link>
        </div>
      </div>
      <div class="gotop" @click.prevent="gotop()">
          <i class="fa fa-arrow-up fa-2x text-dark"></i>
      </div>
      <!-- product -->
      <div class="col-md-10 row h-100" style="z-index: 1">
        <div
          class="col-md-4 item-chain"
          v-for="item in filterData"
          :key="item.id"
        >
          <figure class="item mx-auto bg-light shadow mt-2 figureset">
            <div class="item-figure">
              <img class="item-img" :src="item.imageUrl" alt="" />
            </div>
            <figcaption>
              <div class="item-header-b text-center">
                <h3>{{ item.title }}</h3>
              </div>
              <div class="item-detail flex justify-content-around">
                <del>原價:{{ item.origin_price | currency }}</del>

                <span class="item-display">
                  特價:
                  <span class="priceset">{{ item.price | currency }}</span>
                </span>
              </div>
              <div class="item-footer mx-auto text-center">
                {{ item.content }}
              </div>
              <span class="flex row justify-content-around w-100 mx-auto mt-2">
                <button class="btn btn-outline-primary w-25"
                @click.prevent="getSingle(item.id)">
                  <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.loadingItem === item.id"
                    ></i>
                查看
                </button>
                <button
                  class="btn btn-outline-danger"
                  @click="addtoCart(item.id)"
                >
                  <i class="fa fa-cart-plus" aria-hidden="true"></i> 加到購物車
                </button>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
      <div class="m-5 text-center mx-auto">
        <!-- 綁定pagination名稱給子模板，傳送pagination資訊過去 -->
        <Pagination :pagination="pagination" @pageTrigger="getPages" />
      </div>
    </div>
     <!-- ProductModal -->
<div
          class="modal fade"
          id="seeProductModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
           v-for="(item) in filterData" :key="item.id"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-dark text-white text-center mx-auto w-100">
                <h5 class="modal-title" id="exampleModalLabel">
                  {{ item.title }}
                </h5>
                <button
                  type="button"
                  class="close ml-5"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-4">
                    <img class="img-fluid" alt="" :src="item.imageUrl" />
                  </div>
                  <div class="w-50 m-auto">
                    <p class="mb-0"> <h5>商品描述：</h5>{{ item.content }}</p>
                    <hr>
                    <p>
                   <h5>商品詳細內容：</h5> {{ item.description }}
                    </p>
                  <hr>
                  <div
                    class="d-flex justify-content-between align-items-baseline"
                  >
                    <div class="h5" v-if="!item.price">
                    定價：  {{ item.origin_price }}
                    </div>
                    <del class="h6" v-if="item.price">
                      定價：  {{
                      item.origin_price
                    }}</del>
                    <div class="h5 text-danger" v-if="item.price">
                    特價：  {{ item.price }}
                    </div>
                  </div>
                  </div>
                  <select
                    name=""
                    class="form-control mt-3 w-25"
                    style="margin-left:72%;"
                    v-model="item.num"
                  >
                    <option :value="num" v-for="num in 10" :key="num">
                      選購 {{ num }} {{ item.unit }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <div class="text-muted text-nowrap mr-3">
                  小計 <strong>{{ item.num * item.price }}</strong>
                </div>
                <button
                  class="btn btn-primary"
                  @click="addtoCart(item.id, item.num)"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
<!-- /ProductModal -->
    <Footer />
  </div>
</template>

<script>
// import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";
import Footer from "./Footer.vue";
import Pagination from "../Pagination.vue";
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      product: [],
      searchText: "",
      categories: [],
      pagination: {},
      searchText: "",
      isLoading: false,
      status: {
        loadingItem: "",
      },
      cart: {
        carts: [],
      },
      cartlength: "",
    };
  },
  components: {
    Footer,
    Sidebar,
    Pagination,
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        console.log(response.data);
        const temp = response.data.products;
        vm.products = temp.filter((item) => {
          return item.is_enabled === 1;
        });
        vm.isLoading = false;
        vm.getUnique();
      });
    },
    getSingle(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      console.log("id:", id);
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        console.log("detail:", vm.product);
        $("#seeProductModal").modal("show");
        vm.isLoading = false;
        vm.getUnique();
      });
    },
    getPages(page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        console.log("getPage:", response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    getUnique() {
      const vm = this;
      const categories = new Set();
      vm.products.forEach((item) => {
        categories.add(item.category);
      });
      vm.categories = Array.from(categories);
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log("cart:", response.data.data.carts.length);
        vm.isLoading = false;
        vm.cart = response.data.data;
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      const item = {
        product_id: id,
        qty,
      };
      vm.isLoading = true;
      this.$http.post(url, { data: item }).then((response) => {
        vm.isLoading = false;
        vm.getCart();
        console.log("加入購物車:", response);
        $("#seeProductModal").modal("hide");
      });
    },
    removeCart(id) {
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
    scrollwindow() {
      window.scrollTo({
        left: 100,
        top: 600,
        behavior: "smooth",
      });
    },
    gotop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          if (item.title.toLowerCase().includes(vm.searchText.toLowerCase())) {
            const data = item.title
              .toLowerCase()
              .includes(vm.searchText.toLowerCase());
            return data;
          } else if (
            item.category.toLowerCase().includes(vm.searchText.toLowerCase())
          ) {
            const data = item.category
              .toLowerCase()
              .includes(vm.searchText.toLowerCase());
            return data;
          }
        });
      }
      return vm.products;
    },
  },
  created() {
    this.getProducts();
    this.getCart();
    this.getPages();
  },
};
</script>