<template>
  <div class="container">
    <form class="form-signin" @submit.prevent="signin">
      <div class="text-center mb-4">
        <img
          class="mb-4"
          src=""
          alt=""
          width="72"
          height="72"
        />
        <h1 class="h3 mb-3 font-weight-normal">零食小舖後台</h1>
      </div>

      <div class="form-label-group">
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
          v-model="user.username"
        />
        <label for="inputEmail">Email address</label>
      </div>

      <div class="form-label-group">
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          v-model="user.password"
        />
        <label for="inputPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2021</p>
    </form>
  </div>
</template>
<script>

export default {
  data() {
    return {
        user: {
            username: '',
            password: '',
        },
    };
  },
  methods: {
      signin() {
          const url = `${process.env.VUE_APP_APIPATH}/admin/signin`;
          const vm = this;
          this.$http.post(url, vm.user).then((response) => {
              console.log(response.data);
              if(response.data.success){
                  const token = response.data.token;
                  const expired = response.data.expired;
                //   console.log(token,expired);
                  document.cookie = `snackToken=${token}; expires=${ new Date(expired) }`;
                  // console.log(document.cookie);
                  vm.$router.push('/admin/main');
              };
          });
      },
  },
};
</script>

<style scoped>
    html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>