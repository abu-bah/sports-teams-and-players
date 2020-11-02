<template>
  <table class="table table-striped">
    <thead>
    <th class="col-md-1 text-center">ID</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th class="col-md-1 text-center"><span class="glyphicon glyphicon-cog"></span></th>
    </thead>
    <tbody>
    <template v-if="!players">
      <tr>
        <td colspan="4" class="text-center">No players registered yet.</td>
      </tr>
    </template>
    <template v-else>
      <tr v-for="player in players">
        <td>{{player.id}}</td>
        <td>{{player.first_name}}</td>
        <td>{{player.last_name}}</td>
        <td class="text-center">
          <router-link :to="`/players/${player.id}`" class="btn btn-default btn-xs"><span
              class="glyphicon glyphicon-edit"></span></router-link>
          <button @click.prevent="deletePlayer(player.id)" class="btn btn-danger btn-xs"><span
              class="glyphicon glyphicon-remove-sign"></span></button>

        </td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "PlayersList",
  mounted() {
    this.$store.dispatch('getPlayers');
  },
  computed: {
    players() {
      return this.$store.getters.getPlayers;
    }
  },
  methods: {
    deletePlayer(id) {
      console.log(id);
      axios.delete('/api/players/' + id)
          .then((response) => {
            this.$store.dispatch('getPlayers');
          })
    }
  },
}
</script>

<style scoped>
</style>