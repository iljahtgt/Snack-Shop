<template>
    <div>
         <!-- pagination -->
<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled" :class="{'disabled': !pagination.has_pre}">
      <a class="page-link" @click.prevent="Nowpagination(pagination.current_page - 1)" href="#" tabindex="-1">Previous</a>
    </li>
    <li class="page-item" v-for="page in pagination.total_pages" :key="page"
    :class="{'active': pagination.current_page === page}">
    <a class="page-link" href="#" @click.prevent="Nowpagination(page)">{{ page }}</a></li>
    <li class="page-item" :class="{'disabled': !pagination.has_next}">
      <a class="page-link" @click.prevent="Nowpagination(pagination.current_page + 1)" href="#">Next</a>
    </li>
  </ul>
</nav>
      <!-- pagination -->
    </div>
</template>

<script>
export default {
    props: ["pagination"],
    data() {
        return {
            page: 2,
        };
    },
    methods: {
        Nowpagination(page) {
            const vm = this;
            vm.page = page;
            this.$emit("pageTrigger", Number(vm.page));
        }
    },
}
</script>