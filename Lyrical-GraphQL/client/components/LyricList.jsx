import React from 'react'
import { graphql } from 'react-apollo'
import { likeLyric } from '../queries/likeLyric'

class LyricList extends React.Component {

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  render() {
    const { lyrics } = this.props
    return (
      <ul className="collection">
        {
          lyrics.map(({ content, id, likes }) => (
            <li key={id} className="collection-item">
              { content }
              <div className="vote-box">
                <i
                    className="material-icons"
                    onClick={() => this.onLike(id, likes)}
                  >
                    thumb_up
                  </i>
                  { likes }
              </div>
            </li>
          ))
        }
      </ul>
    )
  }
}

export default graphql(likeLyric)(LyricList)