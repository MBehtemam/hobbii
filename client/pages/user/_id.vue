<template>
  <div v-if="user">
    <h3>{{ user.name }}</h3>
    <div></div>
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
}
</script>
