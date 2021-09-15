<template>
  <div>
    <Navbar/>       
     
            <div class="paddingset">
              <!-- <div class="col-md-2 bg-white mx-auto sidebarset"> -->
              <!-- <Sidebar :message="msg"/> -->
              <!-- </div> -->
              <router-view class="mx-auto homeset"></router-view>
                
            </div>
     
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
// import Sidebar from './Sidebar.vue';

export default {
  name: 'Dashboard',
  data(){
    return {
      msg: 'test124',
    }
  },
  components:{
    Navbar,
    // Sidebar,
  },
}
</script>

