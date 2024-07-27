<template>
  <div id="app">
    <AppHeader />
    <main class="main-container">
      <div class="side-by-side">
        <BarChart :people="people" />
        <PeopleList @data-updated="updatePeopleData" />
      </div>
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

.main-container {
  padding: 1rem;
}

.side-by-side {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;
}

.people-list {
  flex: 1 30%; /* Takes 30% of the space */
  min-width: 300px; /* Ensure a minimum width for the people list */
}

.bar-chart {
  flex: 2.5 1 50%; /* Takes 70% of the space */
  min-width: 300px; /* Ensure a minimum width for the bar chart */
}
</style>
