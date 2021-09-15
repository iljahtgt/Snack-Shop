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
      <h3 class="mx-auto mt-3 mb-3">零食種類</h3>
      <a class="d-flex align-items-center text-muted" href="#">
        <span data-feather="plus-circle"></span>
      </a>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <a class="nav-link list-group-item list-group-item-action"
         href="#"
         @click.prevent="searchAll">
          全部零食
        </a>
      </li>
      <a href="#" 
      class="list-group-item list-group-item-action"
      v-for="item in categories" :key='item' 
      @click.prevent="searchCategory(item)"
      :class="{'active': item === searchText }">
      <li class="category">
          {{ item }}
            <i class="fa fa-chevron-right m-1 setright"></i>
      </li>
      </a>
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
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        // console.log("get or not", response.data.products);
        const temp = response.data.products;
        vm.products = temp.filter((item) => {
           return item.is_enabled === 1
        })
        vm.isLoading = false;
        vm.getUnique();
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
    // 使用$emit傳送'searchCategory','searchAll'給父層, item = 分類
    searchCategory(item) {
        this.$emit('searchCategory', item);
    },
    searchAll() {
        this.$emit('searchAll', '');
    }
  },
  created() {
      this.getProducts();
  },
  computed: {
    filterData(){
      const vm = this;
    if(vm.searchText){
      return vm.products.filter((item) => {
        const data = item.category.toLowerCase().includes(vm.searchText.toLowerCase());
        return data;
      });
      return this.products;
    }
    },
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