import React from 'react'

class LyricList extends React.Component {

  onLike(id) {

  }

  render() {
    const { lyrics } = this.props
    return (
      <ul className="collection">
        {
          lyrics.map(({ content, id }) => (
            <li key={id} className="collection-item">
              { content }
              <i
                className="material-icons"
                onClick={() => this.onLike(id)}
              >
                thumb_up
              </i>
            </li>
          ))
        }
      </ul>
    )
  }
}

export default LyricList