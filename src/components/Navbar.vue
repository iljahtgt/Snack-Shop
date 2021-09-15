<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/index"
              >零食小舖 <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">後台切換</router-link>
          </li>
        </ul>
        <ul class="navbar-nav setright">
          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/service">客服中心</router-link>
          </li>
          <li>
<a type="button" href="#" class="nav-link" data-toggle="modal" data-target="#couponModal">
  優惠券
</a>
          </li>
          <li>
            <router-link class="nav-link" to="/about">關於我們</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Modal -->
<div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div>
          <table class="table text-center table-bordered">
              <thead>
                  <th>
                      折扣名稱
                  </th>
                  <th>
                      折扣碼
                  </th>
              </thead>
              <tbody>
                  <tr>
                      <td>
                          95折
                      </td>
                      <td>
                          95
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <div class="footer text-right m-3">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            coupons:[],
            pagination:{},
        }
    },
    methods: {
        
    },
}
</script>

