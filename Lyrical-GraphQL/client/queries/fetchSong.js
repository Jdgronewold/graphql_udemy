import gql from 'graphql-tag'

export const fetchSong = gql`
  query fetchSong($id: ID!){
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`