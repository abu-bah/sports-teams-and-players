<template>
  <div>
    <form @submit.prevent="edit">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" class="form-control" id="first_name" v-model="player.first_name">
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" class="form-control" id="last_name" v-model="player.last_name">
      </div>

      <div class="form-group">
        <div class="row">

          <div class="col-md-3">
            <label for="team">Team</label>
            <select class="form-control" id="team" v-model="player.team_id">
              <option v-for="team in teams" v-bind:value="team.id">{{team.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 ">
          <button type="submit" class="btn btn-success pull-right">Save</button>
        </div>
      </div>
      <template v-if="errors">
        <div v-for="(errorMsgs,inputName) in errors" :key="inputName" class="alert alert-danger text-center"
             role="alert">
          <b>{{inputName}}</b>: {{errorMsgs.join(',')}}
        </div>
      </template>
    </form>
  </div>

</template>

<script>
import validate from 'validate.js';
export default {
  name: "Player",
  computed: {
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    },
    players() {
      return this.$store.getters.getPlayers;
    },
    teams() {
      return this.$store.getters.getTeams;
    }
  },
  data() {
    return {
      player: {
        first_name: null,
        last_name: null,
        team_id: null
      },
      errors: null
    }
  },
  created() {
    if (this.players) {
      this.player = this.players.find((player) => player.id == this.$route.params.id);
    } else {
      axios.get(`/api/players/${this.$route.params.id}`).then((response) => {
        this.player = response.data.player;
      });
    }
    this.$store.dispatch('getTeams');
  },
  methods: {
    edit() {
      this.errors = null;
      const constraints = this.getConstraints();
      const player = this.$data.player;
      const errors = validate(player, constraints);
      if (errors) {
        this.errors = errors;
        return;
      }
      axios.post('/api/players/' + this.$route.params.id, {player: player}).then((response) => {
      });
    },
    deletePlayerTeam(teamId) {
      axios.delete('/api/teams/' + teamId + '/players/' + this.$route.params.id)
          .then((response) => {

          })
    },
    getConstraints() {
      return {
        first_name: {
          presence: {allowEmpty: false},
          length: {
            minimum: 2,
            message: 'Player first name needs to be at least 2 characters.'
          }
        },
        last_name: {
          presence: {allowEmpty: false},
          length: {
            minimum: 2,
            message: 'Player last name needs to be at least 2 characters.'
          }
        },
        team_id: {
          presence: {allowEmpty: false}
        }
      }
    }
  }
}
</script>

<style scoped>
</style>