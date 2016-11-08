import React, { Component } from 'react';
import ArtistItemComponent from './artist-item';
import { connect } from 'react-redux';

class ArtistList extends Component {

  render () {
    let { artistsList, filter } = this.props
    artistsList = artistsList.filter(artist => artist.name.includes(filter));

    return (
      <div className="container">
      <h3>Artists</h3>
        <div className="list-group">
          {
            artistsList && artistsList.map(artist => (
              <div key={ artist.id } className="list-group-item">
                <ArtistItemComponent artist={ artist }/>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({artistsList: state.artistsList, filter: state.filter})

export default connect(mapStateToProps)(ArtistList)
