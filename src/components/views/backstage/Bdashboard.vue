<template>
    <div>
        <Navbar />
        <Alert />
        <div class="row p-3">
           <div class="ml-3"><Sidebar /></div> 
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Alert from './AlertMessage.vue';
import Sidebar from './Sidebar.vue';

export default {
    name: 'Backstage',
    components:{
        Navbar,
        Alert,
        Sidebar,
    },
    created() {
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)snackToken\s*=\s*([^;]*).*$)|^.*$/,'$1'
    );
    // console.log("myCookie:" + myCookie);
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
}
</script>