import React from 'react'
import { graphql } from 'react-apollo'
import { addLyricToSong } from '../queries/saveLyric'

class LyricCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  onSubmit(event) {
    event.preventDefault()
    const { songId } = this.props

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: songId
      }
    }).then(() => {
      this.setState({ content: '' })
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
      </form>
    )
  }
}

export default graphql(addLyricToSong)(LyricCreate)