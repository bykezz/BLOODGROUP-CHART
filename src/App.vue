<template>
  <div id="app">
    <AppHeader />
    <main>
      <PeopleList @data-updated="updatePeopleData" />
      <BarChart :people="people" />
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
  data() {
    return {
      people: [],
    };
  },
  methods: {
    updatePeopleData(newPeople) {
      this.people = newPeople;
    },
  },
};
</script>

<style>
@import "./assets/styles.css";
</style>
