<template>
  <div>
    <div class="text-center w-75 mx-auto">
    <h1 class="mt-5">結帳頁面</h1>
    <div class="col-12 mapset">
  <a href="/">首頁</a>
    <i class="fa fa-chevron-right m-1"></i>
    <a href="/order">訂單頁面</a>
  <i class="fa fa-chevron-right m-1"></i>
  <a href="/checkout">結帳頁面</a>
</div>
    <div class="my-5 row justify-content-center w-100">
      <form class="col-md-12" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.product.unit }}
              </td>
              <td class="align-middle text-right">{{ Math.ceil(item.final_total) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">訂單金額</td>
              <td class="text-right">{{ Math.ceil(order.total) }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table col-md-6" align="right">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th width="100">姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th width="120">收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th width="120">收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
            <tr>
              <th>
              </th>
              <td>
                <button class="btn btn-danger" v-if="order.is_paid === false">確認付款去</button>
                 <router-link class="btn btn-danger" v-if="order.is_paid" to="/index">繼續購物去</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../views/Footer.vue';

export default {
  data() {
    return {
      order: {
        user: "",
      },
      orderId: "",
    };
  },
  components: {
    Footer,
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        console.log("order", response.data.order);
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.isLoading = true;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrder();
  },
};
</script>