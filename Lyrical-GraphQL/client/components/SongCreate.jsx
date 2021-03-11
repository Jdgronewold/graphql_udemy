import React from 'react'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import { addSong } from '../queries/createSong'

class SongCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  onSubmit(event) {
    event.preventDefault()
    console.log('ran', this.state.title );
    this.props.mutate({
      variables: {
        title: this.state.title
      },
      // refetchQueries: [{ query: fetchSongs }] // can also have a variables option here
    }).then(() => {
      hashHistory.push("/")
    })
  }


  render() {
    return (
      <div>
        <Link to="/"> Back </Link>
        <h3> Create a new song </h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label> Song title: </label>
          <input
            value={this.state.title}
            onChange={(event) => this.setState({title: event.target.value })}
          />
        </form>
      </div>
    )
  }
}

export default graphql(addSong)(SongCreate)