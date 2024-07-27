<template>
  <div class="people-list">
    <h2>People List</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Blood Group</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in people" :key="person.id">
          <td>{{ person.name }}</td>
          <td>{{ person.age }}</td>
          <td>{{ person.bloodGroup }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: "PeopleList",
  data() {
    return {
      people: [],
    };
  },
  async created() {
    const savedPeople = localStorage.getItem("people");
    if (savedPeople) {
      this.people = JSON.parse(savedPeople);
      this.$emit("data-updated", this.people); // Emit event with data
    } else {
      const querySnapshot = await getDocs(collection(db, "people"));
      querySnapshot.forEach((doc) => {
        this.people.push({ id: doc.id, ...doc.data() });
      });
      localStorage.setItem("people", JSON.stringify(this.people));
      this.$emit("data-updated", this.people); // Emit event with data
    }
  },
};
</script>

<style scoped>
.people-list {
  width: 100%; /* Ensure the list takes full width */
  max-width: 600px; /* Set a max width for the list */
  padding: 1rem;
  box-sizing: border-box; /* Include padding in width calculation */
}

.people-list h2 {
  text-align: center;
  font-size: larger;
  margin-bottom: 1rem;
}

.people-list table {
  width: 100%;
  border-collapse: collapse;
  margin: auto;
}

.people-list th,
.people-list td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #ddd;
}

.people-list th {
  background-color: #f4f4f4;
}

.people-list tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
