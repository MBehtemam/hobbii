<template>
  <div v-if="user">
    <h3>{{ user.name }}</h3>
    <div>
      <div v-for="project in user.projects" :key="project.id">
        <span>{{ project.name }}</span>
        <button v-if="isStarted(project)">Start</button>
        <button v-else>Stop</button>
      </div>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
const query = gql`
  query CurrentUser($id: Int!) {
    user(id: $id) {
      name
      projects {
        name
        id
        times {
          start
          end
          by {
            id
          }
        }
      }
    }
  }
`
export default {
  apollo: {
    user: {
      query,
      prefetch: ({ route }) => ({ id: route.params.id }),
      variables() {
        return { id: parseInt(this.$route.params.id, 10) }
      },
    },
  },
  methods: {
    isStarted: (project) =>
      project.times.some((t) => t.end === '0' && t.by.id === 2),
  },
}
</script>
