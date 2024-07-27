<template>
  <div class="bar-chart">
    <highcharts :options="chartOptions" :key="chartKey"></highcharts>
    <p class="chart-description">
      <strong>Age Ranges:</strong>
      <ul>
        <li><strong>0 ≤ Age ≤ 20:</strong> Number of people aged between 0 and 20.</li>
        <li><strong>21 ≤ Age ≤ 30:</strong> Number of people aged between 21 and 30.</li>
        <li><strong>31 ≤ Age ≤ 40:</strong> Number of people aged between 31 and 40.</li>
        <li><strong>41 ≤ Age ≤ 50:</strong> Number of people aged between 41 and 50.</li>
      </ul>
      <br>
      <strong>Blood Groups:</strong>
      <ul>
        <li>The bar chart also shows the distribution of people across different blood groups.</li>
      </ul>
    </p>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import HighchartsVue from 'highcharts-vue';

export default {
  name: 'BarChart',
  components: {
    highcharts: HighchartsVue.component
  },
  props: {
    people: Array
  },
  setup(props) {
    const chartOptions = ref({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Distribution of People by Blood Group and Age Range'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: 'Number of People'
        }
      },
      series: [
        {
          name: 'Blood Groups',
          data: []
        },
        {
          name: 'Age Ranges',
          data: []
        }
      ]
    });

    const chartKey = ref(0);

    const processPeopleData = (people) => {
      const bloodGroups = {};
      const ageRanges = { '0-20': 0, '21-30': 0, '31-40': 0, '41-50': 0 };

      people.forEach((person) => {
        bloodGroups[person.bloodGroup] = (bloodGroups[person.bloodGroup] || 0) + 1;

        if (person.age <= 20) {
          ageRanges['0-20'] += 1;
        } else if (person.age <= 30) {
          ageRanges['21-30'] += 1;
        } else if (person.age <= 40) {
          ageRanges['31-40'] += 1;
        } else {
          ageRanges['41-50'] += 1;
        }
      });

      return { bloodGroups, ageRanges };
    };

  watch(() => props.people, (newPeople) => {
      const { bloodGroups, ageRanges } = processPeopleData(newPeople);

      chartOptions.value.series[0].data = Object.values(bloodGroups);
      chartOptions.value.series[1].data = Object.values(ageRanges);
      chartOptions.value.xAxis.categories = [
        ...Object.keys(bloodGroups),
        ...Object.keys(ageRanges)
      ];

      chartKey.value += 1; // Trigger re-render
    }, { immediate: true });

    return {
      chartOptions,
      chartKey
    };
  }
};
</script>
