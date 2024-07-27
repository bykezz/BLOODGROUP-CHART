<template>
  <div class="bar-chart">
    <br />
    <highcharts :options="chartOptions" :key="chartKey"></highcharts>
    <p class="">
      <strong>Age Ranges:</strong>

      <br />
    </p>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import HighchartsVue from "highcharts-vue";

export default {
  name: "BarChart",
  components: {
    highcharts: HighchartsVue.component,
  },
  props: {
    people: Array,
  },
  setup(props) {
    const chartOptions = ref({
      chart: {
        type: "column",
        width: 800,
        height: 400,
      },
      title: {
        text: "Distribution of People by Blood Group and Age Range",
      },
      xAxis: {
        categories: [],
      },
      yAxis: {
        title: {
          text: "Number of People",
        },
      },
      series: [],
    });

    const chartKey = ref(0);

    const processPeopleData = (people) => {
      const ageRanges = { "0-20": 0, "21-30": 0, "31-40": 0, "41-50": 0 };
      const bloodGroups = { A: 0, B: 0, AB: 0, O: 0 };
      const ageGroupByBloodGroup = {
        A: { "0-20": 0, "21-30": 0, "31-40": 0, "41-50": 0 },
        B: { "0-20": 0, "21-30": 0, "31-40": 0, "41-50": 0 },
        AB: { "0-20": 0, "21-30": 0, "31-40": 0, "41-50": 0 },
        O: { "0-20": 0, "21-30": 0, "31-40": 0, "41-50": 0 },
      };

      people.forEach((person) => {
        bloodGroups[person.bloodGroup] += 1;

        if (person.age <= 20) {
          ageRanges["0-20"] += 1;
          ageGroupByBloodGroup[person.bloodGroup]["0-20"] += 1;
        } else if (person.age <= 30) {
          ageRanges["21-30"] += 1;
          ageGroupByBloodGroup[person.bloodGroup]["21-30"] += 1;
        } else if (person.age <= 40) {
          ageRanges["31-40"] += 1;
          ageGroupByBloodGroup[person.bloodGroup]["31-40"] += 1;
        } else {
          ageRanges["41-50"] += 1;
          ageGroupByBloodGroup[person.bloodGroup]["41-50"] += 1;
        }
      });

      return { ageRanges, ageGroupByBloodGroup };
    };

    watch(
      () => props.people,
      (newPeople) => {
        const { ageRanges, ageGroupByBloodGroup } =
          processPeopleData(newPeople);

        chartOptions.value.xAxis.categories = Object.keys(ageRanges);
        chartOptions.value.series = Object.keys(ageGroupByBloodGroup).map(
          (bloodGroup) => ({
            name: bloodGroup,
            data: Object.values(ageGroupByBloodGroup[bloodGroup]),
          })
        );

        chartKey.value += 1; // Trigger re-render
      },
      { immediate: true }
    );

    return {
      chartOptions,
      chartKey,
    };
  },
};
</script>

<style scoped>
.bar-chart {
  width: 100%; /* Ensure the container takes up full width */
  display: flex;
  margin-top: 50px;
  justify-content: center; /* Center the chart horizontally */
}
</style>
