<template>
  <table class="table table-striped">
    <thead>
    <th class="col-md-1 text-center">ID</th>
    <th>Name</th>
    <th class="col-md-1 text-center"><span class="glyphicon glyphicon-cog"></span></th>
    </thead>
    <tbody>
    <template v-if="!teams">
      <tr>
        <td colspan="2">No teams registered yet.</td>
      </tr>
    </template>
    <template v-else>
      <tr v-for="team in teams">
        <td>{{team.id}}</td>
        <td>{{team.name}}</td>
        <td class="text-center">
          <router-link :to="`/teams/${team.id}`" class="btn btn-default btn-xs"><span
              class="glyphicon glyphicon-edit"></span></router-link>
          <button @click.prevent="deleteTeam(team.id)" class="btn btn-danger btn-xs"><span
              class="glyphicon glyphicon-remove-sign"></span></button>

        </td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TeamsList",
  mounted() {
    this.$store.dispatch('getTeams');
  },
  computed: {
    teams() {
      return this.$store.getters.getTeams;
    }
  },
  methods: {
    deleteTeam(id) {
      axios.delete('/api/teams/' + id)
          .then((response) => {
            this.$store.dispatch('getTeams');
          })
    }
  },
}
</script>

<style scoped>
</style>