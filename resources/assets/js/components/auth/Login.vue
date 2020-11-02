<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <form @submit.prevent="auth">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" class="form-control" value="" size="20"
                       v-model="form.email">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" value=""
                       size="20" v-model="form.password">
              </div>
              <div class="form-group">
                <input type="submit" class="btn btn-brand btn-block"
                       value="Sign In">
              </div>
              <template v-if="authException">
                <div class="alert alert-danger text-center" role="alert">
                  <h6>Authentication unsuccessful.</h6>
                </div>
              </template>
            </form>
            <p class="small text-center text-gray-soft">Don't have an account yet?
              <router-link to="/Register">Register</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from "../../helpers/auth";
export default {
  name: "login",
  data() {
    return {
      exception: null,
      form: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    auth() {
      this.$store.dispatch("loginAction");
      login(this.$data.form).then((response) => {
        this.$store.commit("successfulLogin", response);
        this.$router.push({path: '/'})
      }).catch((exception) => {
        this.$store.commit("errorLogin", {exception})
      });
    }
  },
  computed: {
    authException() {
      return this.$store.getters.getAuthException;
    }
  }
}
</script>

<style scoped>
</style>