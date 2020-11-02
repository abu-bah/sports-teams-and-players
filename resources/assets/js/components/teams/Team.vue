<template>
  <div>
    <form @submit.prevent="edit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="team.name">
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
    <br/>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            Player Contracts
          </div>
          <div class="panel-body">
            <template v-if="!storedPlayers">
              <tr>
                <td colspan="2">No players for this team yet.</td>
              </tr>
            </template>
            <template v-else>
              <table class="table table-striped">
                <thead>
                <th>Player</th>
                <th class="col-md-1 text-center">Start</th>
                <th class="col-md-1 text-center">End</th>
                <th class="col-md-1 text-center"><span class="glyphicon glyphicon-cog"></span></th>
                </thead>
                <tbody>
                <tr v-for="storedPlayer in storedPlayers">
                  <td>{{storedPlayer.first_name}} {{storedPlayer.last_name}}</td>
                  <td class="col-md-1 text-center">{{storedPlayer.start}}</td>
                  <td class="col-md-1 text-center">{{storedPlayer.end}}</td>
                  <td class="text-center">

                    <button @click.prevent="deleteTeamPlayer(storedPlayer.id)"
                            class="btn btn-danger btn-xs"><span
                        class="glyphicon glyphicon-remove-sign"></span></button>

                  </td>
                </tr>
                </tbody>
              </table>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validate from 'validate.js';
export default {
  name: "Team",
  computed: {
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    },
    teams() {
      console.log(this.$store.getters);
      return this.$store.getters.getTeams;
    }
  },
  data() {
    return {
      team: {
        name: null
      },
      storedPlayers: null,
      errors: null
    }
  },
  created() {
    if (this.teams) {
      this.team = this.teams.find((team) => team.id == this.$route.params.id);
    } else {
      axios.get(`/api/teams/${this.$route.params.id}`).then((response) => {
        this.team = response.data.team;
      });
    }
    this.getStoredPlayers();
  },
  methods: {
    getStoredPlayers() {
      axios.get(`/api/teams/${this.$route.params.id}/players`).then((response) => {
        if (response.data.players.length) {
          this.storedPlayers = response.data.players;
        }
      });
    },
    edit() {
      this.errors = null;
      const constraints = this.getConstraints();
      const team = this.$data.team;
      const errors = validate(team, constraints);
      if (errors) {
        this.errors = errors;
        return;
      }
      axios.post('/api/teams/' + this.$route.params.id, team).then((response) => {
        this.$router.push('/teams');
      });
    },
    deleteTeamPlayer(playerId) {
      console.log(playerId);
      axios.delete('/api/players/' + playerId)
          .then((response) => {
            this.getStoredPlayers();
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