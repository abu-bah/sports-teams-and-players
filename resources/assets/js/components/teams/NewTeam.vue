<template>
  <form @submit.prevent="add">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" v-model="team.name">
    </div>

    <div class="row">
      <div class="col-md-12 ">
        <button type="reset" class="btn btn-default ">Reset</button>
        <button type="submit" class="btn btn-success pull-right">Add</button>
      </div>
    </div>

    <template v-if="errors">
      <div v-for="(errorMsgs,inputName) in errors" :key="inputName" class="alert alert-danger text-center"
           role="alert">
        <b>{{inputName}}</b>: {{errorMsgs.join(',')}}
      </div>
    </template>
  </form>
</template>

<script>
import validate from 'validate.js';
export default {
  name: "NewTeam",
  data() {
    return {
      team: {
        name: ''
      },
      errors: null
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    }
  },
  methods: {
    add() {
      this.errors = null;
      const constraints = this.getConstraints();
      const team = this.$data.team;
      const errors = validate(team, constraints);
      if (errors) {
        this.errors = errors;
        return;
      }
      axios.post('/api/teams', team).then((response) => {
        this.$router.push('/teams');
      });
    },
    getConstraints() {
      return {
        name: {
          presence: {allowEmpty: false},
          length: {
            minimum: 3,
            message: 'A team name should not be so short. Please make it at least 3 characters. Lets create a BIG team!'
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>