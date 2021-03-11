import gql from 'graphql-tag'

export const deleteSong = gql`
  mutation deleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`