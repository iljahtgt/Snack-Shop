<template>
  <div class="text-center mx-auto w-75">
    <loading :active.sync="isLoading"></loading>
    <div style="text-align: right" class="mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
        建立優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>產品名稱</th>
          <th width="120">折扣</th>
          <th width="120">到期日</th>
          <th width="100">啟用狀態</th>
          <th width="100">折扣碼</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>
              {{ item.title }}
          </td>
          <td>
            {{ item.percent }}
          </td>
          <td>
            {{ item.due_date }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
              {{ item.code }}
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openDelModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <!-- <router-view name="Pagination"></router-view> -->
    <nav aria-label="Page navigation example" style="margin-left:50%;">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" 
          @click.prevent="getCoupons(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page" 
        :class="{'active': pagination.current_page === page}">
            <a class="page-link" href="#" @click.prevent="getCoupons(page)">{{ page }}</a></li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"
          @click.prevent="getCoupons(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0 w-50 mx-auto">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
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
          <div class="modal-body text-center mx-auto">
            <div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">優惠券名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempCoupon.title"
                    placeholder="優惠券名稱"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="percent">折扣</label>
                    <input
                      type="text"
                      class="form-control"
                      id="percent"
                      v-model="tempCoupon.percent"
                      placeholder="請輸入折扣"
                    />
                  </div>
                  <div class="form-group col-md-12">
                    <label for="due_date">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="due_date"
                      v-model="tempCoupon.due_date"
                      placeholder="請輸入到期日"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="code">折扣碼</label>
                    <input
                      type="text"
                      class="form-control"
                      id="code"
                      v-model="tempCoupon.code"
                      placeholder="請設定折扣碼"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
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
              @click="updateCoupon"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delcouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
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
            是否刪除
            <strong class="text-danger" :tempCoupon="tempCoupon">{{
              tempCoupon.title
            }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isLoading: false,
      isNew: false,
    };
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
          console.log(response.data.coupons);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
      }
      $("#couponModal").modal("show");
    },
    updateCoupon() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = "post"; // 切換新增跟修改的功能
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $("#couponModal").modal("hide");
          vm.getCoupons();
        } else {
          $("#couponModal").modal("hide");
          vm.getCoupons();
          console.log("新增失敗");
        }
        // vm.coupons = response.data.coupons; //新增中需要把這行拿掉，不然會把response的資料寫進vm.coupons裡面
      });
    },
    openDelModal(item) {
      //   this.tempCoupon = Object.assign({}, item);
      this.tempCoupon = item;
      console.log(this.tempCoupon.id);
      $("#delcouponModal").modal("show");
    },
    deleteCoupon() {
      const vm = this; // vm要先宣告在api之前，否則api的vm.tempCoupon.id會抓不到
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.isLoading = true;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          $("#delcouponModal").modal("hide");
          console.log("刪除成功");
          vm.isLoading = false;
          this.getCoupons();
        } else {
          $("#delcouponModal").modal("hide");
          console.log("刪除失敗");
          vm.isLoading = false;
          this.getCoupons();
        }
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>