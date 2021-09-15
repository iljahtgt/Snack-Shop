<template>
  <div class="bg-light">
    <h6
      class="
        sidebar-heading
        d-flex
        justify-content-between
        align-items-center
        px-3
        mb-1
        text-muted
      "
    >
      <span class="mx-auto mt-4">控制台</span>
      <a class="d-flex align-items-center text-muted" href="#">
        <span data-feather="plus-circle"></span>
      </a>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/main">
          <i class="fas fa-box-open"></i>
          商品管理
        </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/admin/coupon">
          <i class="fas fa-box-open"></i>
          折扣碼管理
        </router-link>
      </li>
      <!-- <li v-for="item in products" :key="item.id">
        <div class="collapse" id="collapseExample">
          <a href="#">{{ item.category }}</a>
        </div>
      </li> -->
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      searchText: '',
      categories: [],
      isLoading: false,
    };
  },
  methods: {
    
  },
  created() {

  },
  computed: {
    filterData(){
      const vm = this;
    if(vm.searchText){
      return vm.products.filter((item) => {
        const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
        return data;
      });
      return this.products;
    }
    }
  },
};
</script>

<style scoped>
[data-toggle="collapse"] .fa:before {   
  content: "\f107";
}

[data-toggle="collapse"].collapsed .fa:before {
  content: "\f105";
}
</style>