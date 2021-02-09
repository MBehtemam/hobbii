<template>
  <div>
    <h1>Projects</h1>
    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const query = gql`
  query {
    projects {
      name
    }
  }
`
export default {
  apollo: {
    projects: {
      prefetch: true,
      query,
    },
  },
}
</script>
