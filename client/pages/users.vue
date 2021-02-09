<template>
  <div>
    <h1>Projects</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <NuxtLink :to="`user/${user.id}`">
          {{ user.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const query = gql`
  query {
    users {
      name
      id
    }
  }
`
export default {
  apollo: {
    users: {
      prefetch: true,
      query,
    },
  },
}
</script>
