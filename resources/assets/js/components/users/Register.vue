<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            Register
          </div>
          <div class="panel-body">
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" class="form-control" value="" size="20"
                       v-model="form.name">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" value="" size="20"
                       v-model="form.email">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control"
                       size="20" v-model="form.password">
              </div>
              <div class="form-group">
                <input type="submit" class="btn btn-brand btn-block" value="Register">
              </div>
              <template v-if="errors">
                <div v-for="(errorMsgs,inputName) in errors" :key="inputName"
                     class="alert alert-danger text-center" role="alert">
                  <b>{{inputName}}</b>: {{errorMsgs.join(', ')}}
                </div>
              </template>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validate from 'validate.js';
export default {
  name: "Register",
  data() {
    return {
      exception: null,
      form: {
        name: null,
        email: null,
        password: null
      },
      errors: null
    }
  },
  methods: {
    register() {
      this.errors = null;
      const constraints = this.getConstraints();
      const form = this.$data.form;
      const errors = validate(form, constraints);
      if (errors) {
        this.errors = errors;
        return;
      }
      axios.post('/api/register', form).then((response) => {
        this.$router.push('/login');
      });
    },
    getConstraints() {
      return {
        email: {
          presence: {allowEmpty: false},
          email: true
        },
        password: {
          presence: {allowEmpty: false},
        },
        name: {
          presence: {allowEmpty: false},
        }
      }
    }
  }
}
</script>

<style scoped>
</style>