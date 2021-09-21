<template>
  <div class="col-md-10 mx-auto">
    <div class="text-center mx-auto">
      <table class="table">
        <thead>
          <tr>
            <th>訂單建立日期</th>
            <th>訂單編號</th>
            <th>付款狀態</th>
            <th>付款日期</th>
            <th>購買者</th>
            <th>總價</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ item.create_at | timestamp }}</td>
            <td>{{ item.id }}</td>
            <td v-if="item.is_paid" class="text-success">已付款</td>
            <td v-else class="text-danger">未付款</td>
            <td v-if="item.is_paid">{{ item.paid_date | timestamp }}</td>
            <td v-else>NaN</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.total }}</td>
            <td><a href="#" @click.prevent="OpenEditModal(item)">編輯</a></td>
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
                <span>修改訂單</span>
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
                  <div class="form-group">
                    <label for="total">總價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="total"
                      v-model="tempOrder.total"
                      placeholder="請輸入標題"
                    />
                  </div>
                  <div class="form-group">
                    <label for="content">留言內容</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="content"
                      v-model="tempOrder.message"
                      placeholder="請輸入留言內容"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="create_at">建立日期</label>
                    <div>{{ tempOrder.create_at | timestamp }}</div>
                  </div>
                </div>
                <div class="col-sm-6">
                     <div class="form-group">
                    <label for="is_paid" class="d-block">付款狀態</label>
                    <input
                      type="radio"
                      class="form-control d-inline-block w-25"
                      id="is_paid"
                      name="paiditem"
                      :value="true"
                      v-model="tempOrder.is_paid"
                    />
                    <input                    
                      type="radio"
                      class="form-control d-inline w-25"
                      id="not_paid"
                      name="paiditem"
                      :value="false"
                      v-model="tempOrder.is_paid"
                    />
                    <div>
                        <span class="m-4">已付款</span>
                        <span class="m-4">未付款</span>
                    </div>
                    <span id="msg" class="text-danger"></span>
                  </div>
                   <div class="form-group">
                    <label for="num">數量</label>
                    <input
                      type="number"
                      class="form-control"
                      id="num"
                      v-model="tempOrder.num"
                      placeholder="請輸入數量"
                    />
                  </div>
                  <div class="form-group">
                    <label for="orderId">訂單ID</label>
                    <input
                      type="text"
                      class="form-control"
                      id="orderId"
                      v-model="tempOrder.id"
                      readonly
                    />
                  </div>
                  <div class="form-group">
                    <label for="paid_date">付款日期</label>
                    <div>{{ tempOrder.paid_date | timestamp }}</div>
                  </div>
                  <div class="form-group">
                    <label for="user">消費者姓名</label>
                    <input
                      type="text"
                      class="form-control"
                      id="user"
                      v-model="tempOrder.user.name"
                      placeholder="請輸入消費者姓名"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="updateOrder"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- edit Modal -->
      <Pagination
        class="mx-auto"
        :pagination="pagination"
        @pageTrigger="getPages"
      />
    </div>
  </div>
</template>
<script>
import Pagination from "../../Pagination.vue";
import $ from 'jquery';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {
          user:[],
      },
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
      console.log('openedit',this.tempOrder);
      $("#orderModal").modal('show');
    },
    updateOrder() {
        const vm = this;
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
        vm.$http.put(url, { data: vm.tempOrder }).then((response) =>{
            if(response.data.success){
                vm.getOrders();
                $('#orderModal').modal('hide');
            }else{
                vm.getOrders();
                $('#orderModal').modal('hide');  
                console.log('update failed');              
            }
        })
    },
  },
  created() {
    this.getOrders();
    this.getPages();
  },
};
</script>