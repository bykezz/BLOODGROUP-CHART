<template>
  <div id="app">
    <AppHeader />
    <main>
      <PeopleList />
      <BarChart />
    </main>
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import PeopleList from "./components/PeopleList.vue";
import BarChart from "./components/BarChart.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    PeopleList,
    BarChart,
  },
};
</script>

<style>
@import "./assets/styles.css";
</style>
