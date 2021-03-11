import gql from 'graphql-tag'

export const likeLyric = gql`
  mutation likeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`