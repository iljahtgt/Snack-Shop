<template>
    <div>
        <loading :active.sync="isLoading"></loading>
    <!-- searchbar -->
    <div class="bg-light">
      <form class="form-inline text-center" style="margin-left: 30%">
        <router-link class="navbar-brand mt-4 text-dark" to="/index">零食小舖</router-link>
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
          ><a href="#" @click.prevent="searchText = '冰';scrollwindow();">冰淇淋</a></span
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
    </div>

    <!-- body -->
    <div class="item-list row align-items-stretch mb-5">
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
      <!-- 最上層 -->
      <div class="gotop mx-auto" @click.prevent="gotop()">
          <i class="fa fa-arrow-up fa-2x text-dark ml-2"></i>
         <div style="font-family:'標楷體'">最上層</div> 
      </div>
    </div>
    <Footer />
    <!-- <div class="text-center mx-auto p-3 bg-light w-75">
  <h1>t1</h1>
  <h2>t2</h2>
  <div class="row justify-content-around w-75 mx-auto">
    <figure class="col-md-4">
        <div class="position-relative">
      <div class="position-relative x"></div>
      <div class="position-relative y"></div>
      </div>
      <figcaption>title</figcaption>
    </figure>
     <figure class="col-md-4">
        <div class="position-relative">
      <div class="position-relative x"></div>
      <div class="position-relative y"></div>
      </div>
      <figcaption>title</figcaption>
    </figure>
     <figure class="col-md-4">
        <div class="position-relative">
      <div class="position-relative x"></div>
      <div class="position-relative y"></div>
      </div>
      <figcaption>title</figcaption>
    </figure>
  </div>
</div> -->
    </div>
</template>
<style scoped>
  h1,h2,figcaption{
    margin: 1 auto;
  }
  div.x{
      width: 100px;
      height: 100px;
      background-color: red;
      border-radius: 50%;
      z-index:2;
      margin:0 auto;
      margin-bottom: -50px;
  }
  div.y{
      width: 200px;
      height: 250px;
      background-color: gray;
      border: 3px solid black;  
      z-index: 1;
      margin:0 auto;
  }
</style>
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
      singleproduct:[],
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
        // console.log(response.data);
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
        // console.log("getPage:", response.data);
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
    //   console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log("cart:", response.data.data.carts.length);
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
    //   console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
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
    getsingleproduct(){
        const vm = this;
        // const url = window.URL
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.id}`;
      console.log('vm:',vm);
      console.log('url:',location.search);
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.singleproduct = response.data.product;
        console.log("product:", response.data);
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
    this.getPages();
    this.getsingleproduct();
  },
};
</script>