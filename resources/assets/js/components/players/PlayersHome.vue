<template>
  <div class="row">
    <div class="col-md-offset-2 col-md-8">
      <div class="panel panel-default">
        <div class="panel-heading">
          Players
          <div class="pull-right">
            <router-link to="/players/new" class="btn btn-success btn-xs"><span
                class="glyphicon glyphicon-plus-sign"></span></router-link>
            <router-link to="/players" class="btn btn-primary btn-xs"><span
                class="glyphicon glyphicon-list"></span></router-link>
          </div>


        </div>
        <div class="panel-body">

          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayersHome"
}
</script>

<style scoped>
</style>