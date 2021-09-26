<template>
  <div class="col-md-10 mx-auto">
      <loading :active.sync="isLoading"></loading>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          :class="{ 'active': link == 'is_paid' }"
          @click.prevent="link = 'is_paid'"
          >已付款</a
        >
      </li>
      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          :class="{ 'active': link == 'not_paid' }"
          @click.prevent="link = 'not_paid'"
          >未付款</a
        >
      </li>
    </ul>
    <!-- 分頁範例 -->
    <!-- <div class="content mt-3">
      <div v-if="link == 'is_paid'">true</div>
      <div v-else-if="link == 'not_paid'">false</div>
    </div> -->
    <div class="text-center mx-auto">
      <table class="table">
        <thead>
          <tr>
            <th>訂單建立日期</th>
            <th>訂單編號</th>
            <th>付款狀態</th>
            <th v-if="link == 'is_paid'">付款日期</th>
            <th>購買者</th>
            <th>總價</th>
            <th>明細</th>
          </tr>
        </thead>
        <tbody v-if="link == 'is_paid'">
          <tr v-for="item in orders" :key="item.id" v-if="item.is_paid == true">
            <td>{{ item.create_at | timestamp }}</td>
            <td>{{ item.id }}</td>
            <td v-if="item.is_paid" class="text-success">已付款</td>
            <td v-else class="text-danger">未付款</td>
            <td v-if="item.is_paid">{{ item.paid_date | timestamp }}</td>
            <td v-else>NaN</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.total }}</td>
            <td><a href="#" @click.prevent="OpenEditModal(item)">查看</a></td>
          </tr>
        </tbody>
        <tbody v-else-if="link == 'not_paid'">
          <tr
            v-for="item in orders"
            :key="item.id"
            v-if="item.is_paid == false"
          >
            <td>{{ item.create_at | timestamp }}</td>
            <td>{{ item.id }}</td>
            <td v-if="item.is_paid" class="text-success">已付款</td>
            <td v-else class="text-danger">未付款</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.total }}</td>
            <td><a href="#" @click.prevent="OpenEditModal(item)">查看</a></td>
          </tr>
        </tbody>
      </table>
      <!-- edit Modal -->
      <div
        class="modal fade"
        id="orderModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>訂單資訊</span>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group border-bottom">
                    <h3 class="mb-3">消費者資訊</h3>
                    <div class="text-left w-50 ml-5 mb-2">
                      姓名：<span>{{ tempOrder.user.name }}</span>
                    </div>
                    <div class="text-left w-75 ml-5 mb-2">
                      Email：<span>{{ tempOrder.user.email }}</span>
                    </div>
                    <div class="mb-3 text-left w-75 ml-5">
                      地址：<span>{{ tempOrder.user.address }}</span>
                    </div>
                  </div>
                  <div class="form-group h-25">
                    <h3 class="w-100">留言內容</h3>
                    <textarea class="w-100 h-100">{{
                      tempOrder.content
                    }}</textarea>
                  </div>
                </div>
                <div class="col-sm-6">
                  <h3 class="mb-3">訂單資訊</h3>
                  <div class="text-left w-75 ml-5">
                    <div class="form-group">
                      <label for="orderId">訂單ID :</label>
                      <span v-model="tempOrder.id">{{ tempOrder.id }}</span>
                    </div>
                    <div class="form-group">
                      <label for="create_at">訂單建立日期 :</label>
                      <span>{{ tempOrder.create_at | timestamp }}</span>
                    </div>
                    <div class="form-group">
                      <label>總價 :</label>
                      <span>{{ tempOrder.total }} 元</span>
                    </div>
                    <div class="form-group">
                      <label for="is_paid">付款狀態 :</label>
                      <span v-if="tempOrder.is_paid">已付款</span>
                      <span v-else>未付款</span>
                    </div>
                    <div class="form-group" v-if="tempOrder.is_paid">
                      <label for="paid_date">付款日期 :</label>
                      <span>{{ tempOrder.paid_date | timestamp }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary mx-auto"
                data-dismiss="modal"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- edit Modal -->
      <!-- <Pagination
        class="mx-auto"
        :pagination="pagination"
        @pageTrigger="getPages"
      /> -->
    </div>
  </div>
</template>
<script>
import Pagination from "../../Pagination.vue";
import $ from "jquery";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {
        user: [],
      },
      link: "is_paid",
      isLoading: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      this.$http.get(url).then((response) => {
        console.log("orderlist", response.data);
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
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
    OpenEditModal(item) {
      this.tempOrder = Object.assign({}, item);
      console.log("openedit", this.tempOrder);
      $("#orderModal").modal("show");
    },
  },
  created() {
    this.getOrders();
    this.getPages();
  },
};
</script>